const mongoose = require("mongoose");


// mongoose.connect("mongodb://0.0.0.0:27017/todos")
mongoose.connect(process.env["DB_URI"])
.then(()=> console.log("DB connected"))
.catch((error)=>{
    console.log(error.message)
})