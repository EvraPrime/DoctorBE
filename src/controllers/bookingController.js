const Hospital = require('../model/hospital');
const Patient = require('../model/patient');
const Doctor = require('../model/doctor');

require('dotenv').config();

const getAllHospital = async (req, res) => {
  Hospital.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
}

const getHospitalById = async (req, res) => {
  Hospital.find({ hospitalID: req.body.hospitalID }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
}

const getAllDoctor = async (req, res) => {
  Doctor.find({ hospitalID: req.query.hospitalID }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
}

const getDoctorById = async (req, res) => {
  Doctor.find({ hospitalID: req.body.hospitalID, doctorID: req.body.doctorID }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
}

module.exports = { getAllHospital, getAllDoctor, getDoctorById, getHospitalById }