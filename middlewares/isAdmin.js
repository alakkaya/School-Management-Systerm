const Admin = require("../model/Staff/Admin");

const isAdmin = async (req, res, next) => {
  //find user
  const userId = req?.userAuth?._id;
  const adminFound = await Admin.findById(userId);
  //check if admin
  if (adminFound?.role === "admin") {
    next();
  } else {
    next(new Error("Access Denied, Admin only!"));
  }
};

module.exports = isAdmin;
