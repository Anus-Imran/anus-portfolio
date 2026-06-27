require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: (origin, cb) => cb(null, true), // allow all origins for local dev
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/hero', require('./routes/hero'));
app.use('/api/about', require('./routes/about'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/experiences', require('./routes/experiences'));
app.use('/api/education', require('./routes/education'));
app.use('/api/tech', require('./routes/tech'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
