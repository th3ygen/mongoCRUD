const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { secret } = require('../configs/jwt.secret');

const Schema = mongoose.Schema;

const schema = new Schema({
    username: String,
    email: String,

    hash: String,
    salt: String,

    admin: false,

    membership: {
        plan: String,
        status: String,
        paid: false
    },

    details: {
        fullname: String,
        dob: String,
        phoneNum: String,
        address: String,

        student: {
            university: String,
            course: String
        },

        regular: {
            cluster: String,
            org: String,
            occu: String,
            web: String,
        },

        corp: {
            cluster: String,

            company: String,
            business: String,
            phoneNum: String,

            represent: {
                name: String,
                job: String,
                phone: String
            }
        },
    },
    
});

const hashPassword = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

schema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = hashPassword(password, this.salt);
};

schema.methods.validatePassword = function(password) {
    const hash = hashPassword(password, this.salt);
    return this.hash === hash;
};

schema.methods.generateJWT = function() {
    const today = new Date();
    const expire = new Date(today);
    expire.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        exp: parseInt(expire.getTime() / 1000, 10),
    }, secret);
};

schema.methods.toAuthJSON = function() {
    
    return {
        _id: this._id,
        username: this.username,

        admin: this.admin,

        details: this.details,
        membership: this.membership,
        
        email: this.email,
        admin: this.admin,
        token: this.generateJWT()
    };
};

mongoose.model('Users', schema);
