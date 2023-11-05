import mongoose from "mongoose";

const stockItemSchema = new mongoose.Schema(
  {
    storekeeperId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Storekeeper",
    },
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    foodItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "FoodItem",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const StockItem = mongoose.model("StockItem", stockItemSchema);
export default StockItem;
