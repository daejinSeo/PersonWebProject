const mongodb = require('mongodb');

const mongoclient = mongodb.MongoClient;

let database;

async function connect(){
   const client = await mongoclient.connect('mongodb://127.0.0.1:27017');
   database = client.db('blog');
}

function getDb(){
    if(!database){
        throw {message: 'Database connection not established!'};
    }
    return database;
}



module.exports = {
    connetToDatabase: connect,
    getDb: getDb
};