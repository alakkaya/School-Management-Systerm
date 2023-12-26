const express = require("express");
const {
  checkExamResults,
  getAllExamResults,
} = require("../../controller/academics/examResultsController");

const examResultRouter = express.Router();

examResultRouter.get("/:id/checking", checkExamResults);
examResultRouter.get("/", getAllExamResults);

module.exports = examResultRouter;
