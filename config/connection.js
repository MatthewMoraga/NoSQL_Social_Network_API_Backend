// importing packages
const mongoose = require("mongoose");

// setting up the connection to mongoose and mongo local 
// passing in mongo URI to establish secure connections to MongoDB clusters
// useNewURLParser instead of the legacy parser, improved performance and security
// useUnifiedTopology instead the legacy layer, improved performance and scalability
// connecting works with 127 instead of localhost for some reason

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/NoSQLSocialAPI",{
    useNewURLParser: true,
    useUnifiedTopology: true
});

// exporting
module.exports = mongoose.connection
