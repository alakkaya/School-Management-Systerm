const express = require("express");
const {
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deleteProgram,
} = require("../../controller/academics/programController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const programRouter = express.Router();

programRouter
  .route("/")
  .post(isLogin, isAdmin, createProgram)
  .get(isLogin, isAdmin, getAllPrograms);

programRouter
  .route("/:id")
  .put(isLogin, isAdmin, updateProgram)
  .get(isLogin, isAdmin, getSingleProgram)
  .delete(isLogin, isAdmin, deleteProgram);

module.exports = programRouter;
