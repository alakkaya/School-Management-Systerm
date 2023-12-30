const express = require("express");

const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
} = require("../../controller/academics/questionController");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const Teacher = require("../../model/Staff/Teacher");
const roleRestriction = require("../../middlewares/roleRestriction");
const questionRouter = express.Router();

questionRouter.post(
  "/:examID",
  isAuthenticated(Teacher),
  roleRestriction("teacher"),
  createQuestion
);
questionRouter.get(
  "/",
  isAuthenticated(Teacher),
  roleRestriction("teacher"),
  getAllQuestions
);
questionRouter
  .route("/:id")
  .get(isAuthenticated(Teacher), roleRestriction("teacher"), getSingleQuestion)
  .put(isAuthenticated(Teacher), roleRestriction("teacher"), updateQuestion);

module.exports = questionRouter;
