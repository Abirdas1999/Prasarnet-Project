// const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
        phone: {
			type: Number,
			required: true,
			unique: true,
		},

        address: {
			type: String,
			required: true,
		},

		isVerified: {
			type: Boolean,
			default: false,
		},

		verificationToken: {
			type: String,
		},
		verificationTokenExpiresAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("profiles", UserSchema);
module.exports = UserModel;
