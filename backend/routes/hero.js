const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hero_content ORDER BY id LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  const { name, tagline, subtitle } = req.body;
  try {
    const existing = await pool.query('SELECT id FROM hero_content LIMIT 1');
    let result;
    if (existing.rows.length === 0) {
      result = await pool.query(
        'INSERT INTO hero_content (name, tagline, subtitle, updated_at) VALUES ($1,$2,$3,NOW()) RETURNING *',
        [name, tagline, subtitle]
      );
    } else {
      result = await pool.query(
        'UPDATE hero_content SET name=$1, tagline=$2, subtitle=$3, updated_at=NOW() WHERE id=$4 RETURNING *',
        [name, tagline, subtitle, existing.rows[0].id]
      );
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
