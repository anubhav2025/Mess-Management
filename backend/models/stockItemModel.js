import mongoose from "mongoose";

const stockItemSchema = new mongoose.Schema(
  {
    storekeeper_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Storekeeper",
    },
    mess_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    food_items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Food_Item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const StockItem = mongoose.model("Stock_Item", stockItemSchema);
export default StockItem;
