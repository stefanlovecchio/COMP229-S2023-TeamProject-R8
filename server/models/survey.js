
let mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
  answer: String,
  isCorrect: Boolean
});
let questionSchema = new mongoose.Schema({
  question: String,
  answers: [answerSchema]
});

//create a model class for surveys list
let SurveyModel = mongoose.Schema({
  Title: String,
  Description: String,
  NumberMCQuestions: Number,
  NumberSCQuestions: Number,
  NumberAnswers: Number,
  numQuestions: Number,
  questions: [questionSchema]
});



const Survey = mongoose.model('Survey', SurveyModel);

module.exports = Survey;


