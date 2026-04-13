const express = require('express');
const router = express.Router();
const { getPool } = require('../db');

// GET all content sections
router.get('/', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.execute('SELECT section, data FROM content');
    const result = {};
    rows.forEach(row => {
      result[row.section] = JSON.parse(row.data);
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET single section
router.get('/:section', async (req, res) => {
  try {
    const db = getPool();
    const [rows] = await db.execute(
      'SELECT data FROM content WHERE section = ?',
      [req.params.section]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Section not found' });
    }
    res.json({ data: JSON.parse(rows[0].data) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT update section (admin only)
router.put('/:section', async (req, res) => {
  const token = req.headers['token'];
  if (token !== 'admin-token-fixed') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const db = getPool();
    const dataStr = JSON.stringify(req.body.data);

    await db.execute(
      `INSERT INTO content (section, data)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP`,
      [req.params.section, dataStr]
    );

    res.json({ success: true, data: req.body.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
