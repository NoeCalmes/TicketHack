const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

router.get('/', async (req, res) => {
    const { departure, arrival, date } = req.query;
    try {
        const trips = await Trip.find({ departure, arrival, date });
        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
