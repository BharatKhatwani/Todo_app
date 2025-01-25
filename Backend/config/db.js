const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// MongoDB connection setup
const mongoURL = process.env.MONGO_URI;
mongoose.connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Person model
const Person = require('./models/Person');

// Dynamic route to get persons based on workType
app.get('/person/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    console.log("WorkType from URL:", workType);

    if (workType === 'chef' || workType === 'waiter' || workType === 'manager') {
      const response = await Person.find({ work: workType });
      console.log(response);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid Work Type' });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
