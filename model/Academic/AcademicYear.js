const mongoose=require("mongoose");

const {Schema}=mongoose;

const academicYearSchema = new Schema(
    {
        name:{
            type:String,
            required:true

        },
        fromYear:{
            type:String,
            required:true
        },
        toYear:{
            type:Schema.Types.ObjectId,
            ref:"Teacher"
        },
        isCurrent:{
            type:Boolean,
            default:false,
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"Admin",
            required:true,
        },
        students:[{
            type:Schema.Types.ObjectId,
            ref:"Student",
            },
        ],
        teachers:[{
            type:Schema.Types.ObjectId,
            ref:"Teacher",
        }],
    },
    {timestamps:true}
);

const AcademicYear = mongoose.model("AcademicYear",academicYearSchema);
module.exports = AcademicYear;
