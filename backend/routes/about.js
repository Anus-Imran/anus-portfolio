const express = require('express');
const https = require('https');
const http = require('http');
const pool = require('../db');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Public endpoint — proxies the stored CV so browser downloads it correctly
router.get('/download-cv', async (req, res) => {
  try {
    const result = await pool.query('SELECT cv_url FROM about_content ORDER BY id LIMIT 1');
    const url = result.rows[0]?.cv_url;
    if (!url) return res.status(404).send('No CV uploaded yet.');

    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (fileRes) => {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Anus-Imran-CV.pdf"');
      fileRes.pipe(res);
    }).on('error', () => res.status(500).send('Failed to fetch CV.'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM about_content ORDER BY id LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  const { bio, typing_words, cv_url, profile_image_url } = req.body;
  try {
    const existing = await pool.query('SELECT id FROM about_content LIMIT 1');
    let result;
    if (existing.rows.length === 0) {
      result = await pool.query(
        'INSERT INTO about_content (bio, typing_words, cv_url, profile_image_url, updated_at) VALUES ($1,$2,$3,$4,NOW()) RETURNING *',
        [bio, typing_words, cv_url, profile_image_url]
      );
    } else {
      result = await pool.query(
        'UPDATE about_content SET bio=$1, typing_words=$2, cv_url=$3, profile_image_url=$4, updated_at=NOW() WHERE id=$5 RETURNING *',
        [bio, typing_words, cv_url, profile_image_url, existing.rows[0].id]
      );
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
