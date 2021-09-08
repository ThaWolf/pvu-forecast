const { Router } = require('express');
const predictionRouter = Router();

const {
    possibleWeathers,
    getPrediction
} = require('../controllers/prediction.controller')

predictionRouter.get('/', possibleWeathers);
predictionRouter.post('/', getPrediction);

module.exports = {
    predictionRouter,
}