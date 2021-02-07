const mongoose = require('mongoose');

const MONGODB_PWD = process.env.MONGODB_PASSWORD;

let uri;
if (process.env.NODE_ENV === 'production') {
    uri = `mongodb+srv://linkapi:${MONGODB_PWD}@linkapi-cluster.e4lxr.mongodb.net/linkapi_db?retryWrites=true&w=majority`;
} else {
    uri = `mongodb://localhost:27017/linkapi_test_db`;
}

const connection = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

module.exports = connection;
