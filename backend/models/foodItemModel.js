import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price_per_qty: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FoodItem = mongoose.model("Food_Item", foodItemSchema);
export default FoodItem;
