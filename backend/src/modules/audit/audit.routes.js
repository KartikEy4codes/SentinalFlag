const express = require('express');
const {
  getAuditLogs,
  getAuditLogDetail,
  getAuditStats,
} = require('./audit.controller');
const { auth, authorize } = require('../../middleware/authMiddleware');

const router = express.Router();

// All audit routes require authentication and admin role
router.use(auth);
router.use(authorize('admin'));

router.get('/', getAuditLogs);
router.get('/stats/summary', getAuditStats);
router.get('/:id', getAuditLogDetail);

module.exports = router;
