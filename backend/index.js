const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");


require("./Models/db");
//All routes
const AuthRouter = require("./Routes/AuthRouter");

//initialize express
const app = express();

//define port env variable
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});

//for test the port
app.get("/", (req, res) => {
	res.send("Lets Go!");
});

app.use(cors({credentials:true}));



app.use(express.json());//allows us to parse incoming requests:req.body
app.use(cookieParser());//allows us to parse incoming cookies

//routes
app.use("/auth", AuthRouter);