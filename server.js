const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');

const config = require('./configs/env.config');
const { secret } = require('./configs/jwt.secret');

const isProduction = config.NODE_ENV === 'production';

// models
require('./models/user.model');

// services
require('./services/mongoose.service');
require('./services/passport.service');


const app = express();

app.use(cors());
app.use('/storage', express.static('storage'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false}))

if (!isProduction) {
    app.use(errorHandler());
}

app.use(require('./router'));

global.__root = __dirname;

if (!isProduction) {
    app.use((err, req, res) => {
        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err
            }
        });
    });
}

app.use(function(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message:err.message});
      return;
    }
 next();
});

app.listen(config.port, () => {
    console.log(chalk.green('[API]'), "listening to port", config.port);
    
})