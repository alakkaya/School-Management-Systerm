const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
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
  const { program, classLevels, academicYear, name, email, prefectName } =
    req.body;

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
