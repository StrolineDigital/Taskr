const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskr");
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB URI:', process.env.MONGODB_URI);

module.exports = mongoose.connection;
