const Flag = require('../models/Flag');
const AuditLog = require('../models/AuditLog');

// In-memory flag cache
const flagCache = new Map();

/**
 * Refresh the in-memory flag cache
 */
const refreshCache = async () => {
  try {
    const flags = await Flag.find({ isActive: true });
    flagCache.clear();
    flags.forEach((flag) => {
      flagCache.set(flag.name, flag);
    });
    console.log(`[Cache] Refreshed: ${flagCache.size} flags cached.`);
  } catch (error) {
    console.error('[Cache] Error refreshing cache:', error);
  }
};

/**
 * Evaluate a flag for a specific user/context
 * @param {string} flagName Name of the flag
 * @param {Object} context User context (id, email, attributes, etc.)
 */
const evaluateFlag = (flagName, context = {}) => {
  const flag = flagCache.get(flagName);

  if (!flag || !flag.enabled) return false;

  // 1. User Targeting
  if (flag.strategyType === 'user-targeting' && context.userId) {
    if (flag.targetUsers.includes(context.userId)) return true;
  }

  // 2. Percentage Rollout
  if (flag.rolloutPercentage > 0) {
    // Basic hash-based rollout if context.userId exists, otherwise random
    if (context.userId) {
      const hash = [...context.userId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (hash % 100) < flag.rolloutPercentage;
    }
    return Math.random() * 100 < flag.rolloutPercentage;
  }

  // Default to enabled if no complex rules and enabled is true
  return flag.strategyType === 'percentage' && flag.rolloutPercentage === 0 ? flag.enabled : false;
};

// Initialize cache
refreshCache();

// @desc    Get all flags
// @route   GET /api/flags
// @access  Private
exports.getAllFlags = async (req, res) => {
  try {
    const { environment, enabled, search } = req.query;

    let query = {};

    if (environment) query.environment = environment;
    if (enabled !== undefined) query.enabled = enabled === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const flags = await Flag.find(query)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: flags.length,
      data: flags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching flags',
      error: error.message,
    });
  }
};

// @desc    Get single flag
// @route   GET /api/flags/:id
// @access  Private
exports.getFlag = async (req, res) => {
  try {
    const flag = await Flag.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!flag) {
      return res.status(404).json({
        success: false,
        message: 'Flag not found',
      });
    }

    res.status(200).json({
      success: true,
      data: flag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching flag',
      error: error.message,
    });
  }
};

// @desc    Create new flag
// @route   POST /api/flags
// @access  Private/Admin
exports.createFlag = async (req, res) => {
  try {
    const {
      name,
      description,
      enabled,
      environment,
      rolloutPercentage,
      strategyType,
      targetingRules,
      tags,
    } = req.body;

    // Check if flag already exists
    const existingFlag = await Flag.findOne({ name });
    if (existingFlag) {
      return res.status(400).json({
        success: false,
        message: 'Flag with this name already exists',
      });
    }

    const flag = await Flag.create({
      name,
      description,
      enabled,
      environment,
      rolloutPercentage,
      strategyType,
      targetingRules,
      tags,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });

    // Log the action
    await AuditLog.create({
      action: 'CREATE',
      flagId: flag._id,
      flagName: flag.name,
      userId: req.user._id,
      userName: req.user.name,
      ipAddress: req.ip,
    });

    // Refresh cache
    await refreshCache();

    res.status(201).json({
      success: true,
      message: 'Flag created successfully',
      data: flag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating flag',
      error: error.message,
    });
  }
};

// @desc    Update flag
// @route   PUT /api/flags/:id
// @access  Private/Admin
exports.updateFlag = async (req, res) => {
  try {
    let flag = await Flag.findById(req.params.id);

    if (!flag) {
      return res.status(404).json({
        success: false,
        message: 'Flag not found',
      });
    }

    const oldValues = { ...flag.toObject() };
    const changes = {};

    // Update only provided fields
    Object.keys(req.body).forEach((key) => {
      if (flag[key] !== req.body[key]) {
        changes[key] = { old: flag[key], new: req.body[key] };
        flag[key] = req.body[key];
      }
    });

    flag.updatedBy = req.user._id;
    flag = await flag.save();

    // Log the action
    if (Object.keys(changes).length > 0) {
      await AuditLog.create({
        action: 'UPDATE',
        flagId: flag._id,
        flagName: flag.name,
        userId: req.user._id,
        userName: req.user.name,
        changes,
        ipAddress: req.ip,
      });

      // Refresh cache
      await refreshCache();
    }

    res.status(200).json({
      success: true,
      message: 'Flag updated successfully',
      data: flag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating flag',
      error: error.message,
    });
  }
};

// @desc    Delete flag
// @route   DELETE /api/flags/:id
// @access  Private/Admin
exports.deleteFlag = async (req, res) => {
  try {
    const flag = await Flag.findByIdAndDelete(req.params.id);

    if (!flag) {
      return res.status(404).json({
        success: false,
        message: 'Flag not found',
      });
    }

    // Log the action
    await AuditLog.create({
      action: 'DELETE',
      flagId: flag._id,
      flagName: flag.name,
      userId: req.user._id,
      userName: req.user.name,
      ipAddress: req.ip,
    });

    // Refresh cache
    await refreshCache();

    res.status(200).json({
      success: true,
      message: 'Flag deleted successfully',
      data: flag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting flag',
      error: error.message,
    });
  }
};

// @desc    Toggle flag status
// @route   PATCH /api/flags/:id/toggle
// @access  Private/Admin
exports.toggleFlag = async (req, res) => {
  try {
    let flag = await Flag.findById(req.params.id);

    if (!flag) {
      return res.status(404).json({
        success: false,
        message: 'Flag not found',
      });
    }

    const oldStatus = flag.enabled;
    flag.enabled = !flag.enabled;
    flag.updatedBy = req.user._id;
    flag = await flag.save();

    // Log the action
    const action = flag.enabled ? 'ENABLE' : 'DISABLE';
    await AuditLog.create({
      action,
      flagId: flag._id,
      flagName: flag.name,
      userId: req.user._id,
      userName: req.user.name,
      changes: { enabled: { old: oldStatus, new: flag.enabled } },
      ipAddress: req.ip,
    });

    // Refresh cache
    await refreshCache();

    res.status(200).json({
      success: true,
      message: `Flag ${action.toLowerCase()}d successfully`,
      data: flag,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling flag',
      error: error.message,
    });
  }
};

// Export evaluation and refresh for internal use or other controllers
exports.evaluateFlag = evaluateFlag;
exports.refreshCache = refreshCache;
