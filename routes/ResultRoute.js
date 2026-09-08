const express = require('express');
const route = express.Router();
const ResultController = require('../controller/ResultController');
const { protect } = require('../middlewares/middleware'); 

// Lấy kết quả bài thi (Bắt buộc phải đăng nhập)
route.get('/getResult/:id', protect, ResultController.getResult);
route.get('/getAllResultsOfUser', protect, ResultController.getAllResultsOfUser);

module.exports = route;