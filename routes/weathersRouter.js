const { Router } = require('express');
const weathersRouter = Router();

const {
    getWeathers,
    createWeather,
    getWeather,
    updateWeather,
    deleteWeather,
    addDailyWeather,
    getToday
} = require('../controllers/weather.controller')

weathersRouter.get('/', getWeathers);
weathersRouter.get('/:weatherId', getWeather);
weathersRouter.put('/edit/:weatherId', updateWeather);
weathersRouter.post('/add', createWeather);
weathersRouter.post('/addDaily', addDailyWeather);
weathersRouter.delete('/:weatherId', deleteWeather);
weathersRouter.post('/today', getToday);


module.exports = {
    weathersRouter
}