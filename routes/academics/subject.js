const express = require("express");
const {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../../controller/academics/subjectController");

const Admin = require("../../model/Staff/Admin");
const roleRestriction = require("../../middlewares/roleRestriction");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const subjectRouter = express.Router();
subjectRouter
  .route("/:programID")
  .post(isAuthenticated(Admin), roleRestriction("admin"), createSubject);

subjectRouter
  .route("/")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAllSubjects);

subjectRouter
  .route("/:id")
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateSubject)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getSingleSubject)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteSubject);

module.exports = subjectRouter;
