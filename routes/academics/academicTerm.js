const express = require("express");
const {
  createAcademicTerm,
  getAllAcademicTerms,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controller/academics/academicTermController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");
const roleRestriction = require("../../middlewares/roleRestriction");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const academicTermRouter = express.Router();

academicTermRouter
  .route("/")
  .post(isAuthenticated(Admin), roleRestriction("admin"), createAcademicTerm)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAllAcademicTerms);

academicTermRouter
  .route("/:id")
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateAcademicTerm)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getSingleAcademicTerm)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteAcademicTerm);

module.exports = academicTermRouter;
