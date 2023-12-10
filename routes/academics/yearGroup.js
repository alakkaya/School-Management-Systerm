const express = require("express");
const {
  createYearGroup,
  getAllYearGroups,
  getSingleYearGroup,
  updateYearGroups,
  deleteYearGroup,
} = require("../../controller/academics/yearGroupController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const yearGroupRouter = express.Router();

yearGroupRouter
  .route("/")
  .get(isLogin, isAdmin, getAllYearGroups)
  .post(isLogin, isAdmin, createYearGroup);

yearGroupRouter
  .route("/:id")
  .put(isLogin, isAdmin, updateYearGroups)
  .get(isLogin, isAdmin, getSingleYearGroup)
  .delete(isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
