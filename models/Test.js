const mongoose = require('mongoose');

// 1. Schema cho các câu hỏi trắc nghiệm
const multipleChoiceSchema = new mongoose.Schema({
    questionNumber: Number,
    prompt: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

// 2. Schema cho Reading
const readingPartSchema = new mongoose.Schema({
    passageTitle: String,
    passageText: { type: String, required: true },
    questions: [multipleChoiceSchema]
});

// 3. Schema cho Listening
const listeningPartSchema = new mongoose.Schema({
    audioUrl: { type: String, required: true },
    transcript: String,
    questions: [multipleChoiceSchema]
});

// 4. Schema cho Writing
const writingTaskSchema = new mongoose.Schema({
    taskNumber: Number,
    prompt: { type: String, required: true },
    minWords: Number
});

// 5. Schema cho Speaking
const speakingPartSchema = new mongoose.Schema({
    partNumber: Number,
    topic: String,
    prompts: [{ type: String }]
});

// 6. Schema tổng cho bài Test
const testSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    typeOfTest: {
        type: String,
        default: 'VSTEP'
    },
    content: {
        reading: [readingPartSchema],
        listening: [listeningPartSchema],
        writing: [writingTaskSchema],
        speaking: [speakingPartSchema]
    }
}, { timestamps: true });

const Test = mongoose.model('Test', testSchema);
module.exports = Test;