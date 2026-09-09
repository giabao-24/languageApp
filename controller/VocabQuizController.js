const VocabQuiz = require('../models/VocabQuiz');

const createVocabQuiz = async (req,res) => {
  const {topicName,level,words} = req.body;
  if(!topicName || !level || !words) {
    return res.status(400).json({message:'Vui lòng nhập đầy đủ Chủ đề, Cấp độ và ít nhất 1 từ vựng!'});
  }
  try {
     const newVocab = await VocabQuiz.create({
      topicName,
      level,
      words
     })
     res.status(201).json({message:'Tạo thành công!',newVocab});
  }catch(error) {
     res.status(500).json({message:'Lỗi khi tạo!',error: error.message});
  }
}
//desc:Chỉ lấy danh sách các bộ từ vựng(hiển thị cho bảng admin,user).Không
//lấy hết dữ liệu để tối ưu
const getAllVocabQuizzes = async (req,res) => {
  try {
    const result = await VocabQuiz.find().select('-words');
    if(result.length === 0) {
      return res.status(404).json({message:'Không có dữ liệu!'});
    }
    res.status(200).json({message:'Hoàn tất!',result});
  }catch(error) {
    res.status(500).json({message:'Lỗi hệ thống khi lấy dữ liệu!',error: error.message});
  }
}
module.exports = {createVocabQuiz,getAllVocabQuizzes};