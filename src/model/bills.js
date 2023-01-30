const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BillsSchema = mongoose.Schema({
  barCode: {
    type: String,
    require: true,
  },
  transactionID: {
    type: String,
    require: true,
  },
  hospitalName: {
    type: String,
    require: true,
  },
  hospitalAddress: {
    type: String,
    require: true,
  },
  doctorName: {
    type: String,
    require: true,
  },
  doctorDepartment: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  patientName: {
    type: String,
    require: true,
  },
  patientDOB: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
})

BillsSchema.plugin(AutoIncrement, {inc_field: 'billID'});
const Bill = mongoose.model("Bills", BillsSchema)
module.exports = Bill;