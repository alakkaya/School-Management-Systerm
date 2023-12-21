const AsyncHandler = require("express-async-handler");
const Question = require("../../model/Academic/Questions");
const Exam = require("../../model/Academic/Exam");

//@desc Create question
//@route POST /api/v1/questions/:examID
//@access Private - teachers only

exports.createQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;

  //find the exam
  const examFound = await Exam.findById(req.params.examID);
  if (!examFound) {
    throw new Error("Exam is not found!");
  }
  //check if question exists
  const questionExists = await Question.findOne({ question });
  if (questionExists) {
    throw new Error("question is already exists!");
  }
  //create question
  const questionCreated = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth._id,
  });
  //add the questions into exam
  examFound.questions.push(questionCreated?._id);
  //save
  await examFound.save();
  res.status(201).json({
    status: "success",
    message: "Question created succesfully",
    data: questionCreated,
  });
});

exports.getAllQuestions = AsyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(200).json({
    length: questions.length,
    status: "success",
    message: "All questions fetched succesfully!",
    data: questions,
  });
});

exports.getSingleQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    throw new Error("The question is not found");
  } else {
    res.status(200).json({
      status: "success",
      data: question,
      message: "The question is fetched succesfully!",
    });
  }
});

//@route PUT /api/v1/questions/:id
//@access Private - teachers only
exports.updateQuestion = AsyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
  //if question is taken
  const questionFound = await Question.findOne({ question });
  if (questionFound) {
    throw new Error("Question is already exists!");
  }

  const newQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: newQuestion,
    message: "Question is updated succesfully!",
  });
});
