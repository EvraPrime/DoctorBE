const Bill = require('../model/bills');
const User = require('../model/user');

function makeCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const createNewBill = async (req, res) => {
  const bill = req.body;
  console.log(bill);
  const code = makeCode(11);
  const takenCode = await Bill.findOne({barCode: code});
  while (takenCode) {
    code = makeCode(11);
  }

  try {
    const newBill = new Bill({
      barCode: code,
      transactionID: bill.transactionID,
      hospitalName: bill.hospitalName,
      hospitalAddress: bill.hospitalAddress,
      doctorName: bill.doctorName,
      doctorDepartment: bill.doctorDepartment,
      date: bill.date,
      time: bill.time,
      price: bill.price,
      patientName: bill.patientName,
      patientDOB: bill.patientDOB,
      userName: bill.user,
    })
    newBill.save();
    res.status(201).json({ 'success': `${code}` });
  }
  catch (err) {
    res.status(500).json({ 'message': err.message });
  }
}

const getAllBillsByUser = async (req, res) => {
  const foundUser = await User.findOne({username: req.query.username})
  Bill.find({ userName: foundUser.username }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
}

const getAllBills = async (req, res) => {
  Bill.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  })
}

module.exports = { createNewBill, getAllBills, getAllBillsByUser };