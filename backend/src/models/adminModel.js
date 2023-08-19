const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});


const trackingSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  ETA: {
    type: Number,
    required: true
  }
});
const Admin = mongoose.model('Admin', adminSchema);

const Tracking = mongoose.model('Tracking', trackingSchema);

module.exports = { Admin, Tracking };
