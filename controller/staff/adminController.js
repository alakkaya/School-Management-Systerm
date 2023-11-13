const AsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPasswordMatched } = require("../../utils/helpers");
const registerAdmin = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //check if email exist
  adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("Admin exists");
  }

  //register
  const newAdmin = await Admin.create({
    name,
    email,
    password: await hashPassword(password),
  });

  res.status(201).json({
    status: "Success",
    message: "Admin has been registered succesfully.",
    data: newAdmin,
  });
});

const loginAdmin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find user
  const user = await Admin.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
  }
  //verifyPassword

  const isMatched = await isPasswordMatched(password, user.password);

  if (!isMatched) {
    return res.json({
      message: "Passwords don't match!",
    });
  } else {
    return res.json({
      success: true,
      message: "Admin has logged in succesfully!",
      data: generateToken(user._id),
      user,
    });
  }
});

const getAllAdmins = AsyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "success",
    message: "All admins fetched succesfully!",
    data: admins,
  });
});

const getAdminProfile = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin profile fetched succesfully!",
    });
  }
});

const updateAdmin = AsyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  //if email is taken
  const emailExist = await Admin.findOne({ email });
  if (emailExist) {
    throw new Error("This email is taken/exist");
  }

  //hash password

  //check if user updating password
  if (password) {
    //update
    const admin = await Admin.findByIdAndUpdate(
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
      data: admin,
      message: "Admin updated succesfully!",
    });
  } else {
    //update
    const admin = await Admin.findByIdAndUpdate(
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
      data: admin,
      message: "Admin updated succesfully!",
    });
  }
});
const deleteAdmin = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin is deleted!",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const adminSuspendTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin is suspended teacher!",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const adminUnsuspendTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin is unsuspended teacher!",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const adminWithdrawTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin is withdrawed teacher!",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const adminUnwithdrawTeacher = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin is unwithdrawed teacher!",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const adminPublishResults = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin published exam results!",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const adminUnpublishResults = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin unpublished exam results!",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminProfile,
  updateAdmin,
  deleteAdmin,
  adminSuspendTeacher,
  adminUnsuspendTeacher,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublishResults,
  adminUnpublishResults,
};
