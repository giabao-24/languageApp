const Result = require('../models/Result');

const getResult = async (req, res) => {
  try {
    const resultId = req.params.id;
    // Dùng Model Result bạn vừa tạo để query
    const result = await require('../models/Result').findById(resultId);
    
    if (!result) return res.status(404).json({ message: 'Không tìm thấy kết quả' });
    
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

const getAllResultsOfUser = async (req, res) => {
  const userId = req.user?._id || req.user?.id || req.userId;
  try {
    const results = await Result.find({ userId }).select('userId testId score createdAt');
    if (results.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy kết quả nào' });
    }
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
}
module.exports = {
  getResult,
  getAllResultsOfUser
};