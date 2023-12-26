const express = require("express");
const {
  checkExamResults,
  getAllExamResults,
  adminToggleExamResult,
} = require("../../controller/academics/examResultsController");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");

const examResultRouter = express.Router();

examResultRouter.get("/", isStudentLogin, isStudent, getAllExamResults);
examResultRouter.get(
  "/:id/checking",
  isStudentLogin,
  isStudent,
  checkExamResults
);
examResultRouter.put(
  "/:id/admin-toggle-publish",
  isLogin,
  isAdmin,
  adminToggleExamResult
);

module.exports = examResultRouter;
