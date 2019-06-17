import { MongoClient } from 'mongodb';

const CONNECTION_URL = 'mongodb+srv://admin:admin@app-6pb7g.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = 'app-db';

let _db;

export const initDatabase = callback => {
  if (_db) {
    console.warn('Trying to init database again!');
    return callback(null, _db);
  }

  MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) return callback(err);
    _db = client.db(DATABASE_NAME);
    console.log('Connected to `' + DATABASE_NAME + '`!');
    return callback(null, _db);
  });
};

export const getDatabase = () => {
  return _db;
};
