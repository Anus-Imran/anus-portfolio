const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM education ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { degree, institution, location, start_date, end_date, grade, icon_url, icon_bg, details, display_order } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO education (degree, institution, location, start_date, end_date, grade, icon_url, icon_bg, details, display_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
      [degree, institution, location, start_date, end_date, grade, icon_url, icon_bg || '#383E56', details || [], display_order || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { degree, institution, location, start_date, end_date, grade, icon_url, icon_bg, details, display_order } = req.body;
  try {
    const result = await pool.query(
      'UPDATE education SET degree=$1, institution=$2, location=$3, start_date=$4, end_date=$5, grade=$6, icon_url=$7, icon_bg=$8, details=$9, display_order=$10 WHERE id=$11 RETURNING *',
      [degree, institution, location, start_date, end_date, grade, icon_url, icon_bg || '#383E56', details || [], display_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM education WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
