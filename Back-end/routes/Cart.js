const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Trip = require('../models/Trip');

router.post('/cart/trips', async (req, res) => {
    const { tripIds } = req.body;
    try {
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ trips: [] });
        }
        cart.trips.push(...tripIds);
        await cart.save();
        res.status(201).json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

router.get('/cart', async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('trips');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


router.delete('/cart/remove/:tripId', async (req, res) => {
    const { tripId } = req.params;
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.status(404).json({ error: 'Panier non trouvé' });
        }

        cart.trips = cart.trips.filter(trip => trip.toString() !== tripId);
        await cart.save();

        res.json({ message: 'Voyage supprimé du panier' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});


router.delete('/clear', async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (cart) {
            cart.trips = [];
            await cart.save();
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;
