const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
    try {
        const newBooking = new Booking({ trips: req.body.trips });
        await newBooking.save();
        res.status(201).json({ message: 'Réservation effectuée' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('trips');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
