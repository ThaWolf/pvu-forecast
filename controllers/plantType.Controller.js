const mongoose = require('mongoose');
const PlantType = require('../models/plantType');


const getPlantTypes = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const createPlantType = async (req, res, next) => {
    console.log(req.body)
    try {
        let plantType = new PlantType(req.body)
        plantType.save();
        return res.status(200).json(plantType);
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}

const getPlantType = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const updatePlantType = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const deletePlantType = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

module.exports = {
    getPlantTypes,
    createPlantType,
    getPlantType,
    updatePlantType,
    deletePlantType
}