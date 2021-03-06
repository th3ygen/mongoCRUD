const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

passport.use(new LocalStrategy( (username, password, done) => {
    Users.findOne({ username }).then(user => {
        
        if (!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { 'username or password:': 'is invalid' } })
        }

        return done(null, user);
    }).catch(done);
}));