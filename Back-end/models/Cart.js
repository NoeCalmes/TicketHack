const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],
    createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
