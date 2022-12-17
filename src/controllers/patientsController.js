const Patient = require('../model/patient');
const User = require('../model/user');
require('dotenv').config();

const getAllPatient = async (req, res) => {
  const foundUser = await User.findOne({username: req.query.username})
  Patient.find({ userID: foundUser.userID }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
}

const createNewPatient = async (req, res) => {
  try {
    const foundUser = await User.findOne({username: req.body.username})

    const newPatient = new Patient({
      userID: foundUser.userID,
      name: req.body.name,
      dob: req.body.dob,
      phone: req.body.phone,
      gender: req.body.gender,
      job: req.body.job,
      cmnd: req.body.cmnd,
      email: req.body.email,
      ethnic: req.body.ethnic,
      address: req.body.address,
    });

    newPatient.save()
    res.status(201).json({ 'success': `New patient ${req.body} created!` });
  }
  catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}
module.exports = { getAllPatient, createNewPatient }