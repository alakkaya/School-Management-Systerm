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
  })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
      },
    })
    .populate("classLevel")
    .populate("academicTerm")
    .populate("academicYear");

  // check if exam is published
  if (examResult?.isPublished === false) {
    throw new Error("Exam result not available, check out later !");
  }

  res.json({
    status: "success",
    message: "Exam Result fetched succesfully!",
    data: examResult,
    student: student,
  });
});

//@desc  get all exam results(name,id)
//@route GET /api/v1/exam-results
//@access Private - student only

exports.getAllExamResults = AsyncHandler(async (req, res) => {
  const results = await ExamResult.find().select("exam").populate("exam");
  res.status(200).json({
    status: "success",
    message: "Exam results fetched !",
    data: results,
  });
});

//@desc  admin publishing exam results
//@route PUT /api/v1/exam-results/:id/admin-toggle-publish
//@access Private - admin only

exports.adminToggleExamResult = AsyncHandler(async (req, res) => {
  //find exam result by id and is publihed=true
  const examResultFound = await ExamResult.findById(req.params.id);
  if (!examResultFound) {
    throw new Error("The exam result can't find!");
  }
  const publishExamResult = await ExamResult.findByIdAndUpdate(
    req.params.id,
    {
      isPublished: req.body.publish,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Exam result updated !",
    data: publishExamResult,
  });
});
