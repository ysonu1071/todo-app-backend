
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserModel = require("../models/userModel");


const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        let user = await UserModel.find({ email });

        if (user.length != 0) {
            return res.status(200).json({ status: "fail", message: "User allready exist!" })
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        user = await UserModel.create({ name, email, password: hashedPassword });
        return res.status(200).json({ status: "success", message: "User registered successfully" });

    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }

}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await UserModel.find({ email });
        if (user.length == 0) {
            return res.status(200).json({ status: 'fail', message: 'User not found!' });
        }

        let isPasswordCorrect = await bcrypt.compare(password, user[0].password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ status: "fail", message: "Incorrect password" });
        }

        let token = JWT.sign({ name: user[0].name, email: user[0].email, id: user[0]._id }, process.env["SECRATE_KEY"]);

        // res.cookie("token", token, {httpOnly: true, maxAge: 86400000});

        return res.status(200).json({ status: "success", message: "Login successfull", data: { name: user[0].name }, token: token });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "fail", message: error.message });
    }
}


const sendOtpForForgetPassword = async (req, res) => {
    const { email, otp } = req.body;
    try {
        let user = await UserModel.find({ email });
        if (user.length == 0) {
            return res.status(200).json({ status: 'fail', message: 'User not found!' });
        }
        // Create a transporter 
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });


        // send mail with defined transport object 
        let info = await transporter.sendMail({
            from: process.env.USER,// sender address 
            to: email,// list of receivers 
            subject: "Todo app otp for generating new password",// subject line 
            text: `This is the otp  ${otp}`,// plain text body 
        });

        return res.status(200).json({ status: "success", message: "Otp send successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "fail", message: error.message });
    }
}


const saveNewPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        let updatedData = await UserModel.findOneAndUpdate({ email }, { password: hashedPassword })

        return res.status(201).json({ status: "success", message: "Password updated successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "fail", message: error.message });
    }

}


module.exports = { registerUser, loginUser, sendOtpForForgetPassword, saveNewPassword };