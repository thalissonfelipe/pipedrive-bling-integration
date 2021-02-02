const mongoose = require('mongoose');

const MONGODB_PWD = process.env.MONGODB_PASSWORD;

const URI = `mongodb+srv://linkapi:${MONGODB_PWD}@linkapi-cluster.e4lxr.mongodb.net/linkapi_db?retryWrites=true&w=majority`;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (!err) console.log('Connected with MongoDB Atlas!');
    else console.log('Error MongoDB connection:', err);
});