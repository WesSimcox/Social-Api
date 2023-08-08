const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/SocialApi_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

const schema = new mongoose.Schema({
  key: String,
  value: Number,
  // Define more fields here
});

const YourModel = mongoose.model('YourModel', schema);

const newDocument = new YourModel({
  key: 'value',
  value: 42,
});

newDocument.save()
  .then(() => {
    console.log('Document saved successfully');
  })
  .catch((error) => {
    console.error('Error saving document:', error);
});

YourModel.find({ key: 'value' })
  .then((documents) => {
    console.log('Found documents:', documents);
})

.catch((error) => {
    console.error('Error querying documents:', error);
});

mongoose.connection.close()
  .then(() => {
    console.log('Connection closed');
})
.catch((error) => {
    console.error('Error closing connection:', error);
});

connectToDatabase();