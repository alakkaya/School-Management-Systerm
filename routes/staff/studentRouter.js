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
const isStudentLogin = require("../../middlewares/isStudentLogin");
const isStudent = require("../../middlewares/isStudent");
const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentsAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.put("/update", isStudentLogin, isStudent, studentUpdateProfile);
studentRouter.post("/exam/:examID/write", isStudentLogin, isStudent, writeExam);
studentRouter.put(
  "/:studentID/update/admin",
  isLogin,
  isAdmin,
  adminUpdateStudent
);
module.exports = studentRouter;
