import mongodb from 'mongodb';

const { MongoClient } = mongodb;
const DB_NAME = 'StudentsGHTK';
const CONNECTION_STRING = 'mongodb://localhost:27017/StudentsGHTK';

let dbConnection = null;

const connectToDb = (cb) => {
  MongoClient.connect(CONNECTION_STRING, function (err, db) {
    if (!err) dbConnection = db;
    cb(err);
  });
};

const getDb = () => dbConnection.db(DB_NAME);

export { connectToDb, getDb };
