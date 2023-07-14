
let mongoose = require('mongoose');

// create a model class
let SurveyModel = mongoose.Schema({
    QuestionType: Boolean,
    NumberOfQuestions: Number,
    Questions: [{
      Question: String,
    Answer: [String]
    }]
},
{
  collection: "survey_r8"
});

module.exports = mongoose.model('Survey', SurveyModel);
