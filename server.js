require('dotenv').config();

const tracer = require('dd-trace').init({
  env: process.env.NODE_ENV || 'dev',
  service: 'cozco',
  version: '1.0.0' 
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./src/route/authRoutes');
const articleRoutes = require('./src/route/articleRoutes');
const commandeRoutes = require('./src/route/commandeRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', articleRoutes);
app.use('/api', commandeRoutes);

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
