const express = require("express");
const morgan = require("morgan");
const adminRouter = require("../routes/staff/adminRouter");

const app = express();

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); //pass incoming json data

//Routes

//Admin Routes
app.use("/api/v1/admins/", adminRouter);

module.exports = app;
