const AsyncHandler = require("express-async-handler");
const ClassLevel = require("../../model/Academic/ClassLevel");
const Admin = require("../../model/Staff/Admin");

const createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //check if name exists
  const classFound = await ClassLevel.findOne({ name });
  if (classFound) {
    throw new Error("The class is already exists");
  }

  //create
  const newClassLevel = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth._id,
  });

  //push class into admin
  const currentAdmin = await Admin.findById(req.userAuth._id);
  currentAdmin.classLevels.push(newClassLevel._id);
  await currentAdmin.save();

  res.status(201).json({
    status: "success",
    message: "Class level created succesfully! ",
    data: newClassLevel,
  });
});

const getAllClassLevels = AsyncHandler(async (req, res) => {
  const classes = await ClassLevel.find();
  res.status(200).json({
    length: classes.length,
    status: "success",
    message: "All academic terms fetched succesfully!",
    data: classes,
  });
});

const getSingleClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);

  if (!classLevel) {
    throw new Error("The class is not found");
  } else {
    res.status(200).json({
      status: "success",
      data: classLevel,
      message: "The class is fetched succesfully!",
    });
  }
});

const updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  //if name is taken
  const nameExist = await ClassLevel.findOne({ name });
  if (nameExist) {
    throw new Error("The class is already exists!");
  }

  const classLevel = await ClassLevel.findByIdAndUpdate(
    req.params.id,
    {
      name,
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
    data: classLevel,
    message: "The class is updated succesfully!",
  });
});

const deleteClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    deletedData: classLevel,
    message: "The class deleted succesfully!",
  });
});

module.exports = {
  createClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
};
