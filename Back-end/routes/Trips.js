const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');








router.get("/search/", async function (req, res) {
    const { departure, arrival, date } = req.query;

    if (!departure || !arrival || !date) {
        return res.json({ result: false, error: "Tous les champs sont obligatoires !" });
    }

    try {
        const startDate = new Date(date).toISOString();
        const endDate = new Date(date).toISOString();
        endDate.setHours(23, 59, 59, 999); 

        const trips = await Trip.find({
            departure: { $regex: new RegExp(departure, "i") },
            arrival: { $regex: new RegExp(arrival, "i") },
            date: { $gte: startDate, $lte: endDate },
        });

        res.json({ trips });
    } catch (error) {
        console.error("❌ Erreur lors de la recherche du trajet :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});




router.get('/', async (req, res) => {
    const { departure, arrival, date } = req.query;
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.get('/rech', async (req, res) => {
    const { departure, arrival, date } = req.query;

    if (!departure || !arrival || !date) {
        return res.status(400).json({ error: 'Les paramètres departure, arrival et date sont requis.' });
    }

    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(queryDate);
    nextDay.setDate(queryDate.getDate() + 1);

    try {
        const trips = await Trip.find({
            departure,
            arrival,
            date: { $gte: queryDate, $lt: nextDay }
        });
        res.json(trips);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


module.exports = router;
