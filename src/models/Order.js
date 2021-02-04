const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true,
        unique: true
    },
    personName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    wonDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Order', OrderSchema);
