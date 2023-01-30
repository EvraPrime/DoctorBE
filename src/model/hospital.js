const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const HospitalsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: false,
  }
})

HospitalsSchema.plugin(AutoIncrement, {inc_field: 'hospitalID'});
const Hospital = mongoose.model("Hospitals", HospitalsSchema)
module.exports = Hospital;