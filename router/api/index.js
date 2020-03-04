const express = require('express');
const router = express.Router();

router.use('/users', require('./users.router'));
router.use('/news', require('./news.router'));

module.exports = router;