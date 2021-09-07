const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EffectSchema = new Schema({
    plantType: { type: mongoose.Schema.Types.ObjectId, ref: 'plantType' },
    effectType: {
        type: String,
        enum: ['BUFF', 'DEBUFF']
    },
    modifier: { type: Number }
},
    {
        timestamps: true
    });

const Effect = mongoose.model('effect', EffectSchema);

module.exports = Effect;