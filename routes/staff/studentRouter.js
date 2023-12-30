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
const studentRouter = express.Router();

studentRouter.post("/admin/register", isLogin, isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/admin", isLogin, isAdmin, getAllStudentsAdmin);
studentRouter.get("/:studentID/admin", isLogin, isAdmin, getStudentByAdmin);
studentRouter.get(
  "/profile",
  isAuthenticated(Student),
  isStudent,
  getStudentProfile
);
studentRouter.put(
  "/update",
  isAuthenticated("Student"),
  isStudent,
  studentUpdateProfile
);
studentRouter.post(
  "/exam/:examID/write",
  isAuthenticated("Student"),
  isStudent,
  writeExam
);
studentRouter.put(
  "/:studentID/update/admin",
  isLogin,
  isAdmin,
  adminUpdateStudent
);
module.exports = studentRouter;
