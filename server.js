const path = require('path');
const mongoose = require('./common/services/mongoose.service');

const config = require('./common/configs/env.config.js');

const express = require('express');
const bodyParser = require('body-parser');

const chalk = require('chalk');

const app = express();

const newsRouter = require('./db/news/routes.config');

global.__root = __dirname;

app.use(bodyParser.json());

newsRouter.routesConfig(app);

app.listen(config.port, () => {
    console.log(chalk.green('[API]'), "listening to port", config.port);
    
})