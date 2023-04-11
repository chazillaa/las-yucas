const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
const connection_url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/las-yucas_db'
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = mongoose.connection;
