const AsyncHandler = require("express-async-handler");
const ExamResult = require("../../model/Academic/ExamResults");
const Student = require("../../model/Academic/Student");
//@desc  exam results checking
//@route GET /api/v1/exam-results/:id/checking
//@access Private - student only

exports.checkExamResults = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth._id);
  if (!student) {
    throw new Error("Student not found !");
  }
  //find the exam result
  const examResult = await ExamResult.findOne({
    studentID: student.studentId,
    _id: req.params.id,
  });

  // check if exam is published
  if (examResult?.isPublished === false) {
    throw new Error("Exam result not available, check out later !");
  }

  res.json({
    status: "success",
    message: "Exam Result fetched succesfully!",
    data: examResult,
  });
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
