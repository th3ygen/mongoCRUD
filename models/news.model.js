const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');

const schema = new Schema({
    header: String,
    description: String,
    tags: [String],
    imgURL: String,

    content: {
        text: String,
        imgURL: [String]
    },

    datePosted: Number,
    author: String
});

const News = mongoose.model('News', schema);

// takes id and img base64 data, then returns stored img path as promise
const storeImg = (id, imgData) => {
    return new Promise((resolve, reject) => {
        const imgStorePath = path.join(__root, `/storage/user/${id}/img/`);

        // create a new folder labeled with id provided
        fs.mkdir(imgStorePath, { recursive: true }, (err) => {
            if (err) {  
                reject(err);

            } else {
                const imgPath = path.join(imgStorePath, `${new Date().getTime()}.png`);

                fs.writeFile(imgPath, imgData, 'base64', (err, res) => {
                    if (err) {
                        reject(err);

                    } else {
                        resolve(imgPath);

                    }
                });
            }
        });
    });
}

exports.create = (authorId, author, header, brief, tags, img, content, timestamp) => {
    let news = new News({
        header: header,
        description: brief,
        tags: tags,
        imgURL: `/storage/images/${img}`,

        content: {
            text: content,
            imgURL: []
        },

        datePosted: timestamp,
        author: author
    });

    return news.save();
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