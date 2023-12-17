const Teacher = require("../model/Staff/Teacher");
const verifyToken = require("../utils/verifyToken");

const isTeacherLogin = async (req, res, next) => {
  //get token from header
  //in POSTMAN don't forget to use headers sections !
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //the above mean-> const token =headerObj &&headerObj.authorization &&headerObj.authorization.split(" ")[1];
  //verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    //find the teachers
    const user = await Teacher.findById(verifiedToken.id).select(
      "name email role"
    );
    //save the user into req.obj
    req.userAuth = user;
    next();
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }
};

module.exports = isTeacherLogin;
