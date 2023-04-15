const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

// Wrap Mongoose around local connection to MongoDB
const connection_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/las-yucas_db'
if (connection_url.includes('+srv')){
  mongoose.connect(connection_url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }})
} else {
  mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
}


// Export connection 
module.exports = mongoose.connection;
