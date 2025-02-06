const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number
});

module.exports = mongoose.model('Trip', TripSchema);
