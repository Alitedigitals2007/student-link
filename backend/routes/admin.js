const express = require('express');
const { verifyAdmin } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Get dashboard analytics
router.get('/dashboard', verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await pool.query('SELECT COUNT(*) FROM users WHERE is_admin = false');
    const totalResources = await pool.query('SELECT COUNT(*) FROM study_resources WHERE is_approved = true');
    const totalCompetitions = await pool.query('SELECT COUNT(*) FROM competitions');
    const totalListings = await pool.query('SELECT COUNT(*) FROM marketplace_listings WHERE is_approved = true');

    res.json({
      totalUsers: totalUsers.rows[0].count,
      totalResources: totalResources.rows[0].count,
      totalCompetitions: totalCompetitions.rows[0].count,
      totalListings: totalListings.rows[0].count,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get pending approvals
router.get('/pending/resources', verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM study_resources WHERE is_approved = false ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/pending/posts', verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tp.*, u.name, u.avatar_url FROM timeline_posts tp 
       JOIN users u ON tp.user_id = u.id 
       WHERE tp.is_approved = false 
       ORDER BY tp.created_at DESC`
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/pending/listings', verifyAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM marketplace_listings WHERE is_approved = false ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send announcement
router.post('/announcement', verifyAdmin, async (req, res) => {
  try {
    const { title, content, school_group_id } = req.body;
    // Implement announcement storage in a new table if needed
    res.json({ message: 'Announcement sent', data: { title, content, school_group_id } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
