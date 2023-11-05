import mongoose from "mongoose";

const calorieSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    current_month: {
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
    current_sem: {
      type: Number,
      required: true,
    },
    today: {
      type: Number,
      required: true,
    },
    last_month: {
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
