const express = require("express");

const {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
} = require("../../controller/academics/examController");
const roleRestriction = require("../../middlewares/roleRestriction");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Teacher = require("../../model/Staff/Teacher");
const examRouter = express.Router();

examRouter
  .route("/")
  .post(isAuthenticated(Teacher), roleRestriction("teacher"), createExam)
  .get(isAuthenticated(Teacher), roleRestriction("teacher"), getAllExams);

examRouter
  .route("/:id")
  .get(isAuthenticated(Teacher), roleRestriction("teacher"), getSingleExam)
  .put(isAuthenticated(Teacher), roleRestriction("teacher"), updateExam);

module.exports = examRouter;
