let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question: String,
  answers: [String]
});

//create a model class for results list
let ResultModel = mongoose.Schema({
  title: String,
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Survey', 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
},
  questions: [questionSchema]
});

const Result = mongoose.model('Result', ResultModel);

module.exports = Result;