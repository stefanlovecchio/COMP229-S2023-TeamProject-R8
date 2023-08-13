module.exports = function () 
{
  return {
    "surveys": 
    [
      {
        id: 1,
        title: "survey",
        author: "stefan",
        created: "August 6, 2023",
        questions: [
          {
            question: "q1",
            questionType: "radio",
            answers: ["a1"],
          },
          {
            question: "q2",
            questionType: "radio",
            answers: ["q2a1"],
          },
        ],
        __v: 3,
        description: "a survey test",
      },
      {
        id: 2,
        title: "survey testing multiple choice",
        description: "Testing the multiple choice survey ",
        author: "Theresa",
        created: "August 7, 2023",
        questions: [
          {
            question: "Multiple choice testing question working?",
            questionType: "checkbox",
            answers: ["Yes", "no"],
          },
          {
            question: "Multiple choice testing question 2 ",
            questionType: "checkbox",
            answers: ["yes", "no"],
          },
        ],
        __v: 0,
      },
      {
        id: 3,
        title: "Maria's Test",
        description: "survey test description Maria",
        author: "MariaM",
        created: "August 10, 2023",
        questions: [
          {
            question: "1st question",
            questionType: "radio",
            answers: ["right answer", "wrong answer", "2nd wrong answer"],
          },
          {
            question: "2nd question",
            questionType: "checkbox",
            answers: ["right answer", "wrong answer", "right answer"],
          },
        ],
        __v: 0,
      },
      {
        id: 4,
        title: "slider test",
        description: "testing slider questions",
        author: "stefan",
        created: "August 12, 2023",
        questions: [
          {
            question: "q1",
            questionType: "range",
            min: 1,
            max: 5,
            answers: ["a1"],
          },
        ],
        __v: 1,
      },
      {
        id: 5,
        title: "new test",
        description: "testing that results is recieving survey id",
        author: "stefan",
        created: "August 13, 2023",
        questions: [
          {
            question: "question1",
            questionType: "radio",
            answers: ["a1", "a2"],
          },
          {
            question: "question2",
            questionType: "radio",
            answers: ["q2q1", "q2a2"],
          },
        ],
        __v: 0,
      },
    ],
  };
};
