const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, password required' });
    if (name.length < 2) return res.status(400).json({ message: 'Name too short' });
    if (password.length < 8) return res.status(400).json({ message: 'Password too short' });
    if (phone && !/^[0-9]{10}$/.test(phone)) return res.status(400).json({ message: 'Phone must be 10 digits' });

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, phone });
    const token = generateToken(user._id, 'user');

    res.status(201).cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PRODUCTION',
      sameSite: 'None',
      maxAge: 60 * 60 * 1000,
    }).json({ message: 'User registered', user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) 
      return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ message: 'User does not exist' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) 
      return res.status(400).json({ message: 'Invalid password' });

    //  Use actual user.role
    const token = generateToken(user._id, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    }).json({
      message: 'Login successful',
      role: user.role,
      token: token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

const checkUser = (req, res) => {
  res.json({ message: 'User authorized', userId: req.user.id });
};

const profile = async (req, res) => {
  try 
  {
    //field projection
    
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ profile: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
//updateUser
const updateUser =async(req,res)=>{
  try{
    const { name, email, password, phone } = req.body || {};
    const userID = req.user.id
    const userData = await User.findByIdAndUpdate(userID,{name,email,password,phone},{new:true})
res.json({data:userData})
  }
  catch(error)
  {
     console.error(error);
    res.status(500).json({ message: 'Server error' });

  }
}

// DELETE USER 
const deleteUser= async (req, res) => {
  try {
    const userID = req.params?.userID
    if(!userID)
    {
      return res.status(400).json({error:`UserID is required`})

    }
    const userData = await User.findByIdAndDelete(userID);
    if(!userData){
      return res.status(404).json({error:'User not found'})
    }
    res.json({message:"User deleted successfully"})
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { register, login, logout, checkUser, profile ,updateUser,deleteUser };
