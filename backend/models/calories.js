import mongoose from "mongoose";

const calorieSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    currentMonth: {
      type: String,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    currentSem: {
      type: Number,
      required: true,
    },
    today: {
      type: Number,
      required: true,
    },
    lastMonth: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Calorie = mongoose.model("Calorie", calorieSchema);
export default Calorie;
