const { Router } = require('express');
const seasonsRouter = Router();

const {
    getSeasons,
    createSeason,
    getSeason,
    updateSeason,
    deleteSeason,
    changeSeasonAPI,
    changeForecastSeasonAPI
} = require('../controllers/season.controller')

seasonsRouter.get('/', getSeasons);
seasonsRouter.get('/:seasonId', getSeason);
seasonsRouter.put('/edit/:seasonId', updateSeason);
seasonsRouter.post('/add', createSeason);
seasonsRouter.delete('/:seasonId', deleteSeason);
seasonsRouter.post('/change', changeSeasonAPI);
seasonsRouter.post('/changeForecast', changeForecastSeasonAPI)


module.exports = {
    seasonsRouter
}