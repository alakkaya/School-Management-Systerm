const Teacher = require("../model/Staff/Teacher");

const isTeacher = async (req, res, next) => {
  //find user
  const userId = req?.userAuth?._id;
  const teacherFound = await Teacher.findById(userId);
  //check if teacher
  if (teacherFound?.role === "teacher") {
    next();
  } else {
    next(new Error("Access Denied, Teachers only!"));
  }
};

module.exports = isTeacher;
