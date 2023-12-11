const AsyncHandler = require("express-async-handler");
const Exam = require("../../model/Academic/Exam");
const Teacher = require("../../model/Staff/Teacher");

//@route POST /api/v1/exams
//@access Private Teachers only
exports.createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    classLevel,
    duration,
    examDate,
    examTime,
    examType,
    academicTerm,
    academicYear,
  } = req.body;

  //find teacher
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("The teacher not found");
  }
  //exam exists
  const examFound = await Exam.findOne({ name });
  if (examFound) {
    throw new Error("The exam is already exists");
  }

  //create
  const examCreated = await Exam.create({
    name,
    description,
    academicTerm,
    academicYear,
    classLevel,
    duration,
    examDate,
    examTime,
    examType,
    subject,
    program,
    createdBy: req.userAuth._id,
  });
  //push the exam into teacher
  teacherFound.examsCreated.push(examCreated._id);
  //save exam
  await examCreated.save();
  await teacherFound.save();

  res.status(201).json({
    status: "success",
    message: "Exam created succesfully! ",
    data: examCreated,
  });
});

//@route GET /api/v1/exams/
exports.getAllExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).json({
    length: exams.length,
    status: "success",
    message: "All exams fetched succesfully!",
    data: exams,
  });
});

exports.getSingleExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    throw new Error("The exam is not found");
  } else {
    res.status(200).json({
      status: "success",
      data: exam,
      message: "The exam is fetched succesfully!",
    });
  }
});

//@access teachers only
exports.updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    classLevel,
    duration,
    examDate,
    examTime,
    examType,
    academicTerm,
    academicYear,
  } = req.body; //if name is taken
  const nameExist = await Exam.findOne({ name });
  if (nameExist) {
    throw new Error("The exam is already exists!");
  }

  const exam = await Exam.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      subject,
      program,
      classLevel,
      duration,
      examDate,
      examTime,
      examType,
      academicTerm,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: exam,
    message: "Exam is updated succesfully!",
  });
});
