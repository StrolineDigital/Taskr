const mongoose = require("mongoose");

<<<<<<< HEAD
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskr");
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB URI:', process.env.MONGODB_URI);
=======
mongoose.connect(process.env.MONGODB_URI );
>>>>>>> 6ab2dbf40e150f9e23388b9e7901d06c229cb7c9

module.exports = mongoose.connection;
