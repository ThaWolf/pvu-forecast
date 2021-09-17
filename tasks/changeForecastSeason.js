const cron = require("node-cron");
const { changeForecastSeason } = require('../controllers/season.controller');

cron.schedule("0 0 * * SAT", () => {
    changeForecastSeason();
})