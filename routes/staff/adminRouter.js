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
const isLogin = require("../../middlewares/isLogin");

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", isLogin, getSingleAdmin);
adminRouter.put("/:id", updateAdmin);
adminRouter.delete("/:id", deleteAdmin);
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacher);
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendTeacher);
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacher);
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacher);
adminRouter.put("/publish/exam/:id", adminPublishResults);
adminRouter.put("/unpublish/exam/:id", adminUnpublishResults);

module.exports = adminRouter;
