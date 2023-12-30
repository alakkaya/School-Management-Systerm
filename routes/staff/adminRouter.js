const express = require("express");
const {
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
} = require("../../controller/staff/adminController");
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
const advancedResults = require("../../middlewares/advancedResults");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const roleRestriction = require("../../middlewares/roleRestriction");
const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/", isLogin, advancedResults(Admin, "programs"), getAllAdmins);
adminRouter.get(
  "/profile",
  isAuthenticated(Admin),
  roleRestriction("admin"),
  getAdminProfile
);
adminRouter.put("/", isLogin, roleRestriction("admin"), updateAdmin);
adminRouter.delete("/:id", deleteAdmin);
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacher);
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendTeacher);
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacher);
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacher);
adminRouter.put("/publish/exam/:id", adminPublishResults);
adminRouter.put("/unpublish/exam/:id", adminUnpublishResults);

module.exports = adminRouter;
