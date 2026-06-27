const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stats ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { num, text, display_order } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO stats (num, text, display_order) VALUES ($1,$2,$3) RETURNING *',
      [num, text, display_order || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { num, text, display_order } = req.body;
  try {
    const result = await pool.query(
      'UPDATE stats SET num=$1, text=$2, display_order=$3 WHERE id=$4 RETURNING *',
      [num, text, display_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM stats WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
