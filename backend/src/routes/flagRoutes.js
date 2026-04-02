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

// User/viewer routes (normal user and viewer can manage flags)
router.post('/', authorize('user', 'viewer'), validateFlagInput, createFlag);
router.put('/:id', authorize('user', 'viewer'), validateFlagInput, updateFlag);
router.delete('/:id', authorize('user', 'viewer'), deleteFlag);
router.patch('/:id/toggle', authorize('user', 'viewer'), toggleFlag);

module.exports = router;
