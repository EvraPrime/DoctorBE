const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const handleSignIn = async (req, res) => {
    const userSignIn = req.body;
    const foundUser = await User.findOne({username: userSignIn.username})
    if (!foundUser) {
        return res.status(400).json({
            message: "Invaild Username or Passwordaaa"
        })
    }
    const match = await bcrypt.compare(userSignIn.password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '24h' }
        );
        foundUser.refreshToken = refreshToken;
        foundUser.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: false, maxAge: 24 * 60 * 60 * 1000 });
        return res.json({
            username: foundUser.username,
            token: accessToken
        })
    } else {
        return res.json({
            message: "Invaild Username or Password"
        })
    }
}

module.exports = { handleSignIn };