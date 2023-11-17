const express = require("express");
const {
  createClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require("../../controller/academics/classLevelController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

const classLevelRouter = express.Router();

classLevelRouter
  .route("/")
  .post(isLogin, isAdmin, createClassLevel)
  .get(isLogin, isAdmin, getAllClassLevels);

classLevelRouter
  .route("/:id")
  .put(isLogin, isAdmin, updateClassLevel)
  .get(isLogin, isAdmin, getSingleClassLevel)
  .delete(isLogin, isAdmin, deleteClassLevel);

module.exports = classLevelRouter;
