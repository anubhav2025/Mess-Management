import mongoose from "mongoose";

const expenseItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    expense_type: {
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

const ExpenseItem = mongoose.model("Expense_Item", expenseItemSchema);
export default ExpenseItem;
