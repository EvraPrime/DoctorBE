const Hospital = require('../model/hospital');
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

module.exports = { getAllHospital }