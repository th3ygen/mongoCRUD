const mongoose = require('../../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const fs = require('fs');
const path = require('path');

const schema = new Schema({
    header: String,
    description: String,
    imgURL: [String],
    tags: [String],
    official: Boolean,

    timestamp: Number,

    dateCreated: Number
});

const News = mongoose.model('News', schema);

exports.create = (header, description, img, tags, official, timestamp) => {
    return new Promise((resolve, reject) => {
        // create image and store it to folder
        // uses timestamp as id

        let imgPaths = [];
        let imgPath = path.join(__root, `/storage/img/${new Date().getTime()}`);

        fs.mkdir(imgPath, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                img.forEach((data, x) => {
                    let filePath = path.join(imgPath, `${x}.png`);
                    fs.writeFile(filePath, data, 'base64', (err, res) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                    });
                    
                    imgPaths.push(filePath);
                });
                const news = new News({
                    header: header,
                    description: description,
                    imgURL: imgPaths,
                    tags: tags,
                    official: official,
        
                    timestamp: timestamp,
        
                    dateCreated: new Date().getTime()
                });
        
                resolve(news.save());
            }
        })
        
    });
    
}

// read all news
exports.read = () => {
    return new Promise((resolve, reject) => {
        News.find().exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

exports.readLatest = (count) => {
    return new Promise((resolve, reject) => {
        News.find({})
        .sort({dateCreated: -1})
        .limit(parseInt(count))
        .exec((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    });
}

exports.readById = id => {
    return new Promise((resolve, reject) => {
        News.findById(id, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}

exports.update = (id, header, description, imgURL, tags, official, timestamp) => {
    return new Promise((resolve, reject) => {
        News.findByIdAndUpdate(id, {
            header: header,
            description: description,
            imgURL: imgURL,
            tags: tags,
            official: official,

            timestamp: timestamp,

            dateCreated: new Date().getTime()
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
        News.findByIdAndDelete(id, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    })
}