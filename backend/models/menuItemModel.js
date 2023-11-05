import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const MenuItemSchema = new mongoose.Schema(
  {
    menu_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Menu",
    },
    day: {
      type: String,
      enum: ["sunday", "monday", "tuesday", "wednesday", "friday", "saturday"],
    },
    time: {
      type: String,
      enum: ["1", "2", "3", "4"],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    // added calories
    calories: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MenuItem = mongoose.model("Menu_Item", MenuSchema);
export default MenuItem;
