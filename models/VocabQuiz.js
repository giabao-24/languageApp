const mongoose = require('mongoose');

const vocabQuizSchema = new mongoose.Schema({
   topicName: {type:String,required:true},
   level : {type:String,default:"HSK1"},
   words: [{
    imgUrl:{type:String,required:true},
    targetWord:{type:String,required:true},
    pinyin:{type:String},
    meaning:{type:String}
   }]
},{timestamps:true});

module.exports = mongoose.model('VocabQuiz',vocabQuizSchema);