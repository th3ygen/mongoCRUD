const mongoose = require('mongoose');

const config = require('../configs/env.config');

const chalk = require('chalk');

const connectWithRetry = () => {
    console.log(chalk.green('[MongoDB]'), "connecting...");

    mongoose.connect('mongodb://localhost:27017/' + config.mongoose.dbName, config.mongoose.connectOption)
    .then( () => {
        console.log(chalk.green('[MongoDB]'), 'connected!')
    })
    .catch( err => {
        console.log(chalk.red('[MongoDB]'), 'connection unsuccessful, retrying after 5 seconds');
        setTimeout(connectWithRetry, 5000);
    })
}

connectWithRetry();