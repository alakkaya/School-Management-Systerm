const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");

const createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if name exists
  const termFound = await AcademicTerm.findOne({ name });
  if (termFound) {
    throw new Error("The academic term is already exists");
  }

  //create
  const newAcademicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  //push academic term into admin
  const currentAdmin = await Admin.findById(req.userAuth._id);
  currentAdmin.academicTerms.push(newAcademicTerm._id);
  await currentAdmin.save();

  res.status(201).json({
    status: "success",
    message: "Academic term created succesfully! ",
    data: newAcademicTerm,
  });
});

const getAllAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res.status(200).json({
    length: academicTerms.length,
    status: "success",
    message: "All academic terms fetched succesfully!",
    data: academicTerms,
  });
});

//@desc Register admin
//@route GET /api/academic-terms/:id
//@access Private
const getSingleAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);

  if (!academicTerm) {
    throw new Error("Academic year not found");
  } else {
    res.status(200).json({
      status: "success",
      data: academicTerm,
      message: "The academic term fetched succesfully!",
    });
  }
});

const updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, duration, description } = req.body;
  //if name is taken
  const nameExist = await AcademicTerm.findOne({ name });
  if (nameExist) {
    throw new Error("The academic term is already exists!");
  }

  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      duration,
      description,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: academicTerm,
    message: "Academic term updated succesfully!",
  });
});

const deleteAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    deletedData: academicTerm,
    message: "Academic term deleted succesfully!",
  });
});

module.exports = {
  createAcademicTerm,
  getAllAcademicTerms,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
};
