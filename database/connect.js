const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url);
};

//exports
module.exports = connectDB;