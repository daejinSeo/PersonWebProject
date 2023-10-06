const expressSession = require('express-session');
const mongoDBStore = require('connect-mongodb-session');

function createSessionStore(){
    const MongoDBStore = mongoDBStore(expressSession);
    const store = new MongoDBStore({
        url: 'mongodb://127.0.0.1:27017/online-shop',
        collection: 'sessions'
    });
    return store;
}

function createSessionConfig(){
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = {
    createSessionConfig: createSessionConfig
}