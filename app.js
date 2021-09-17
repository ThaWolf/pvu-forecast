const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const { plantTypesRouter } = require('./routes/plantTypesRouter');
const { weathersRouter } = require('./routes/weathersRouter');
const { seasonsRouter } = require('./routes/seasonsRouter');
const { predictionRouter } = require('./routes/predictionRouter');
const cron = require("node-cron");
const { changeSeason } = require('./controllers/season.controller');
const { changeForecastSeason } = require('./controllers/season.controller');
require('dotenv/config');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(db => console.log('db is connected'))
    .catch(err => console.log(err));
//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World'));


//Routes
app.use('/api/v1/plant-type', plantTypesRouter);
app.use('/api/v1/weather', weathersRouter);
app.use('/api/v1/season', seasonsRouter);
app.use('/api/v1/prediction', predictionRouter);


//Server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});

//tasks
changeSeason();
changeForecastSeason();



