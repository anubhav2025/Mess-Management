import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    mess_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    monday: [
      {
        menu_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu_Item",
        },
      },
    ],
    tuesday: [
      {
        menu_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu_Item",
        },
      },
    ],
    wednesday: [
      {
        menu_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu_Item",
        },
      },
    ],
    thursday: [
      {
        menu_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu_Item",
        },
      },
    ],
    friday: [
      {
        menu_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu_Item",
        },
      },
    ],
    saturday: [
      {
        menu_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu_Item",
        },
      },
    ],
    sunday: [
      {
        menu_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Menu_Item",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;
