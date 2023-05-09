// importing packages
const mongoose = require("moongoose");

// setting up the connection to mongoose and mongo local 
// passing in mongo URI to establish secure connections to MongoDB clusters
// useNewURLParser instead of the legacy parser, improved performance and security
// useUnifiedTopology instead the legacy layer, improved performance and scalability

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/NoSQLSocialAPI", {
    useNewURLParser: true,
    useUnifiedTopology: true
});

// exporting
module.exports = mongoose.connection;