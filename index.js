const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./db/index");
const userRoute = require("./routes/userRoute");
const todoRoute = require('./routes/todoRoute');


const app = express();
app.use(cors({origin:true, credentials: true}));
app.use(express.json());
app.use(cookieParser());


app.use("/user", userRoute);
app.use("/todo", todoRoute);




app.listen(8000, ()=> console.log("Server is running at port 8000"));