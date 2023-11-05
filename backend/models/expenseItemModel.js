import mongoose from "mongoose";

const expenseItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    expenseType: {
      type: String,
      enum: ["worker_salary", "order_item", "other"],
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ExpenseItem = mongoose.model("ExpenseItem", expenseItemSchema);
export default ExpenseItem;
