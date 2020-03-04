const mongoose = require('mongoose');
const router = require('express').Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: './storage/images',
    filename: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname)
    }
  });
   
const upload = multer({ storage: storage });

const newsModel = require('../../models/news.model');

router.post('/add', upload.single('img'), (req, res) => {
    const news = JSON.parse(req.body.data);

    newsModel.create(news.authorId, news.author, news.header, news.description, news.tags, req.file.filename, news.content, news.timestamp)
    .then(news => {
        res.status(200).json(news);
    })
    .catch(err => {
        res.send(err);
    });
});

router.get('/latest/:count', (req, res, next) => {
    newsModel.readLatest(req.params.count)
    .then(e => {
        res.status(200).json(e);
    }).catch(e => {
        res.status(400).json(e);
    })
});

router.get('/all', (req, res, next) => {
    newsModel.read().then(e => {
        res.status(200).json(e);
    }).catch(e => {
        res.status(400).send(e);
    });
});

module.exports = router;