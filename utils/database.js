const mongoose = require("mongoose");
const { DatabaseEvents } = require("../app_constants");
require("dotenv").config();

const dbConnection = (cb) => {
  const DATABASE_URL = process.env.DATABASE_URL;

  //192.168.17.51

  //192.168.16.157
  mongoose.connect(/*"mongodb://192.168.17.51:27017/forumdb"*/ DATABASE_URL, {
    useNewUrlParser: true,
  });

  const database = mongoose.connection;
  database.once(DatabaseEvents.CONNECTED, cb);
};

module.exports = dbConnection;
