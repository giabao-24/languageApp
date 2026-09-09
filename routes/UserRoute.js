const { registerUser, loginUser,getUserInformation,deleteAccount,deleteUserByAdmin,updateUserInformation,getAllUsers,updateUserInformationByAdmin} = require('../controller/UserController');
const express = require('express');
const { protect,checkAdmin } = require('../middlewares/middleware');
const Route = express.Router();

//desc:create a new user
Route.post('/register', registerUser);
//desc:login a user
Route.post('/login', loginUser);
//desc:get user information
Route.get('/getUserInformation',protect, getUserInformation);
//desc: delete user Account(user role)
Route.delete('/deleteAccount',protect,deleteAccount);
//desc:delete User Account(admin role)
Route.delete('/deleteUserAccount',checkAdmin,deleteUserByAdmin);
//desc:update user information
Route.put('/updateUserInformation',protect,updateUserInformation);
//desc:get all users (admin role)
Route.get('/getAllUsers',protect,checkAdmin,getAllUsers);
//desc:update user information by admin
Route.put('/updateUserByAdmin/:id', protect, checkAdmin, updateUserInformationByAdmin);
module.exports = Route;