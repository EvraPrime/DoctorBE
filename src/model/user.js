const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
  }
}, {timestamps: true})

const User = mongoose.model("Users", UsersSchema)

module.exports = User;