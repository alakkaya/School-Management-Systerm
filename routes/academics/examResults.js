const express = require("express");
const {
  checkExamResults,
  getAllExamResults,
} = require("../../controller/academics/examResultsController");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const examResultRouter = express.Router();

examResultRouter.get("/", isStudentLogin, isStudent, getAllExamResults);
examResultRouter.get(
  "/:id/checking",
  isStudentLogin,
  isStudent,
  checkExamResults
);
module.exports = examResultRouter;
