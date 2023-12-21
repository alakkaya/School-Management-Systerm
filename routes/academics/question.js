const express = require("express");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
} = require("../../controller/academics/questionController");

const questionRouter = express.Router();

questionRouter.post("/:examID", isTeacherLogin, isTeacher, createQuestion);
questionRouter.get("/", isTeacherLogin, isTeacher, getAllQuestions);
questionRouter
  .route("/:id")
  .get(isTeacherLogin, isTeacher, getSingleQuestion)
  .put(isTeacherLogin, isTeacher, updateQuestion);

module.exports = questionRouter;
