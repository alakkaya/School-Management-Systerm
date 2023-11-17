const express = require("express");
const {
  globalErrHandler,
  notFoundErr,
} = require("../middlewares/globalErrHandler");
const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYear");
const academicTermRouter = require("../routes/academics/academicTerm");
const classLevelRouter = require("../routes/academics/classLevel");
const programRouter = require("../routes/academics/program");
const subjectRouter = require("../routes/academics/subject");

const app = express();

//Middlewares
app.use(express.json()); //pass incoming json data

//Routes
app.use("/api/v1/admins/", adminRouter);
app.use("/api/v1/academic-years/", academicYearRouter);
app.use("/api/v1/academic-terms/", academicTermRouter);
app.use("/api/v1/class-levels/", classLevelRouter);
app.use("/api/v1/programs/", programRouter);
app.use("/api/v1/subjects/", subjectRouter);

//Error Middlewares
app.use(notFoundErr);
app.use(globalErrHandler);

module.exports = app;
