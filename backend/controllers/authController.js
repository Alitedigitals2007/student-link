const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Register
const register = async (req, res) => {
  try {
    const { name, email, password, whatsapp_number, university, department, level } = req.body;

    // Check if user exists
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get or create school group
    let schoolGroup = await pool.query('SELECT id FROM school_groups WHERE university = $1', [university]);
    let schoolGroupId = schoolGroup.rows[0]?.id;

    if (!schoolGroupId) {
      const newGroup = await pool.query(
        'INSERT INTO school_groups (name, university) VALUES ($1, $2) RETURNING id',
        [university, university]
      );
      schoolGroupId = newGroup.rows[0].id;
    }

    // Create user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, whatsapp_number, university, department, level, school_group_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, email, name, is_admin`,
      [name, email, hashedPassword, whatsapp_number, university, department, level, schoolGroupId]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({ 
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login };
