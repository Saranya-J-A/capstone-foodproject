const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

// Cookie options (safe for localhost)
const cookieOptions = {
  httpOnly: true,
  secure: false,            // must be false for localhost
  sameSite: "lax",          // allow cross-origin cookies for Vite
  maxAge: 60 * 60 * 1000,   // 1 hour
};


// REGISTER ADMIN
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(admin._id, 'admin');

    res.cookie('adminToken', token, cookieOptions);

    res.json({
      message: 'Admin registered successfully',
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// LOGIN ADMIN

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken(admin._id, 'admin');

    res.cookie('adminToken', token, cookieOptions);

    res.json({
      message: 'Login successful',
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// LOGOUT ADMIN

const logoutAdmin = (req, res) => {
  res.clearCookie('adminToken');
  res.json({ message: 'Admin logged out successfully' });
};


// GET ADMIN PROFILE

const getProfileAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    // Updated format — matches frontend ProtectedRoute
    res.json({
      success: true,
      admin,   // frontend checks res.data.admin
    });
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// DELETE ADMIN

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    await Admin.findByIdAndDelete(req.admin._id);
    res.clearCookie('adminToken');

    res.json({ message: 'Admin account deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getProfileAdmin,
  deleteAdmin,
};
