const mongoose = require('mongoose');
const Schema = mongoose.Schema

const WeatherHistorySchema = new Schema({
    weather: { type: mongoose.Schema.Types.ObjectId, ref: 'weather' },
},
    {
        timestamps: true
    });

const WeatherHistory = mongoose.model('weatherHistory', WeatherHistorySchema);

module.exports = WeatherHistory;