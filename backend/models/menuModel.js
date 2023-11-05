import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    monday: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem",
        },
      },
    ],
    tuesday: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem",
        },
      },
    ],
    wednesday: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem",
        },
      },
    ],
    thursday: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem",
        },
      },
    ],
    friday: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem",
        },
      },
    ],
    saturday: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem",
        },
      },
    ],
    sunday: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "MenuItem",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
