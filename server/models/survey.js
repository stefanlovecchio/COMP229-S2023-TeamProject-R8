
let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question: String,
  questionType: String,
  answers: [String]
});

//create a model class for surveys list
let SurveyModel = mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema]
});

const Survey = mongoose.model('Survey', SurveyModel);

module.exports = Survey;


