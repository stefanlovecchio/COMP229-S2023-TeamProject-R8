let mongoose = require('mongoose');

let questionSchema = new mongoose.Schema({
  question: String,
  answers: [String],
  correctAnswer: String
});

//create a model class for results list
let ResultModel = mongoose.Schema({
  title: String,
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // not sure if this is necessary

},
  questions: [questionSchema]
});

const Result = mongoose.model('Result', ResultModel);

module.exports = Result;