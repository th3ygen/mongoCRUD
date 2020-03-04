module.exports = {
    NODE_ENV: 'development',
    port: 8080,
    mongoose: {
        dbName: 'myras',
        connectOption: {
            autoIndex: false,
            poolSize: 10,
            bufferMaxEntries: 0,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    }
}