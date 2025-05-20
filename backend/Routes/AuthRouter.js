const router = require("express").Router();

const { signup, verification} = require("../Controllers/AuthController");
const {
	signupValidation,
} = require("../Middlewares/AuthValidation");
// const { verifyToken } = require("../Middlewares/verifyToken");

// **********************GET api**************************//


// router.get("/check-auth", verifyToken, checkAuth);

// **********************post api**************************//


router.post("/signup", signupValidation, signup);

router.post("/verification", verification);


module.exports = router;
