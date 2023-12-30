const express = require("express");
const {
  createAcademicYear,
  getAllAcademicYears,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controller/academics/academicYearController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const roleRestriction = require("../../middlewares/roleRestriction");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const academicYearRouter = express.Router();

// academicYearRouter.post("/", isAuthenticated(Admin),
//   roleRestriction("admin"), createAcademicYear);
// // academicYearRouter.get("/", isAuthenticated(Admin),
//   roleRestriction("admin"), getAllAcademicYears);

academicYearRouter
  .route("/")
  .post(isAuthenticated(Admin), roleRestriction("admin"), createAcademicYear)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAllAcademicYears);

academicYearRouter
  .route("/:id")
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateAcademicYear)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getSingleAcademicYear)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteAcademicYear);

// academicYearRouter.get("/:id", isAuthenticated(Admin),
//   roleRestriction("admin"), getSingleAcademicYear);
// // academicYearRouter.put("/:id", isAuthenticated(Admin),
//   roleRestriction("admin"), updateAcademicYear);
// // academicYearRouter.delete("/:id", isAuthenticated(Admin),
//   roleRestriction("admin"), deleteAcademicYear);

module.exports = academicYearRouter;
