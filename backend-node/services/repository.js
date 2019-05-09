const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('./../config/db-config');

const client = new MongoClient(dbConfig.dbUrl, { useNewUrlParser: true });

let collection = null;

function getCollection() {
    return collection;
}

function connect(success, error) {
    client.connect(async function(err) {
        if (err != null) {
            error(error);
        }
        
        const db = client.db(dbConfig.dbName);
        try {
            collection = db.collection(dbConfig.collectionName);
            success();
        }
        catch(err) {
            error(error);
        }
    });
}

module.exports = { getCollection, connect };
