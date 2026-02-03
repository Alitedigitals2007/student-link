const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Create timeline post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { content, post_type, file_url, hashtags } = req.body;

    const result = await pool.query(
      `INSERT INTO timeline_posts (user_id, content, post_type, file_url, is_approved)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, content, created_at`,
      [req.user.id, content, post_type, file_url, false]
    );

    const postId = result.rows[0].id;

    // Add hashtags if provided
    if (hashtags && hashtags.length > 0) {
      for (const tag of hashtags) {
        const hashtagResult = await pool.query(
          'INSERT INTO hashtags (tag_name) VALUES ($1) ON CONFLICT (tag_name) DO UPDATE SET usage_count = usage_count + 1 RETURNING id',
          [tag]
        );
        
        const hashtagId = hashtagResult.rows[0].id;
        await pool.query('INSERT INTO post_hashtags (post_id, hashtag_id) VALUES ($1, $2)', [postId, hashtagId]);
      }
    }

    res.status(201).json({ message: 'Post created and sent for approval', post: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get timeline feed
router.get('/', async (req, res) => {
  try {
    const { department, level, school, trending, hashtag } = req.query;
    let query = `
      SELECT tp.*, u.name, u.avatar_url, u.university 
      FROM timeline_posts tp 
      JOIN users u ON tp.user_id = u.id 
      WHERE tp.is_approved = true
    `;
    const params = [];
    let paramCount = 1;

    if (department) {
      query += ` AND u.department = $${paramCount}`;
      params.push(department);
      paramCount++;
    }
    if (level) {
      query += ` AND u.level = $${paramCount}`;
      params.push(level);
      paramCount++;
    }
    if (school) {
      query += ` AND u.university = $${paramCount}`;
      params.push(school);
      paramCount++;
    }
    if (hashtag) {
      query += ` AND tp.id IN (SELECT post_id FROM post_hashtags ph JOIN hashtags h ON ph.hashtag_id = h.id WHERE h.tag_name = $${paramCount})`;
      params.push(hashtag);
      paramCount++;
    }

    if (trending === 'true') {
      query += ' ORDER BY tp.likes_count DESC, tp.created_at DESC';
    } else {
      query += ' ORDER BY tp.created_at DESC';
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like a post
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    await pool.query('UPDATE timeline_posts SET likes_count = likes_count + 1 WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post liked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Comment on post
router.post('/:id/comment', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    
    await pool.query(
      'INSERT INTO timeline_comments (post_id, user_id, content) VALUES ($1, $2, $3)',
      [req.params.id, req.user.id, content]
    );
    
    await pool.query('UPDATE timeline_posts SET comments_count = comments_count + 1 WHERE id = $1', [req.params.id]);
    
    res.status(201).json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Bookmark post
router.post('/:id/bookmark', verifyToken, async (req, res) => {
  try {
    await pool.query(
      'INSERT INTO bookmarks (user_id, post_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.user.id, req.params.id]
    );
    res.json({ message: 'Post bookmarked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin: approve post
router.put('/:id/approve', verifyAdmin, async (req, res) => {
  try {
    await pool.query('UPDATE timeline_posts SET is_approved = true WHERE id = $1', [req.params.id]);
    res.json({ message: 'Post approved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
