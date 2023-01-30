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
    let date = new Date(req.body.dob);
    const newPatient = new Patient({
      userID: foundUser.userID,
      name: req.body.name,
      dob: date,
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

const deletePatient = async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username })
  const patient = await Patient.findOne({ recordID: req.body.id, userID: foundUser.userID });
  if (!patient) {
      return res.status(400).json({ "message": `Patient ID ${req.body.id} not found` });
  }
  await Patient.deleteOne({ recordID: req.body.id});
  res.status(201).json({ 'success': `Patient ID ${req.body.id} is deleted!` });
}

const updatePatient = async (req, res) => {
  const patient = await Patient.findOne({ recordID: req.body.recordID, userID: req.body.userID });
  if (!patient) {
      return res.status(400).json({ "message": `Patient ID ${req.body.id} not found` });
  }

  patient.name = req.body.name
  patient.dob = req.body.dob
  patient.phone = req.body.phone
  patient.gender = req.body.gender
  patient.job = req.body.job
  patient.cmnd = req.body.cmnd
  patient.email = req.body.email
  patient.ethnic = req.body.ethnic
  patient.address = req.body.address
  patient.save();
  console.log(patient);

  res.status(201).json({ 'success': `Patient ID ${req.body.id} is updated!` });
}

module.exports = { getAllPatient, createNewPatient, deletePatient, updatePatient }