const config = {
  mongodb: {
    url: 'mongodb+srv://admin:admin@app-6pb7g.mongodb.net/test?retryWrites=true&w=majority',
    databaseName: "app-db",

    options: {
      useNewUrlParser: true // removes a deprecation warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog'
};

//Return the config as a promise
module.exports = config;
