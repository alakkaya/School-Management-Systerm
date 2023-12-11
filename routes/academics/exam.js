const express = require("express");

const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
} = require("../../controller/academics/examController");

const examRouter = express.Router();

examRouter
  .route("/")
  .post(isTeacherLogin, isTeacher, createExam)
  .get(isTeacherLogin, isTeacher, getAllExams);

examRouter
  .route("/:id")
  .get(isTeacherLogin, isTeacher, getSingleExam)
  .put(isTeacherLogin, isTeacher, updateExam);

module.exports = examRouter;
