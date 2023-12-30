const express = require("express");
const {
  createClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require("../../controller/academics/classLevelController");

const roleRestriction = require("../../middlewares/roleRestriction");
const Admin = require("../../model/Staff/Admin");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const classLevelRouter = express.Router();

classLevelRouter
  .route("/")
  .post(isAuthenticated(Admin), roleRestriction("admin"), createClassLevel)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAllClassLevels);

classLevelRouter
  .route("/:id")
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateClassLevel)
  .get(isAuthenticated(Admin), roleRestriction("admin"), getSingleClassLevel)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteClassLevel);

module.exports = classLevelRouter;
