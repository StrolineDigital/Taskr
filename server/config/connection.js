const mongoose = require("mongoose");

mongoose.connect(process.env.PORT || "mongodb://127.0.0.1:27017/taskr");
console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

module.exports = mongoose.connection;
