const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const { hashPassword, isPasswordMatched } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const Admin = require("../../model/Staff/Admin");

//@desc Admin Register teacher
//@route POST /api/v1/teachers/admin/register
//@access Private

exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //find admin
  const adminFound = await Admin.findById(req.userAuth._id);
  if (!adminFound) {
    throw new Error("Admin not found! ");
  }
  //check teacher already exist
  const teacherFound = await Teacher.findOne({ email });
  if (teacherFound) {
    throw new Error("Teacher is already employed");
  }

  //register
  const newTeacher = await Teacher.create({
    name,
    email,
    password: await hashPassword(password),
    createdBy: req.userAuth._id,
  });
  //push teacher into admin
  adminFound.teachers.push(newTeacher?._id);
  await adminFound.save();
  res.status(201).json({
    status: "Success",
    message: "Teacher registered succesfully.",
    data: newTeacher,
  });
});

//@route POST /api/v1/teachers/login

exports.loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check teacher already exist
  const teacherFound = await Teacher.findOne({ email });
  if (!teacherFound) {
    return res.status(404).json({
      message: "Teacher not found!",
    });
  }

  //verifyPassword
  const isMatched = await isPasswordMatched(password, teacherFound?.password);

  if (!isMatched) {
    return res.json({
      message: "Passwords don't match!",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "Teacher has logged in succesfully!",
      data: generateToken(teacherFound?._id),
      teacherFound,
    });
  }
});

//@route GET /api/v1/teachers/admin
//@access private admin only
//          @info:
//query string comes after "?" and it shows variable (if u provide or not our controller will run but for params it must)
//params comes after "/"" like /:id ---you have toprovide params
//
exports.getAllTeachersAdmin = AsyncHandler(async (req, res) => {
  res.status(200).json(res.results);
});

//@route GET /api/v1/teachers/:teacherID/admin
//@access private admin only

exports.getTeacherByAdmin = AsyncHandler(async (req, res) => {
  const teacherID = req.params.teacherID;
  //find teacher
  const teacher = await Teacher.findById(teacherID);
  if (!teacher) {
    throw new Error("Teacher not found!");
  }

  res.status(200).json({
    status: "success",
    message: "Teacher fetched succesfully!",
    data: teacher,
  });
});

//@route GET /api/v1/teachers/profile
//@access private teacher only

exports.getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req?.userAuth?._id).select(
    "-password,-createdAt,-updatedAt"
  );
  if (!teacher) {
    throw new Error("Teacher not found ! ");
  }

  res.status(200).json({
    status: "success",
    message: "Teacher profile fetched succesfully!",
    data: teacher,
  });
});

//@route PUT /api/v1/teachers/:TeacherID/update
//@access private teacher only
exports.teacherUpdateProfile = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  //if email is taken
  const emailExist = await Teacher.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //check if teacher updating password
  if (password) {
    //update
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        password: await hashPassword(password),
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher updated succesfully!",
    });
  } else {
    //update
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth._id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher updated succesfully!",
    });
  }
});

//@desc Admin updating teacher profile
//@route PUT /api/v1/teachers/:teacherID/update/admin
//@access private admin only
exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;

  const teacherFound = await Teacher.findById(req.params.teacherID);
  if (!teacherFound) {
    throw new Error("Teacher not found!");
  }
  //check if teacher is withdraw
  if (teacherFound.isWitdrawn) {
    throw new Error("Action denied!Teacher is withdraw");
  }

  //assign a program
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated succesfully!",
    });
  }
  //assign a classLevel
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated succesfully!",
    });
  }
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated succesfully!",
    });
  }
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
    res.status(200).json({
      status: "success",
      data: teacherFound,
      message: "Teacher updated succesfully!",
    });
  }

  res.status(200).json({
    status: "success",
    data: teacherFound,
    message: "Teacher updated succesfully!",
  });
});
