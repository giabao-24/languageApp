const Test = require('../models/Test');
const Result = require('../models/Result');

// routes: POST /createTest
// description: Create a new test
const createTest = async (req, res) => {
  try {
    const { testName, typeOfTest, content } = req.body;
    
    // save data to db
    const newTest = new Test({
      testName,
      typeOfTest,
      content
    });
    
    await newTest.save();
    res.status(201).json({ message: 'Test created successfully', test: newTest });
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error: error.message });
  }
}

// routes: GET /getTest/:id
// description: Get a test by ID
const getTest = async (req, res) => {
  try {
    const testId = req.params.id;
    
    // Get all the data of the test from db
    const test = await Test.findById(testId).select('-content.reading.questions.correctAnswer -content.listening.questions.correctAnswer');
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    res.status(200).json({ test }); 
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving test', error: error.message });
  }
}
//Route: 
//desc : get all tasks
const getAllTests = async (req,res) => {
    try {
      const tests = await Test.find().select('testName typeOfTest createdAt');
      if(tests.length === 0) {
        return res.status(404).json({ message: 'No tests found' });
      }
      res.status(200).json({ tests });
    }catch(error) {
      res.status(500).json({ message: 'Error retrieving tests', error: error.message });
    }
}

//route
//desc : sumbit test
const submitTest = async (req, res) => {
  // Lấy ID tự động dù middleware của bạn dùng tên biến nào
  const userId = req.user?._id || req.user?.id || req.userId; 
  
  if (!userId) {
    return res.status(401).json({ message: 'Lỗi xác thực: Không tìm thấy thông tin user' });
  }

  const { id, studentAnswers } = req.body;
  
  try {
    if (!id || !studentAnswers) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const findTest = await Test.findById(id);
    if (!findTest) {
      return res.status(404).json({ message: 'Test not found' });
    }
    
    let correctCount = 0; 
    let readingAnswers = []; // Mảng này sẽ lưu data theo chuẩn multipleChoiceAnswerSchema
    
    const readingData = findTest.content?.reading || [];
    
    for (let i = 0; i < readingData.length; i++) {
      const currentPart = readingData[i];
      const questionsArray = currentPart.questions || [];

      for (let j = 0; j < questionsArray.length; j++) {
        const currentQuestion = questionsArray[j];
        
        const questionIdString = currentQuestion.id.toString();
        const answerOfStudent = studentAnswers[questionIdString] || "";
        const answerOfDatabase = currentQuestion.correctAnswer;
        
        let isCorrect = false;
        if (answerOfStudent === answerOfDatabase) {
          isCorrect = true;
          correctCount = correctCount + 1; 
        }
        
        // Đóng gói đáp án chuẩn theo cấu trúc schema bạn vừa tạo
        readingAnswers.push({
          questionId: currentQuestion._id,
          selectedOption: answerOfStudent,
          isCorrect: isCorrect
        });
      }
    }
    
    // 3. KHỞI TẠO VÀ LƯU KẾT QUẢ VÀO DATABASE
    const newResult = new Result({
      userId: userId,
      testId: id,
      status: 'submitted',
      answers: {
        reading: readingAnswers
      },
      scores: {
        reading: correctCount
      },
      submittedAt: new Date()
    });

    await newResult.save();
    
    // 4. Trả về client cái resultId để Frontend chuyển sang trang Xem Kết Quả
    res.status(200).json({ 
      message: 'Nộp bài thành công',
      resultId: newResult._id, 
      correctCount 
    });
    
  } catch (error) {
    res.status(500).json({ message: 'Error submitting test', error: error.message });
  }
};
module.exports = { createTest, getTest, getAllTests, submitTest };