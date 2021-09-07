const mongoose = require('mongoose');
const Schema = mongoose.Schema

const SeasonSchema = new Schema({
    name: { type: String },
    weathers: { type: [mongoose.Schema.Types.ObjectId], ref: 'weather' },
    isCurrent: { type: Boolean }
},
    {
        timestamps: true
    }
);

const Season = mongoose.model('season', SeasonSchema);

module.exports = Season;



