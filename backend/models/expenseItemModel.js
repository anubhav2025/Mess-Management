import mongoose from "mongoose";

const expenseItemSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		mess_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mess",
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
