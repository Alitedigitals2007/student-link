const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Admin: Create competition
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, description, rules, deadline, prize, link } = req.body;

    const result = await pool.query(
      `INSERT INTO competitions (title, description, rules, deadline, prize, link, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, rules, deadline, prize, link, req.user.id]
    );

    res.status(201).json({ message: 'Competition created', competition: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all competitions (with timeline/calendar view)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM competitions ORDER BY deadline ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single competition
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM competitions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
