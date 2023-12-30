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
const roleRestriction = require("../../middlewares/roleRestriction");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const questionRouter = express.Router();
const programRouter = express.Router();

programRouter
  .route("/")
  .post(isAuthenticated(Admin), roleRestriction("admin"), createProgram)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAllPrograms);

programRouter
  .route("/:id")
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateProgram)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getSingleProgram)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteProgram);

module.exports = programRouter;
