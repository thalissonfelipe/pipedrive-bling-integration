const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('History', HistorySchema);
