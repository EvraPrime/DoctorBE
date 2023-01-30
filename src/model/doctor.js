const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DoctorsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
  weekday: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  hospitalID: {
    type: Number,
    require: true,
  },
})

DoctorsSchema.plugin(AutoIncrement, {id: 'doctor_seq', inc_field: 'doctorID', reference_fields: ['hospitalID']});
const Doctor = mongoose.model("Doctors", DoctorsSchema)
module.exports = Doctor;