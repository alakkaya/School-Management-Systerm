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
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const roleRestriction = require("../../middlewares/roleRestriction");

const yearGroupRouter = express.Router();

yearGroupRouter
  .route("/")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAllYearGroups)
  .post(isAuthenticated(Admin), roleRestriction("admin"), createYearGroup);

yearGroupRouter
  .route("/:id")
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateYearGroups)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getSingleYearGroup)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteYearGroup);

module.exports = yearGroupRouter;
