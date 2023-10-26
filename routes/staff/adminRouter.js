const express = require("express");
const {
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
} = require("../../controller/staff/adminController");

const adminRouter = express.Router();

adminRouter.route("/register").post(registerAdmin);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/").get(getAllAdmins);
adminRouter.route("/:id").get(getSingleAdmin);
adminRouter.route("/:id").put(updateAdmin);
adminRouter.route("/:id").delete(deleteAdmin);
adminRouter.route("/suspend/teacher/:id").put(adminSuspendTeacher);
adminRouter.route("/unsuspend/teacher/:id").put(adminUnsuspendTeacher);
adminRouter.route("/withdraw/teacher/:id").put(adminWithdrawTeacher);
adminRouter.route("/unwithdraw/teacher/:id").put(adminUnwithdrawTeacher);
adminRouter.route("/publish/exam/:id").put(adminPublishResults);
adminRouter.route("/unpublish/exam/:id").put(adminUnpublishResults);

module.exports = adminRouter;
