const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./db');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: 'mysql' }));

const PORT = process.env.PORT || 5000;

// Initialize MySQL DB then start server
initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} with MySQL`));
  })
  .catch(err => {
    console.error('❌ Failed to initialize DB:', err.message);
    process.exit(1);
  });
