const express = require("express");
const {
  adminRegisterTeacher,
  loginTeacher,
  getAllTeachersAdmin,
  getTeacherByAdmin,
  getTeacherProfile,
  teacherUpdateProfile,
  adminUpdateTeacher,
} = require("../../controller/staff/teacherController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
const isTeacher = require("../../middlewares/isTeacher");

const teacherRouter = express.Router();

teacherRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/admin", isLogin, isAdmin, getAllTeachersAdmin);
teacherRouter.get("/:teacherID/admin", isLogin, isAdmin, getTeacherByAdmin);
teacherRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
teacherRouter.put(
  "/:teacherID/update",
  isTeacherLogin,
  isTeacher,
  teacherUpdateProfile
);
teacherRouter.put(
  "/:teacherID/update/admin",
  isLogin,
  isAdmin,
  adminUpdateTeacher
);

module.exports = teacherRouter;
