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

module.exports = {createVocabQuiz};