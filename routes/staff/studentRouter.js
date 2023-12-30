const express = require("express");
const {
  adminRegisterStudent,
  loginStudent,
  getAllStudentsAdmin,
  getStudentByAdmin,
  getStudentProfile,
  studentUpdateProfile,
  adminUpdateStudent,
  writeExam,
} = require("../../controller/students/studentController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isStudent = require("../../middlewares/isStudent");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Student = require("../../model/Academic/Student");
const roleRestriction = require("../../middlewares/roleRestriction");
const Admin = require("../../model/Staff/Admin");
const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get(
  "/admin",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  getAllStudentsAdmin
);
studentRouter.get(
  "/:studentID/admin",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  getStudentByAdmin
);
studentRouter.get(
  "/profile",
  isAuthenticated(Student),
  roleRestriction("student"),
  getStudentProfile
);
studentRouter.put(
  "/update",
  isAuthenticated(Student),
  roleRestriction("student"),
  studentUpdateProfile
);
studentRouter.post(
  "/exam/:examID/write",
  isAuthenticated(Student),
  roleRestriction("student"),
  writeExam
);
studentRouter.put(
  "/:studentID/update/admin",
  isAuthenticated(Student),
  roleRestriction("admin"),
  adminUpdateStudent
);
module.exports = studentRouter;
