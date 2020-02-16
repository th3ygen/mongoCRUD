const model = require('../models/news.model');

exports.create = (req, res) => {
    const news = req.body;
    model.create(news.header, news.description, news.img, news.tags, news.official, news.timestamp)
    .then(news => {
        res.status(200).send(news);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.read = (req, res) => {
    model.read().then(news => {
        res.status(200).send(news);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.readLatest = (req, res) => {
    model.readLatest(req.params.count)
    .then(news => {
        res.status(200).send(news);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.readById = (req, res) => {
    model.readById(req.params.id).then(news => {
        res.status(200).send(news);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.update = (req, res) => {
    const news = req.body;
    model.update(req.params.id, news.header, news.description, news.imgURL, news.tags, news.official, news.timestamp).then(news => {
        res.status(200).send(news);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.delete = (req, res) => {
    model.delete(req.params.id).then(news => {
        res.status(200).send(news);
    })
    .catch(err => {
        res.send(err);
    });
}