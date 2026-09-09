const VocabQuiz = require('../models/VocabQuiz');

const createVocabQuiz = async (req,res) => {
  const {topicName,level,words} = req.body;
  try {
     await VocabQuiz.create({
      topicName,
      level,
      words
     })
     res.status(201).json({message:'Tạo thành công!'});
  }catch(error) {
     res.status(500).json({message:'Lỗi khi tạo!',error: error.message});
  }
}

module.exports = {createVocabQuiz};