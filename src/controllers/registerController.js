const bcrypt = require('bcrypt');
const User = require('../model/user');

const handleNewUser = async (req, res) => {
  const user = req.body;
  if (!user.username || !user.password || !user.email) return res.status(400).json({ 'message': 'Username, email and password are required.' });
  // check for duplicate usernames in the db
  const takenName = await User.findOne({username: user.username});
  const takenEmail = await User.findOne({email: user.email});
  if (takenName || takenEmail) return res.status(409).json({ 'message': 'Username or email has been taken.'}); //Conflict 
  try {
      //encrypt the password
      user.password = await bcrypt.hash(req.body.password, 10);
      //store the new user
      const newUser = new User({ 
        username: user.username, 
        email: user.email, 
        password: user.password,
      });
      newUser.save()
      res.status(201).json({ 'success': `New user ${user} created!` });
  } catch (err) {
      res.status(500).json({ 'message': err.message });
  }
}

module.exports = { handleNewUser };