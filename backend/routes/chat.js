const express = require('express');
const { verifyToken } = require('../middleware/auth');
const pool = require('../config/database');

const router = express.Router();

// Get messages in a room
router.get('/:roomId', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cm.*, u.name, u.avatar_url FROM chat_messages cm 
       JOIN users u ON cm.sender_id = u.id 
       WHERE cm.room_id = $1 
       ORDER BY cm.created_at ASC`,
      [req.params.roomId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send message (handled by Socket.IO in server.js, but can add REST endpoint)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { receiver_id, message, file_url } = req.body;

    const result = await pool.query(
      'INSERT INTO chat_messages (sender_id, receiver_id, message, file_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, receiver_id, message, file_url]
    );

    res.status(201).json({ message: 'Message sent', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
