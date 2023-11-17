const express = require("express");
const {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../../controller/academics/subjectController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const subjectRouter = express.Router();
subjectRouter.route("/:programID").post(isLogin, isAdmin, createSubject);

subjectRouter.route("/").get(isLogin, isAdmin, getAllSubjects);

subjectRouter
  .route("/:id")
  .put(isLogin, isAdmin, updateSubject)
  .get(isLogin, isAdmin, getSingleSubject)
  .delete(isLogin, isAdmin, deleteSubject);

module.exports = subjectRouter;
