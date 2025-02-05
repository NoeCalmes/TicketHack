const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    departure: String,
    arrival: String,
    date: String,
    price: Number
});

module.exports = mongoose.model('Trip', TripSchema);
