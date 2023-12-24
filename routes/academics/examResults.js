const express = require("express");
const {
  checkExamResults,
} = require("../../controller/academics/examResultsController");

const examResultRouter = express.Router();

examResultRouter.get("/:id/checking", checkExamResults);
module.exports = examResultRouter;
