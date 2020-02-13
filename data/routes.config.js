const DataController = require('./controllers/data.controller');

// all routes to CRUD functions

exports.routesConfig = (app) => {
    //-- c.reate
    
    // new collection
    app.post('/collection/data', [
        DataController.create
    ]);

    //-- r.ead

    // get list from collection
    app.get('/collection/data', [
        DataController.read
    ]);

    // get data by id
    app.get('/collection/data/:id', [
        DataController.readById
    ]);

    //-- u.pdate

    app.put('/collection/data/:id', [
        DataController.update
    ]);

    //-- d.elete

    app.delete('/collection/data/:id', [
        DataController.delete
    ])
}