const mongoose = require('mongoose');

const FlagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a flag name'],
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    environment: {
      type: String,
      enum: ['Dev', 'Staging', 'Prod'],
      default: 'Dev',
    },
    rolloutPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    strategyType: {
      type: String,
      enum: ['percentage', 'user-targeting', 'branch-based'],
      default: 'percentage',
    },
    targetingRules: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    targetUsers: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    metadata: {
      type: Map,
      of: String,
      default: new Map(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for optimized queries
FlagSchema.index({ environment: 1, enabled: 1 });
FlagSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Flag', FlagSchema);
