const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academic/Subject");

//@route POST /api/v1/subjects/:programID
//we will push the subject into the program
exports.createSubject = AsyncHandler(async (req, res) => {
  const { name, description, academicTerm, duration } = req.body;
  //find the program
  const programFound = await Program.findById(req.params.programID);
  if (!programFound) {
    throw new Error("The program not found");
  }

  //check if name exists
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("The subject is already exists");
  }

  //create
  const newSubject = await Subject.create({
    name,
    description,
    duration,
    academicTerm,
    programFound,
    createdBy: req.userAuth._id,
  });
  //push the program.
  programFound.subjects.push(newSubject._id);
  await programFound.save();

  res.status(201).json({
    status: "success",
    message: "New subject created succesfully! ",
    data: newSubject,
  });
});

//@route GET /api/v1/subjects/

exports.getAllSubjects = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({
    length: subjects.length,
    status: "success",
    message: "All subjects fetched succesfully!",
    data: subjects,
  });
});

//@route GET /api/v1/subjects/:id

exports.getSingleSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    throw new Error("The subject is not found");
  } else {
    res.status(200).json({
      status: "success",
      data: subject,
      message: "The subject is fetched succesfully!",
    });
  }
});

exports.updateSubject = AsyncHandler(async (req, res) => {
  const { name, description, duration, academicTerm } = req.body;
  //if name is taken
  const nameExist = await Subject.findOne({ name });
  if (nameExist) {
    throw new Error("The subject is already exists!");
  }

  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      academicTerm,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: subject,
    message: "Subject is updated succesfully!",
  });
});

exports.deleteSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    deletedData: subject,
    message: "The subject deleted succesfully!",
  });
});
