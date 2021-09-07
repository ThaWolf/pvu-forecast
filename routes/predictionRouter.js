const { Router } = require('express');
const predictionRouter = Router();

const {
    possibleWeathers,
    getPrediction
} = require('../controllers/prediction.contoller')

predictionRouter.get('/', possibleWeathers);


module.exports = {
    predictionRouter,
}