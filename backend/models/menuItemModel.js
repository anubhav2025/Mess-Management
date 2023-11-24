import { text } from "express";
import mongoose from "mongoose";
import Mess from "./messModel.js";
import User from "./users/userModel.js";
import Menu from "./menuModel.js";

const reviewSchema = mongoose.Schema(
	{
		rating: { type: Number, required: true, min: 1, max: 5 },
		comment: { type: String, required: true },
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const menuItemSchema = new mongoose.Schema(
	{
		menuId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Menu",
		},
		messId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mess",
		},

		itemName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		day: {
			type: String,
			enum: [
				"sunday",
				"monday",
				"tuesday",
				"wednesday",
				"thursday",
				"friday",
				"saturday",
			],
		},
		time: {
			type: String,
			enum: ["1", "2", "3", "4"],
		},
		reviews: [reviewSchema],
		rating: {
			type: Number,
			// required: true,
			default: 0,
		},
		numReviews: {
			type: Number,
			// required: true,
			default: 0,
		},
		// added calories
		calories: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Calculate average rating and number of reviews when a new review is added
menuItemSchema.pre("save", function (next) {
	if (this.isModified("reviews") || this.isNew) {
		this.numReviews = this.reviews.length;
		this.rating =
			this.reviews.reduce((acc, review) => acc + review.rating, 0) /
			this.numReviews;
	}
	next();
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
