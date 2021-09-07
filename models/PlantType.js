const mongoose = require('mongoose');
const Schema = mongoose.Schema

const plantTypeSchema = new Schema({
    typeName: { type: String, required: true }
});

const PlantType = mongoose.model('plantType', plantTypeSchema);

module.exports = PlantType;