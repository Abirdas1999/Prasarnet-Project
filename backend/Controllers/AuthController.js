// const crypto = require("crypto");
const UserModel = require("../Models/User");
// const generateTokenAndSetCookie = require("../utils/generateTokenAndSetcookie");
// const { SendverificationToken } = require("../Middlewares/nodemail.config.js");
// const { date } = require("joi");

const signup = async (req, res) => {
	const { name, phone, email, address } = req.body;

	try {
		// const userAlreadyExists = await UserModel.findOne({ email });
		const userAlreadyExists = await UserModel.findOne({
			$or: [{ email }, { phone }],
		});

		if (userAlreadyExists) {
			return res.status(409).json({
				message: "User is already exist",
				success: false,
			});
		}

		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		const userModel = new UserModel({
			name,
			email,
			phone,
			address,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24hour
		});

		await userModel.save();

		// // jwt for authentication
		// generateTokenAndSetCookie(res, userModel._id);

		res.status(201).json({
			message: "Signup successfully...",
			success: true,
			userModel: {
				...userModel._doc,
			},
		});
	} catch (err) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
		});
	}
};

const verification = async (req, res) => {
	try {
		const { code } = req.body;
		const user = await UserModel.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "Inavlid or Expired Code" });
		}
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();
		return res.status(200).json({
			success: true,
			message: "User Verifed Successfully",
			user: { ...user._doc },
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ success: false, message: "internal server error" });
	}
};

// const checkAuth = async (req, res) => {
// 	try {
// 		const user = await UserModel.findById(req.userId).select("-password");
// 		if (!user) {
// 			return res
// 				.status(400)
// 				.json({ success: false, message: "User not found" });
// 		}

// 		res.status(200).json({ success: true, user });
// 	} catch (error) {
// 		console.log("Error in checkAuth ", error);
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

module.exports = {
	signup,
	verification,
	// checkAuth,
};
