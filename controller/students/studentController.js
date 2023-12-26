const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const Exam = require("../../model/Academic/Exam");
const ExamResults = require("../../model/Academic/ExamResults");
const { hashPassword, isPasswordMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

//@desc Admin Register Student
//@route POST /api/v1/students/admin/register
//@access Private - admin only

exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check student already exist
  const studentFound = await Student.findOne({ email });
  if (studentFound) {
    throw new Error("Student is already employed");
  }

  //register
  const newStudent = await Student.create({
    name,
    email,
    password: await hashPassword(password),
    createdBy: req.userAuth._id,
  });
  res.status(201).json({
    status: "Success",
    message: "Student registered succesfully.",
    data: newStudent,
  });
});

//@route POST /api/v1/students/login

exports.loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check Student already exist
  const studentFound = await Student.findOne({ email });
  if (!studentFound) {
    return res.status(404).json({
      message: "Student not found!",
    });
  }

  //verifyPassword
  const isMatched = await isPasswordMatched(password, studentFound?.password);

  if (!isMatched) {
    return res.json({
      message: "Passwords don't match!",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Student has logged in succesfully!",
      data: generateToken(studentFound?._id),
      studentFound,
    });
  }
});

//@route GET /api/v1/students/admin
//@access private admin only

exports.getAllStudentsAdmin = AsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "success",
    message: "All students fetched succesfully!",
    data: students,
  });
});

//@route GET /api/v1/students/profile
//@access private students only

exports.getStudentProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req?.userAuth?._id).select(
    "-password,-createdAt,-updatedAt"
  );
  if (!student) {
    throw new Error("Student not found ! ");
  }

  res.status(200).json({
    status: "success",
    message: "Student profile fetched succesfully!",
    data: student,
  });
});

//@route GET /api/v1/students/:studentID/admin
//@access private admin only

exports.getStudentByAdmin = AsyncHandler(async (req, res) => {
  const studentID = req.params.studentID;
  //find student
  const student = await Student.findById(studentID);
  if (!student) {
    throw new Error("student not found!");
  }

  res.status(200).json({
    status: "success",
    message: "student fetched succesfully!",
    data: student,
  });
});

//@route PUT /api/v1/students/update
//@access private student only
exports.studentUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //if email is taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //check if student updating password
  if (password) {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "student updated succesfully!",
    });
  } else {
    //update
    const student = await Student.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: student,
      message: "student updated succesfully!",
    });
  }
});

//@desc Admin updating student profile
//@route PUT /api/v1/students/:studentID/update/admin
//@access private admin only

exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
  const {
    program,
    classLevels,
    academicYear,
    name,
    email,
    prefectName,
    isSuspended,
    isWithdrawn,
  } = req.body;

  const studentFound = await Student.findById(req.params.studentID);
  if (!studentFound) {
    throw new Error("student not found!");
  }

  //update
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        prefectName,
        isSuspended,
        isWithdrawn,
      },
      $addToSet: {
        classLevels,
      },
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: updatedStudent,
    message: "student updated succesfully!",
  });
});

//@desc Student taxing exam
//@route POST /api/v1/students/exam/:examID/write
//@access private student only

exports.writeExam = AsyncHandler(async (req, res) => {
  //get student
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("Student is not found!");
  }
  //get Exam with populate to see questions
  const examFound = await Exam.findById(req.params.examID)
    .populate("questions")
    .populate("academicTerm");
  if (!examFound) {
    throw new Error("Exam is not found!");
  }
  //get questions
  const questions = examFound.questions;
  //get student's answer
  const studentAnswers = req.body.answers;

  //check if student answered all questions
  if (studentAnswers.length !== questions.length) {
    throw new Error("You have not answered all the questions!");
  }

  //check if student has already taken the exams
  const studentFoundInExamResults = await ExamResults.findOne({
    student: studentFound?._id,
  });
  if (studentFoundInExamResults) {
    throw new Error("You have already written this exam ");
  }
  //check if student suspended/withdrawn
  // if (studentFound.isWithdrawn || studentFound.isSuspended) {
  //   throw new Error("You are suspended/withdrawn, you can't take this exan.");
  // }

  //build report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let status = ""; //failed or passed
  let remarks = "";
  let grade = 0;
  let score = 0;
  let answeredQuestions = [];

  //check for answers
  for (let i = 0; i < questions.length; i++) {
    //find question
    const question = questions[i];
    //check if the answer is correct
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }

  //calculate reports

  grade = (correctAnswers / questions.length) * 100;
  answeredQuestions = questions.map((questions) => {
    return {
      question: questions.question,
      correctAnswer: questions.correctAnswer,
      isCorrect: questions.isCorrect,
    };
  });

  if (grade >= 50) {
    status = "Passed";
  } else {
    status = "Failed";
  }
  //remarks
  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 70) {
    remarks = "Very Good";
  } else if (grade >= 600) {
    remarks = "Good";
  } else if (grade >= 50) {
    remarks = "Fair";
  } else {
    remarks = "Poor";
  }

  //generate exam result
  const examResults = await ExamResults.create({
    studentID: studentFound?.studentId,
    exam: examFound?._id,
    grade,
    score,
    status,
    remarks,
    classLevel: examFound?.classLevel,
    academicTerm: examFound?.academicTerm,
    academicYear: examFound?.academicYear,
  });

  //push the results into student
  studentFound.examResults.push(examResults?._id);
  //save
  await studentFound.save();

  //promoting students
  //promote student to level 200
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound?.currentClassLevel === "level 100"
  ) {
    //promote student to "level 200"
    studentFound.classLevels.push("level 200");
    studentFound.currentClassLevel = "level 200";
    await studentFound.save();
  }

  //promote student to level 300
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound?.currentClassLevel === "level 200"
  ) {
    //promote student to "level 200"
    studentFound.classLevels.push("level 300");
    studentFound.currentClassLevel = "level 300";
    await studentFound.save();
  }

  //promote student to level 400
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound?.currentClassLevel === "level 300"
  ) {
    //promote student to "level 200"
    studentFound.classLevels.push("level 400");
    studentFound.currentClassLevel = "level 400";
    await studentFound.save();
  }

  //promote student to graduate
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound?.currentClassLevel === "level 400"
  ) {
    studentFound.isGraduated = true;
    studentFound.yearGraduated = new Date();
    await studentFound.save();
  }
  //send
  res.status(200).json({
    status: "success",
    data: "You have submitted your exam. Check later for the results!",
  });
});
