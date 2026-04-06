const mongoose = require('mongoose');

const FlagRuleSchema = new mongoose.Schema(
  {
    flagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flag',
      required: true,
    },
    ruleType: {
      type: String,
      enum: ['USER_SEGMENT', 'PERCENTAGE_ROLLOUT', 'TIME_BASED', 'CUSTOM'],
      required: true,
    },
    condition: {
      userIds: [String],
      countries: [String],
      regions: [String],
      percentage: Number,
      startDate: Date,
      endDate: Date,
      customCondition: String,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
    description: String,
  },
  { timestamps: true }
);

FlagRuleSchema.index({ flagId: 1, priority: -1 });

module.exports = mongoose.model('FlagRule', FlagRuleSchema);
