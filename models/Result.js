const mongoose = require('mongoose');

// Schema phụ lưu câu trả lời trắc nghiệm (Reading/Listening)
const multipleChoiceAnswerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Trỏ tới _id của câu hỏi trong Test
    selectedOption: String, // Thí sinh chọn A, B, C hoặc D
    isCorrect: Boolean // True nếu chọn đúng (dùng để tính điểm tự động)
}, { _id: false });

// Schema phụ lưu bài làm tự luận (Writing)
const writingAnswerSchema = new mongoose.Schema({
    taskNumber: Number,
    submittedText: String, // Bài viết của thí sinh
    examinerComment: String, // Nhận xét của giám khảo (cập nhật sau)
    score: { type: Number, default: 0 }
}, { _id: false });

// Schema phụ lưu bài thi nói (Speaking)
const speakingAnswerSchema = new mongoose.Schema({
    partNumber: Number,
    audioRecordUrl: String, // Link file ghi âm thí sinh upload lên (AWS S3, Cloudinary...)
    examinerComment: String,
    score: { type: Number, default: 0 }
}, { _id: false });

// SCHEMA CHÍNH CHO RESULT
const resultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
    
    // Trạng thái bài thi
    status: {
        type: String,
        enum: ['in_progress', 'submitted', 'graded'],
        default: 'in_progress'
    },
    
    // Lưu chi tiết bài làm của thí sinh
    answers: {
        reading: [multipleChoiceAnswerSchema],
        listening: [multipleChoiceAnswerSchema],
        writing: [writingAnswerSchema],
        speaking: [speakingAnswerSchema]
    },

    // Điểm số thành phần và tổng điểm
    scores: {
        reading: { type: Number, default: 0 },
        listening: { type: Number, default: 0 },
        writing: { type: Number, default: 0 },
        speaking: { type: Number, default: 0 },
        overallBand: { type: String } // VD: 'B1', 'B2', 'C1'
    },

    startedAt: { type: Date, default: Date.now },
    submittedAt: Date
}, { timestamps: true });

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;