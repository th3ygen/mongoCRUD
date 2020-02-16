const controller = require('./controllers/news.controller');

// all routes to CRUD functions

exports.routesConfig = (app) => {
    //-- c.reate
    
    // new collection
    app.post('/db/myras/news', [
        controller.create
    ]);

    //-- r.ead

    // get list from collection
    app.get('/db/myras/news/', [
        controller.read
    ]);


    // get data sorted
    app.get('/db/myras/news/latest/:count', [
        controller.readLatest
    ]);

    // get data by id
    app.get('/db/myras/news/:id', [
        controller.readById
    ]);



    //-- u.pdate

    app.put('/db/myras/news/:id', [
        controller.update
    ]);

    //-- d.elete

    app.delete('/db/myras/news/:id', [
        controller.delete
    ])
}