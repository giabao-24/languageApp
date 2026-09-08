const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

const registerUser = async (req,res) => {
   const {fullName,email,password} = req.body;
   if(!fullName || !email || !password) {
     return res.status(400).json({message: 'Please fill all the fields'}); 
  }
   try {
     const existingUser = await User.findOne({email});
     if(existingUser) {
       return res.status(400).json({message: 'User already exists'});
     }
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);
     const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
     })
     if(user) {
       res.status(201).json({
         _id: user._id,
         fullName: user.fullName,
         email: user.email,
         token: generateToken(user._id),
       });
     } else {
            return res.status(400).json({ message: 'Dữ liệu người dùng không hợp lệ' });
     }
   }catch(error) {
    return res.status(500).json({message: error.message});
   }
}
  
const loginUser = async (req,res) => {
  const {email,password} = req.body;
  if(!email || !password) {
    return res.status(400).json({message: 'Please fill all the fields'});
  }
  try {
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))) {
      return res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({message: 'Invalid email or password'});
    }
  }catch(error) {
    return res.status(500).json({message: error.message});
  }
}

const getUserInformation = async (req,res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if(!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({user});
  }catch(error) {
    res.status(500).json({message: error.message});
  }
}

const deleteAccount = async (req,res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({message: 'Account deleted successfully'});
  }catch(error) {
    res.status(500).json({message: error.message});
  }
}

const deleteUserByAdmin = async(req,res) => {
  const {userId} = req.body;
  try {
    const user = await User.findByIdAndDelete({userId});
    if(!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({message: 'User deleted successfully'});
  }catch(error) {
    res.status(500).json({message: error.message});
  }
}

const updateUserInformation = async (req, res) => {
  const userId = req.user?._id || req.user?.id || req.userId;
  const { username, password } = req.body;
  
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    if (username) {
      user.username = username; 
    }
    
    if (password) {
      user.password = password;
      const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    res.status(200).json({ 
      message: 'Cập nhật thông tin thành công!',
      user: {
        _id: user._id,
        username: user.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin', error: error.message });
  }
}
module.exports = {
  registerUser,
  loginUser,
  getUserInformation,
  deleteAccount,
  deleteUserByAdmin,
  updateUserInformation
};