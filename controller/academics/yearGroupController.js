const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academic/Subject");
const YearGroup = require("../../model/Academic/YearGroups");

//@desc Create year group
//@route POST /api/v1/year-groups/
exports.createYearGroup = AsyncHandler(async (req, res) => {
  //we will take createdBy property from req.userAuth, not req.body
  const { name, academicYear } = req.body;

  //check if exists
  const yearGroup = await YearGroup.findOne({ name });

  if (yearGroup) {
    throw new Error("Year group/Graduation year is already exists");
  }

  //create
  const newYearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });

  //find the admin
  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error("Admin not found");
  }
  //push the yearGroup into admin.

  admin.yearGroups.push(newYearGroup._id);
  await admin.save();

  res.status(201).json({
    status: "success",
    message: "Year group created succesfully! ",
    data: newYearGroup,
  });
});

//@route GET /api/v1/year-groups/

exports.getAllYearGroups = AsyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();
  res.status(200).json({
    length: yearGroups.length,
    status: "success",
    message: "All year groups fetched succesfully!",
    data: yearGroups,
  });
});

//@route GET /api/v1/year-groups/:id

exports.getSingleYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);

  if (!yearGroup) {
    throw new Error("The yearGroup is not found");
  } else {
    res.status(200).json({
      status: "success",
      data: yearGroup,
      message: "The yearGroup is fetched succesfully!",
    });
  }
});

exports.updateYearGroups = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  //if name is taken
  const nameExist = await YearGroup.findOne({ name });
  if (nameExist) {
    throw new Error("The year group is already exists!");
  }

  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: yearGroup,
    message: "Year Group is updated succesfully!",
  });
});

//@route DELETE /api/v1/year-groups/:id

exports.deleteYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    deletedData: yearGroup,
    message: "The year group deleted succesfully!",
  });
});
