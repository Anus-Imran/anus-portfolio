const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tech_stack ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { name, icon_url, width, height, percentage, display_order } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tech_stack (name, icon_url, width, height, percentage, display_order) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [name, icon_url, width || 40, height || 40, percentage || 70, display_order || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, icon_url, width, height, percentage, display_order } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tech_stack SET name=$1, icon_url=$2, width=$3, height=$4, percentage=$5, display_order=$6 WHERE id=$7 RETURNING *',
      [name, icon_url, width || 40, height || 40, percentage || 70, display_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM tech_stack WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
