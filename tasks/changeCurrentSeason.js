const cron = require("node-cron");
const { changeSeason } = require('../controllers/season.controller');

cron.schedule("0 0 * * SUN", () => {
    changeSeason();
})