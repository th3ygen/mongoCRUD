const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    label: String,
    value: Number,

    timestamp: Number
});

const Data = mongoose.model('Data', dataSchema);

exports.create = (label, value) => {
    const data = new Data({
        label: label,
        value: value,

        timestamp: new Date().getTime()
    });

    return data.save();
}

exports.read = () => {
    return new Promise((resolve, reject) => {
        Data.find().exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

exports.readById = id => {
    return new Promise((resolve, reject) => {
        Data.findById(id, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

exports.update = (id, label, value) => {
    return new Promise((resolve, reject) => {
        Data.findByIdAndUpdate(id, {
            label: label,
            value: value
        }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
}

exports.delete = id => {
    return new Promise((resolve, reject) => {
        Data.findByIdAndDelete(id, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}