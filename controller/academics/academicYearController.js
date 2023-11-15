const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");

const createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //check if name exists
  const yearFound = await AcademicYear.findOne({ name });
  if (yearFound) {
    throw new Error("The academic year is already exists");
  }

  //create
  const newAcademicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
  });

  //push academic year into admin
  const currentAdmin = await Admin.findById(req.userAuth._id);
  currentAdmin.academicYears.push(newAcademicYear._id);
  await currentAdmin.save();

  res.status(201).json({
    status: "success",
    message: "Academic year created succesfully! ",
    data: newAcademicYear,
  });
});

const getAllAcademicYears = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res.status(200).json({
    length: academicYears.length,
    status: "success",
    message: "All academic years fetched succesfully!",
    data: academicYears,
  });
});

//@desc Register admin
//@route GET /api/academic-years/:id
//@access Private
const getSingleAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id);

  if (!academicYear) {
    throw new Error("Academic year not found");
  } else {
    res.status(200).json({
      status: "success",
      data: academicYear,
      message: "The academic year fetched succesfully!",
    });
  }
});

const updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  //if name is taken
  const nameExist = await AcademicYear.findOne({ name });
  if (nameExist) {
    throw new Error("The academic year is already exists!");
  }

  const academicYear = await AcademicYear.findByIdAndUpdate(
    req.params.id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: academicYear,
    message: "Academic year updated succesfully!",
  });
});

const deleteAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    deletedData: academicYear,
    message: "Academic year deleted succesfully!",
  });
});

module.exports = {
  createAcademicYear,
  getAllAcademicYears,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
};
