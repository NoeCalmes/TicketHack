const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
    const { trips } = req.body;
    try {
        const newBooking = new Booking({ trips });
        await newBooking.save();
        res.status(201).json({ message: 'Booking successful' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});



router.get('/booked', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('trips');

        if (bookings.length === 0) {
            return res.status(200).json({ message: 'No bookings found', bookings: [] });
        }
        
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


module.exports = router;
