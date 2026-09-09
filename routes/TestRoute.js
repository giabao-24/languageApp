const express = require('express');
const route = express.Router();
const TestController = require('../controller/TestController');
const { protect, checkAdmin } = require('../middlewares/middleware');


route.post('/createTest', protect, checkAdmin, TestController.createTest);
route.get('/getTest/:id', protect, TestController.getTest);
route.get('/getAllTests', TestController.getAllTests); 
route.delete('/deleteTest/:id',TestController.deleteTest);
// DÒNG QUAN TRỌNG NHẤT ĐỂ SỬA LỖI NỘP BÀI:
route.post('/submitTest', protect, TestController.submitTest);

module.exports = route;