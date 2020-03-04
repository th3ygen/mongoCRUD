const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../../services/auth.service');

const Users = mongoose.model('Users');

router.post('/', auth.optional, (req, res, next) => {
    const user = req.body;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required'
            }
        })
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        })
    }

    if (!user.admin) {
        user.admin = false;
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);
    /* 
    console.log(finalUser);
    
    res.status(200).json(finalUser); */
    return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/login', auth.optional, (req, res, next) => {
    const user = req.body;

    if (!user.username) {
        return res.status(422).json({
            errors: {
                username: 'is required'
            }
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        });
    }
    
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }
        
        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
        
            return res.json({ user: user.toAuthJSON() });
        }
        console.log(info);
        
        return res.status(401).json(info);
    })(req, res, next);
});

router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
    .then(user => {
        if (!user) {
            return res.sendStatus(400);
        }

        return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;