const mongoose = require("mongoose");

const { Schema } = mongoose;

const academicTermSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
      default: "3 months",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

const AcademicTerm = mongoose.model("academicTermSchema");
module.exports = AcademicTerm;
