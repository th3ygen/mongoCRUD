const DataModel = require('../models/data.model');

exports.create = (req, res) => {
    DataModel.create(req.body.label, req.body.value)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.read = (req, res) => {
    DataModel.read().then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.readById = (req, res) => {
    DataModel.readById(req.params.id).then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.update = (req, res) => {
    DataModel.update(req.params.id, req.body.label, req.body.value).then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.send(err);
    });
}

exports.delete = (req, res) => {
    DataModel.delete(req.params.id).then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.send(err);
    });
}