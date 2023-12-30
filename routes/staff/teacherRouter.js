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

const advancedResults = require("../../middlewares/advancedResults");
const Teacher = require("../../model/Staff/Teacher");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const roleRestriction = require("../../middlewares/roleRestriction");
const teacherRouter = express.Router();

teacherRouter.post(
  "/admin/register",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  adminRegisterTeacher
);
teacherRouter.post("/login", loginTeacher);

teacherRouter.get(
  "/admin",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  advancedResults(Teacher, {
    path: "examsCreated",
    populate: {
      path: "questions",
    },
  }),
  getAllTeachersAdmin
);

teacherRouter.get(
  "/:teacherID/admin",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  getTeacherByAdmin
);
teacherRouter.get(
  "/profile",
  isAuthenticated(Teacher),
  roleRestriction("teacher"),
  getTeacherProfile
);
teacherRouter.put(
  "/:teacherID/update",
  isAuthenticated(Teacher),
  roleRestriction("teacher"),
  teacherUpdateProfile
);
teacherRouter.put(
  "/:teacherID/update/admin",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  adminUpdateTeacher
);

module.exports = teacherRouter;
