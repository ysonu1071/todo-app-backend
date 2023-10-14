const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

let SECRATE_KEY = "sonu1234";

const registerUser = async(req, res) => {

    const {name, email, password} = req.body;

    try {
        let user = await User.find({email});

        if(user.length != 0){
            return res.status(200).json({status: "fail", message:"User allready exist!"})
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({name, email, password: hashedPassword});
        return res.status(200).json({status:"success", message:"User registered successfully"});
        
    } catch (error) {
        return res.status(500).json({status:"fail", message: error.message});
    }

}

const loginUser = async(req, res) => {

    const {email, password} = req.body;

    try {
        let user = await User.find({email});
        if(user.length == 0){
            return res.status(200).json({status: 'fail', message: 'User not found!'});
        }
        
        let isPasswordCorrect = await bcrypt.compare(password, user[0].password);
        if(!isPasswordCorrect){
            return res.status(200).json({status:"fail", message:"Incorrect password"});
        }

        let token = JWT.sign({name: user[0].name, email: user[0].email, id: user[0]._id}, SECRATE_KEY);

        // res.cookie("token", token, {httpOnly: true, maxAge: 86400000});

        return res.status(200).json({status:"success", message:"Login successfull", data:{name: user[0].name}, token: token});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status: "fail", message: error.message});
    }
}


module.exports = {registerUser, loginUser};