const { registerUser, loginUser,getUserInformation,deleteAccount,deleteUserByAdmin,updateUserInformation} = require('../controller/UserController');
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
Route.post('/deleteAccount',protect,deleteAccount);
//desc:delete User Account(admin role)
Route.post('/deleteUserAccount',checkAdmin,deleteUserByAdmin);
//desc:update user information
Route.post('/updateUserInformation',protect,updateUserInformation);
module.exports = Route;