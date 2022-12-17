const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const getProfile = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) 
    return res.status(401).json({ 'message': "No JWT" });
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken: refreshToken});
  if (!foundUser) 
    return res.sendStatus(403); //Forbidden 
  
  // evaluate jwt 
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { "username": decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '50m' }
        );
        res.json({ 
          "userID": foundUser.userID,
          "username": foundUser.username,
          "email": foundUser.email,
          accessToken })
    }
  );
}

module.exports = { getProfile };