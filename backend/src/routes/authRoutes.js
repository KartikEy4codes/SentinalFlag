const express = require('express');
const {
  register,
  login,
  getCurrentUser,
  getAllUsers,
} = require('../controllers/authController');
const { auth, authorize } = require('../middleware/authMiddleware');
const { validateAuthInput } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateAuthInput, register);
router.post('/login', validateAuthInput, login);

// Private routes
router.get('/me', auth, getCurrentUser);
router.get('/users', auth, authorize('admin'), getAllUsers);

module.exports = router;
