const mongoose = require('mongoose');
const moment = require('moment');
const Weather = require('../models/weather');
const WeatherHistory = require('../models/WeatherHistory');
const PlantType = require('../models/plantType')


const getWeathers = async (req, res) => {
    try {
        const weathers = await Weather.find({}).populate({
            path: 'effects',
            populate: {
                path: 'plantType',
                model: 'PlantType'
            }
        });
        return res.status(200).json(weathers);
    }
    catch (ex) {
        return res.status(400).send({ error: ex.message });
    }
}

const createWeather = async (req, res, next) => {
    console.log(req.body)
    try {
        let weather = new Weather(req.body)
        weather.save();
        return res.status(200).json(weather);
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}

const getToday = async (req, res) => {
    try {
        let start = moment().startOf('day');
        let end = moment().endOf('day');
        let todayWeather = await WeatherHistory.find({ createdAt: { $gte: start, $lt: end } })
        return res.status(200).json({ "todayWeather": todayWeather });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}

const addDailyWeather = async (req, res, next) => {
    console.log(req.body)
    try {
        let dailyWeather = new WeatherHistory(req.body)
        dailyWeather.save();
        return res.status(200).json(dailyWeather);
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}



const getWeather = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const updateWeather = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

const deleteWeather = async (req, res) => {
    res.status(200).send({ message: 'Success', body: req.body })
}

module.exports = {
    getWeathers,
    createWeather,
    getWeather,
    updateWeather,
    addDailyWeather,
    deleteWeather,
    getToday
}