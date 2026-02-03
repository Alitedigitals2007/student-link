const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Create marketplace listing
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const result = await pool.query(
      `INSERT INTO marketplace_listings (title, description, price, category, seller_id, is_approved)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, title, price`,
      [title, description, price, category, req.user.id, false]
    );

    res.status(201).json({ message: 'Listing submitted for approval', listing: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get approved listings
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM marketplace_listings WHERE is_approved = true AND is_active = true';
    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }
    if (search) {
      query += ` AND title ILIKE $${paramCount}`;
      params.push(`%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: approve listing
router.put('/:id/approve', verifyAdmin, async (req, res) => {
  try {
    await pool.query('UPDATE marketplace_listings SET is_approved = true WHERE id = $1', [req.params.id]);
    res.json({ message: 'Listing approved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
