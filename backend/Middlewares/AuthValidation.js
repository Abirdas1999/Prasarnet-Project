const Joi = require("joi");

//signup validation
const signupValidation = (req, res, next) => {
	const schema = Joi.object({
		name: Joi.string().min(3).max(100).required(),
		email: Joi.string().email().required(),
		phone: Joi.number().min(1000000000).max(9999999999).required(),
        address: Joi.string().max(100).required()
	});
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: "Bad request", error });
	}
	next();
};

module.exports = {
	signupValidation,
};
