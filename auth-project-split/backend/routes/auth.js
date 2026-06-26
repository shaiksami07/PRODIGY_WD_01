const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

const registerRules = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters.'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error('Passwords do not match.');
    return true;
  }),
];

const loginRules = [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
];

router.post('/register', registerRules, register);
router.post('/login', loginRules, login);
router.get('/me', isAuthenticated, getMe);

module.exports = router;
