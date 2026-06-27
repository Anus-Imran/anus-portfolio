const express = require('express');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY display_order, id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id=$1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, description, full_description, image_url, live_demo_link, github_link, tech_stack, key_features, category, display_order } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (title, description, full_description, image_url, live_demo_link, github_link, tech_stack, key_features, category, display_order) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
      [title, description, full_description, image_url, live_demo_link, github_link, tech_stack || [], key_features || [], category || 'Basic', display_order || 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, full_description, image_url, live_demo_link, github_link, tech_stack, key_features, category, display_order } = req.body;
  try {
    const result = await pool.query(
      'UPDATE projects SET title=$1, description=$2, full_description=$3, image_url=$4, live_demo_link=$5, github_link=$6, tech_stack=$7, key_features=$8, category=$9, display_order=$10 WHERE id=$11 RETURNING *',
      [title, description, full_description, image_url, live_demo_link, github_link, tech_stack || [], key_features || [], category || 'Basic', display_order || 0, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bulk update display_order
router.put('/reorder/bulk', authMiddleware, async (req, res) => {
  const { orders } = req.body; // [{ id, display_order }, ...]
  try {
    await Promise.all(orders.map(({ id, display_order }) =>
      pool.query('UPDATE projects SET display_order=$1 WHERE id=$2', [display_order, id])
    ));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
