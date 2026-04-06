const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: ['CREATE', 'UPDATE', 'DELETE', 'ENABLE', 'DISABLE'],
      required: true,
    },
    flagId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flag',
      required: true,
    },
    flagName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    changes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: new Map(),
    },
    ipAddress: String,
    userAgent: String,
    status: {
      type: String,
      enum: ['success', 'failed'],
      default: 'success',
    },
    errorMessage: String,
  },
  { timestamps: true }
);

// Index for efficient queries
AuditLogSchema.index({ flagId: 1, createdAt: -1 });
AuditLogSchema.index({ userId: 1, createdAt: -1 });
AuditLogSchema.index({ action: 1 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
