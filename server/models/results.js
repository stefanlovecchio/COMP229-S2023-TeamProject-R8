let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question: String,
  answers: [String]
});

//create a model class for results list
let ResultModel = mongoose.Schema({
  title: String,
  questions: [questionSchema]
});

const Result = mongoose.model('Result', ResultModel);

module.exports = Result;