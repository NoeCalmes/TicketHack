const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
