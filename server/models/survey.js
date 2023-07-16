
let mongoose = require('mongoose');


//create a model class for surveys list
let SurveyModel = mongoose.Schema({
  Title: String,
  Description: String,
  NumberMCQuestions: Number,
  NumberSCQuestions: Number,
  NumberAnswers: Number
  
}, {collection: "surveys"});

// create a model class for questions
let QuestionModel = mongoose.Schema({
  Survey: {type: mongoose.Schema.Types.ObjectId, ref: 'Surveys'},
    QuestionType: Boolean,
    NumberOfQuestions: Number,
    Questions: [{
      Question: String,
    Answer: [String]
    }]
},
{
  collection: "questions"
});

module.exports = mongoose.model('Questions', QuestionModel);
module.exports = mongoose.model('Surveys', SurveyModel);
