const Student = require("../model/Academic/Student");

const isStudent = async (req, res, next) => {
  //find current user
  const userId = req?.userAuth?._id;
  const studentFound = await Student.findById(userId);
  //check
  if (studentFound?.role === "student") {
    next();
  } else {
    next(new Error("Access Denied! Students Only !"));
  }
};

module.exports = isStudent;
