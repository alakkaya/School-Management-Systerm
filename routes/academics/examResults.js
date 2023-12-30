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
const roleRestriction = require("../../middlewares/roleRestriction");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Student = require("../../model/Academic/Student");
const examResultRouter = express.Router();

examResultRouter.get(
  "/",
  isAuthenticated(Student),
  roleRestriction("student"),
  getAllExamResults
);
examResultRouter.get(
  "/:id/checking",
  isAuthenticated(Student),
  roleRestriction("student"),
  checkExamResults
);
examResultRouter.put(
  "/:id/admin-toggle-publish",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  adminToggleExamResult
);

module.exports = examResultRouter;
