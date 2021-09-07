const mongoose = require('mongoose');
const Season = require('../models/season');


const getSeasons = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const changeSeason = async (req, res) => {
    try {
        let lastSeason = await Season.findOneAndUpdate({ isCurrent: true }, { isCurrent: false });
        let currentSeason = {};
        switch (lastSeason.name) {
            case "Spring":
                currentSeason = await Season.findOneAndUpdate({ 'name': "Summer" }, { isCurrent: true });
                break;
            case "Summer":
                currentSeason = await Season.findOneAndUpdate({ 'name': "Autumn" }, { isCurrent: true });
                break;
            case "Autumn":
                currentSeason = await Season.findOneAndUpdate({ 'name': "Winter" }, { isCurrent: true });
                break;
            case "Winter":
                currentSeason = await Season.findOneAndUpdate({ 'name': "Spring" }, { isCurrent: true });
                break;
            default:
                break;
        }
        return res.status(200).json({ "last": lastSeason, "current": currentSeason });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}

const createSeason = async (req, res, next) => {
    console.log(req.body)
    try {
        let season = new Season(req.body)
        season.save();
        return res.status(200).json(season);
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}

const getSeason = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const updateSeason = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const deleteSeason = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

module.exports = {
    getSeasons,
    createSeason,
    getSeason,
    updateSeason,
    deleteSeason,
    changeSeason
}