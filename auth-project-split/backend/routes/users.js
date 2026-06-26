const express = require('express');
const router = express.Router();
const { getDashboard, getAdminData, createUser, updateUserRole, deleteUser } = require('../controllers/usersController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.get('/dashboard', isAuthenticated, getDashboard);
router.get('/admin', isAuthenticated, isAdmin, getAdminData);
router.post('/', isAuthenticated, isAdmin, createUser);
router.patch('/:id/role', isAuthenticated, isAdmin, updateUserRole);
router.delete('/:id', isAuthenticated, isAdmin, deleteUser);

module.exports = router;
