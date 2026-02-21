const express = require('express');
const {
  getAllFlags,
  getFlag,
  createFlag,
  updateFlag,
  deleteFlag,
  toggleFlag,
} = require('../controllers/flagController');
const { auth, authorize } = require('../middleware/authMiddleware');
const { validateFlagInput } = require('../middleware/validation');

const router = express.Router();

// All flag routes require authentication
router.use(auth);

// Public (authenticated) routes
router.get('/', getAllFlags);
router.get('/:id', getFlag);

// Admin-only routes
router.post('/', authorize('admin'), validateFlagInput, createFlag);
router.put('/:id', authorize('admin'), validateFlagInput, updateFlag);
router.delete('/:id', authorize('admin'), deleteFlag);
router.patch('/:id/toggle', authorize('admin'), toggleFlag);

module.exports = router;
