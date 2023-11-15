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

const academicTermRouter = express.Router();

academicTermRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicTerm)
  .get(isLogin, isAdmin, getAllAcademicTerms);

academicTermRouter
  .route("/:id")
  .put(isLogin, isAdmin, updateAcademicTerm)
  .get(isLogin, isAdmin, getSingleAcademicTerm)
  .delete(isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
