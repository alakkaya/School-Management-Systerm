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

const academicYearRouter = express.Router();

// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/", isLogin, isAdmin, getAllAcademicYears);

academicYearRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicYear)
  .get(isLogin, isAdmin, getAllAcademicYears);

academicYearRouter
  .route("/:id")
  .put(isLogin, isAdmin, updateAcademicYear)
  .get(isLogin, isAdmin, getSingleAcademicYear)
  .delete(isLogin, isAdmin, deleteAcademicYear);

// academicYearRouter.get("/:id", isLogin, isAdmin, getSingleAcademicYear);
// academicYearRouter.put("/:id", isLogin, isAdmin, updateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin, deleteAcademicYear);

module.exports = academicYearRouter;
