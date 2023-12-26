const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../model/Academic/ExamResults");

//@desc  exam results checking
//@route GET /api/v1/exam-results/:id/checking
//@access Private - student only

exports.checkExamResults = AsyncHandler(async (req, res) => {
  res.json("checking results!");
});

//@desc  get all exam results(name,id)
//@route GET /api/v1/exam-results
//@access Private - student only

exports.getAllExamResults = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find();
  res.status(200).json({
    status: "success",
    message: "Exam results fetched !",
    data: results,
  });
});
