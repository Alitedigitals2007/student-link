const express = require('express');
const { verifyToken } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Get school groups
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM school_groups ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get school group members
router.get('/:id/members', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, university, avatar_url FROM users WHERE school_group_id = $1',
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
