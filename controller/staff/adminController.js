const Admin = require("../../model/Staff/Admin");

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check if email exist
    adminFound = await Admin.findOne({ email });
    if (adminFound) {
      return res.status(400).json("Email is already exists!");
    }

    const newAdmin = await Admin.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      status: "Success",
      message: "Admin has been registered.",
      data: newAdmin,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    if (user && (await user.verifyPassword(password))) {
      return res.status(200).json({
        success: true,
        message: "Admin has logged in!",
        data: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Passwords don't match",
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "All admins.",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const getSingleAdmin = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Single admin.",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    res.status(201).json({
      status: "Success",
      data: "Admin is updated",
    });
  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message,
    });
  }
};

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
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
  adminSuspendTeacher,
  adminUnsuspendTeacher,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublishResults,
  adminUnpublishResults,
};
