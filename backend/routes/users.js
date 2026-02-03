const express = require('express');
const { verifyToken } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, avatar_url, bio, university, department, level FROM users WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { name, bio, avatar_url } = req.body;
    
    const result = await pool.query(
      'UPDATE users SET name = $1, bio = $2, avatar_url = $3, updated_at = NOW() WHERE id = $4 RETURNING id, name, email, bio',
      [name, bio, avatar_url, req.params.id]
    );
    
    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users (with filtering)
router.get('/', async (req, res) => {
  try {
    const { university, department, level } = req.query;
    let query = 'SELECT id, name, email, university, department, avatar_url FROM users WHERE 1=1';
    const params = [];
    let paramCount = 1;

    if (university) {
      query += ` AND university = $${paramCount}`;
      params.push(university);
      paramCount++;
    }
    if (department) {
      query += ` AND department = $${paramCount}`;
      params.push(department);
      paramCount++;
    }
    if (level) {
      query += ` AND level = $${paramCount}`;
      params.push(level);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
