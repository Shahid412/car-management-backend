// backend/server.js
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./src/routes/index');
const connectDB = require('./src/config/db.config');

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(helmet()); // Protect against XSS
app.use(cors());
app.use('/api', routes); // Use the main routes

const PORT = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
