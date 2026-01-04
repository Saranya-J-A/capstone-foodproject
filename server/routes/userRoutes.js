const express = require('express');
const router = express.Router();
const { register, login, logout, checkUser, profile ,updateUser,deleteUser } = require('../controllers/usercontroller');
const authUser = require('../middlewares/authUser');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-user', authUser, checkUser);
router.get('/profile', authUser, profile);
//update user
router.patch('/update',authUser,updateUser)
//deleteUser
router.delete('/delete/:userID',authUser,deleteUser)

module.exports = router;
