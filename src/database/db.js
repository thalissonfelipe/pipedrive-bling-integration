const mongoose = require('mongoose');

const MONGODB_PWD = process.env.MONGODB_PASSWORD;

const URI = `mongodb+srv://linkapi:${MONGODB_PWD}@linkapi-cluster.e4lxr.mongodb.net/linkapi_db?retryWrites=true&w=majority`;

const connection = mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

module.exports = connection;
