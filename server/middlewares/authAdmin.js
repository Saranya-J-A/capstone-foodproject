const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;   

    if (!token)
      return res.status(401).json({ message: 'Admin not authorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded || decoded.role !== 'admin')
      return res.status(401).json({ message: 'Admin not authorized' });

    const admin = await Admin.findById(decoded.id);
    if (!admin)
      return res.status(401).json({ message: 'Admin not found' });

    req.admin = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token invalid' });
  }
};

module.exports = authAdmin;
