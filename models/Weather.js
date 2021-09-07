const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EffectSchema = new Schema({
    plantType: { type: mongoose.Schema.Types.ObjectId, ref: 'plantType' },
    effectType: {
        type: String,
        enum: ['BUFF', 'DEBUFF'],
        default: 'BUFF'
    },
    modifier: { type: Number }
});

const WeatherSchema = new Schema({
    name: { type: String },
    effects: { type: [EffectSchema] },
    isLocked: { type: Boolean }
},
    {
        timestamps: true
    });

const Weather = mongoose.model('weather', WeatherSchema);

module.exports = Weather;
