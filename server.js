// services
const mongoose = require('./common/services/mongoose.service');

const config = require('./common/configs/env.config.js');

const express = require('express');
const bodyParser = require('body-parser');

const chalk = require('chalk');

const app = express();

const dataRouter = require('./data/routes.config');

app.use(bodyParser.json());

dataRouter.routesConfig(app);

app.listen(config.port, () => {
    console.log(chalk.green('[API]'), "listening to port", config.port);
})