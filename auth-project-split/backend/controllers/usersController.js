const User = require('../models/User');

// GET /api/users/dashboard
exports.getDashboard = async (req, res) => {
  res.json({ user: req.user });
};

// GET /api/users/admin  (admin only)
exports.getAdminData = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/users (admin only)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not create user.' });
  }
};

// PATCH /api/users/:id/role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    // Safety check: Cannot demote oneself
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot change your own role.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.role = role;
    await user.save();

    res.json({ message: 'User role updated successfully.', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/users/:id (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Safety check: Cannot delete oneself
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot delete your own account.' });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
};
