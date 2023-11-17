const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");

exports.createProgram = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //check if name exists
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("The program is already exists");
  }

  //create
  const newProgram = await Program.create({
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
  });

  //push program into admin
  const currentAdmin = await Admin.findById(req.userAuth._id);
  currentAdmin.programs.push(newProgram._id);
  await currentAdmin.save();

  res.status(201).json({
    status: "success",
    message: "New program created succesfully! ",
    data: newProgram,
  });
});

exports.getAllPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(200).json({
    length: programs.length,
    status: "success",
    message: "All programs fetched succesfully!",
    data: programs,
  });
});

exports.getSingleProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);

  if (!program) {
    throw new Error("The program is not found");
  } else {
    res.status(200).json({
      status: "success",
      data: program,
      message: "The program is fetched succesfully!",
    });
  }
});

exports.updateProgram = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  //if name is taken
  const nameExist = await Program.findOne({ name });
  if (nameExist) {
    throw new Error("The program is already exists!");
  }

  const program = await Program.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: program,
    message: "Program is updated succesfully!",
  });
});

exports.deleteProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    deletedData: program,
    message: "The program deleted succesfully!",
  });
});
