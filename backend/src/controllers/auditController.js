const AuditLog = require('../models/AuditLog');

// @desc    Get audit logs
// @route   GET /api/audit
// @access  Private/Admin
exports.getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, flagId, userId, action } = req.query;

    let query = {};

    if (flagId) query.flagId = flagId;
    if (userId) query.userId = userId;
    if (action) query.action = action;

    const skip = (page - 1) * limit;

    const logs = await AuditLog.find(query)
      .populate('flagId', 'name')
      .populate('userId', 'name email')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    const total = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching audit logs',
      error: error.message,
    });
  }
};

// @desc    Get audit log detail
// @route   GET /api/audit/:id
// @access  Private/Admin
exports.getAuditLogDetail = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id)
      .populate('flagId')
      .populate('userId', 'name email role');

    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Audit log not found',
      });
    }

    res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching audit log',
      error: error.message,
    });
  }
};

// @desc    Get audit statistics
// @route   GET /api/audit/stats/summary
// @access  Private/Admin
exports.getAuditStats = async (req, res) => {
  try {
    const stats = await AuditLog.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 },
        },
      },
    ]);

    const totalLogs = await AuditLog.countDocuments();
    const successLogs = await AuditLog.countDocuments({ status: 'success' });

    res.status(200).json({
      success: true,
      data: {
        stats,
        totalLogs,
        successLogs,
        failedLogs: totalLogs - successLogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching audit statistics',
      error: error.message,
    });
  }
};
