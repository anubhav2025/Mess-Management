import mongoose from "mongoose";

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
			required: true,
		},
		time: {
			type: String,
			enum: ["1", "2", "3", "4"],
			required: true,
		},
		reviews: [reviewSchema],
		calories: {
			type: Number,
			required: true,
		},
		numReviews: {
			type: Number,
			default: 0,
		},
		rating: {
			type: Number,
			default: 0,
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
