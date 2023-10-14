const JWT = require("jsonwebtoken");


const authenticateUser = async (req, res, next) => {
    // let token = req.cookies?.token;
    let bearerToken = req.header("Authorization");
    let token = bearerToken.trim().split(" ")[1];

    try {
        if (!token) {
            return res.status(200).json({ status: "fail", message: "Token is not found!" })
        }

        let verifiedToken = JWT.verify(token, process.env['SECRATE_KEY']);
        if (!verifiedToken) {
            return res.status(200).json({ status: "fail", message: "Wrong token found!" });
        }

        req.verifiedToken = verifiedToken;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status: 'fail', message:error.message});
    }
}

module.exports = authenticateUser;