const mongoose = require('mongoose');
const moment = require('moment');
const Weather = require('../models/Weather');
const WeatherHistory = require('../models/WeatherHistory');
const PlantType = require('../models/PlantType');
const Season = require('../models/Season');

const possibleWeathers = async (req, res) => {
    try {
        let start = moment().subtract(1, "days").startOf('day');
        let end = moment().endOf('day');
        const lockedWeathers = await WeatherHistory.find({ createdAt: { $gte: start, $lt: end } })
        const banned = [];
        lockedWeathers.forEach((weather) => {
            banned.push(weather.weather)
        })
        const findPossibleWeathers = await Season.find({ isCurrent: true }, { '_id': 0, 'weathers': 1 }).populate({
            path: 'weathers',
            match: { _id: { $nin: banned } },
            select: { '_id': 1 },
        });
        const possibleWeathers = []

        findPossibleWeathers[0].weathers.forEach((weather) => {
            possibleWeathers.push(weather._id)
        })

        const getBuffs = async (possibleWeathers, type) => {
            let buffweathers = await Weather.find({ $and: [{ '_id': { $in: possibleWeathers }, 'effects': { $elemMatch: { 'plantType': type._id, 'effectType': 'BUFF' } } }] }, { '_id': 0, 'name': 1 })
            buffCount = buffweathers.length;
            buffPercentage = (buffCount / possibleWeathers.length) * 100;
            return ({ 'type': type.typeName, 'buffs': buffweathers, 'count': buffCount, 'percentage': `${buffPercentage}%` })
        }

        const getDebuffs = async (possibleWeathers, type) => {
            let debuffweathers = await Weather.find({ $and: [{ '_id': { $in: possibleWeathers }, 'effects': { $elemMatch: { 'plantType': type._id, 'effectType': 'DEBUFF' } } }] }, { '_id': 0, 'name': 1 })
            debuffCount = debuffweathers.length;
            debuffPercentage = (debuffCount / possibleWeathers.length) * 100;
            return ({ 'type': type.typeName, 'debuffs': debuffweathers, 'count': debuffCount, 'percentage': `${debuffPercentage}%` })
        }

        const plantTypes = await PlantType.find({})
        const buffs = []
        const debuffs = []
        await plantTypes.reduce(async (acc, type) => {
            const b = await getBuffs(possibleWeathers, type);
            const d = await getDebuffs(possibleWeathers, type)
            buffs.push(b);
            debuffs.push(d);
        });


        return res.status(200).json({ 'buffs': buffs, 'debuffs': debuffs });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}

const getPrediction = async (req, res) => {

    let start = moment().subtract(1, "days").startOf('day');
    let end = moment().endOf('day');
    const lockedWeathers = await WeatherHistory.find({ createdAt: { $gte: start, $lt: end } })
    const banned = [];
    lockedWeathers.forEach((weather) => {
        banned.push(weather.weather)
    })
    const findPossibleWeathers = await Season.find({ isCurrent: true }, { '_id': 0, 'weathers': 1 }).populate({
        path: 'weathers',
        match: { _id: { $nin: banned } },
        select: { '_id': 1 },
    });

    const possibleWeathers = []

    findPossibleWeathers[0].weathers.forEach((weather) => {
        possibleWeathers.push(weather._id)
    })

    const getBuffs = async (possibleWeathers, type) => {
        console.log(type._id)
        let buffweathers = await Weather.find({ $and: [{ '_id': { $in: possibleWeathers }, 'effects': { $elemMatch: { 'plantType': type._id, 'effectType': 'BUFF' } } }] }, { '_id': 0, 'name': 1 })
        buffCount = buffweathers.length;
        buffPercentage = (buffCount / possibleWeathers.length) * 100;
        return ({ 'type': type.typeName, 'buffs': buffweathers, 'count': buffCount, 'percentage': `${buffPercentage}%` })
    }

    const getDebuffs = async (possibleWeathers, type) => {
        let debuffweathers = await Weather.find({ $and: [{ '_id': { $in: possibleWeathers }, 'effects': { $elemMatch: { 'plantType': type._id, 'effectType': 'DEBUFF' } } }] }, { '_id': 0, 'name': 1 })
        debuffCount = debuffweathers.length;
        debuffPercentage = (debuffCount / possibleWeathers.length) * 100;
        return ({ 'type': type.typeName, 'debuffs': debuffweathers, 'count': debuffCount, 'percentage': `${debuffPercentage}%` })
    }

    try {
        const plantType = await PlantType.findOne({ '_id': req.body.typeID })
        const buffs = await getBuffs(possibleWeathers, plantType);
        const debuffs = await getDebuffs(possibleWeathers, plantType)
        return res.status(200).json({ 'buffs': buffs, 'debuffs': debuffs });
    }
    catch (ex) {
        res.status(400).send({ message: ex.message, body: req.body })
    }
}


module.exports = {
    possibleWeathers,
    getPrediction
}