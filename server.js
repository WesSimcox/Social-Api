// server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/api/userRoute');
const commentRoute = require('./routes/api/commentRoute');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use your routes
app.use(userRoute);
app.use(commentRoute);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SocialApi_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
})

.catch(err => console.error('Error connecting to MongoDB:', err));
