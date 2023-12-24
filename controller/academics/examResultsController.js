const AsyncHandler = require("express-async-handler");

//@desc  exam results checking
//@route POST /api/v1/exam-results/:id/checking
//@access Private - student only

exports.checkExamResults = AsyncHandler(async (req, res) => {
  res.json("checking results!");
});
