const express = require('express');
const router = express.Router();

// Fixed admin credentials as per requirements
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '1234';

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: 'admin-token-fixed' });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

router.post('/verify', (req, res) => {
  const { token } = req.body;
  if (token === 'admin-token-fixed') {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false });
});

module.exports = router;
