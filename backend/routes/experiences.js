const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experiences ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, company_name, icon_url, icon_bg, date_range, points, display_order } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO experiences (title, company_name, icon_url, icon_bg, date_range, points, display_order) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [title, company_name, icon_url, icon_bg || '#383E56', date_range, points || [], display_order || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, company_name, icon_url, icon_bg, date_range, points, display_order } = req.body;
  try {
    const result = await pool.query(
      'UPDATE experiences SET title=$1, company_name=$2, icon_url=$3, icon_bg=$4, date_range=$5, points=$6, display_order=$7 WHERE id=$8 RETURNING *',
      [title, company_name, icon_url, icon_bg || '#383E56', date_range, points || [], display_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM experiences WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
