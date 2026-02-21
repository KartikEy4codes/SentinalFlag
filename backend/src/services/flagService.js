const Flag = require('../models/Flag');

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
 * Initialize MongoDB Change Stream for Real-Time synchronization
 */
const initChangeStream = () => {
    try {
        const changeStream = Flag.watch();

        changeStream.on('change', async (change) => {
            console.log(`[Change Stream] Event: ${change.operationType} on Flag: ${change.documentKey._id}`);
            await refreshCache();
        });

        changeStream.on('error', (error) => {
            console.error('[Change Stream] Error:', error);
            // Attempt to restart the stream after a delay
            setTimeout(initChangeStream, 5000);
        });

        console.log('✅ [Change Stream] Watching Flag collection for changes...');
    } catch (error) {
        console.error('[Change Stream] Initialization error:', error);
        // Attempt to restart the stream after a delay
        setTimeout(initChangeStream, 5000);
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

module.exports = {
    refreshCache,
    initChangeStream,
    evaluateFlag
};
