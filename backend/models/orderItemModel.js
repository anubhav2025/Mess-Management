import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    mess_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Mess",
    },
    expense_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Expense_Item",
    },
    storekeeper_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Storekeeper",
    },
    order_items: [
      {
        food_item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Food_Item",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model("Order_Item", orderItemSchema);
export default OrderItem;
