const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PatientRecordsSchema = mongoose.Schema({
  userID: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  dob: {
    type: Date,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  job: {
    type: String,
    require: true,
  },
  cmnd: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: false,
  },
  ethnic: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: true,
  }
})

PatientRecordsSchema.plugin(AutoIncrement, {id: 'patient_seq', inc_field: 'recordID', reference_fields: ['userID']});
const Patient = mongoose.model("Patients", PatientRecordsSchema)
module.exports = Patient;