import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    messId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    expenseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ExpenseItem",
    },
    storekeeperId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Storekeeper",
    },
    orderItems: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "FoodItem",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;
