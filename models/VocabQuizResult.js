const mongoose = require('mongoose');

const vocabResultSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    vocabQuizId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'VocabQuiz', 
        required: true 
    },
    score: { 
        type: Number, 
        required: true 
    },
    wrongWords: [{ 
        type: String 
    }]
}, { timestamps: true });

module.exports = mongoose.model('VocabResult', vocabResultSchema);