const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Submit a study resource
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, resource_type, url, department, level, university } = req.body;

    const result = await pool.query(
      `INSERT INTO study_resources (title, description, resource_type, url, department, level, university, submitted_by, is_approved)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, title, description`,
      [title, description, resource_type, url, department, level, university, req.user.id, false]
    );

    res.status(201).json({ message: 'Resource submitted for approval', resource: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get approved resources with filters
router.get('/', async (req, res) => {
  try {
    const { department, level, university, featured } = req.query;
    let query = 'SELECT * FROM study_resources WHERE is_approved = true';
    const params = [];
    let paramCount = 1;

    if (department) {
      query += ` AND department = $${paramCount}`;
      params.push(department);
      paramCount++;
    }
    if (level) {
      query += ` AND level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }
    if (university) {
      query += ` AND university = $${paramCount}`;
      params.push(university);
      paramCount++;
    }
    if (featured === 'true') {
      query += ' AND is_featured = true';
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: approve resource
router.put('/:id/approve', verifyAdmin, async (req, res) => {
  try {
    await pool.query('UPDATE study_resources SET is_approved = true WHERE id = $1', [req.params.id]);
    res.json({ message: 'Resource approved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: feature resource
router.put('/:id/feature', verifyAdmin, async (req, res) => {
  try {
    await pool.query('UPDATE study_resources SET is_featured = true WHERE id = $1', [req.params.id]);
    res.json({ message: 'Resource featured' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
