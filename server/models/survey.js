
let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question: String,
  questionType: String,
  min: Number,
  max: Number,
  answers: [String]
});

//create a model class for surveys list
let SurveyModel = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  created: String,
  questions: [questionSchema]
});

const Survey = mongoose.model('Survey', SurveyModel);

module.exports = Survey;


