const express = require('express');
const { verifyToken } = require('../middleware/auth');
const paystack = require('../utils/paystack');
const pool = require('../config/database');

const router = express.Router();

// Initialize payment
router.post('/initialize', verifyToken, async (req, res) => {
  try {
    const { listing_id, amount } = req.body;

    if (!listing_id || !amount) {
      return res.status(400).json({ message: 'listing_id and amount required' });
    }

    // Get user email
    const userResult = await pool.query('SELECT email FROM users WHERE id = $1', [req.user.id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userEmail = userResult.rows[0].email;

    // Initialize Paystack payment
    const paymentResult = await paystack.initializePayment(
      userEmail,
      amount,
      {
        listing_id,
        user_id: req.user.id,
      }
    );

    if (!paymentResult.success) {
      return res.status(400).json(paymentResult);
    }

    // Store transaction in database
    const transactionResult = await pool.query(
      `INSERT INTO transactions (user_id, listing_id, amount, currency, payment_method, payment_ref, status)
       VALUES ($1, $2, $3, 'NGN', 'paystack', $4, 'pending')
       RETURNING *`,
      [req.user.id, listing_id, amount, paymentResult.data.reference]
    );

    res.json({
      success: true,
      data: {
        ...paymentResult.data,
        transaction_id: transactionResult.rows[0].id,
      },
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ message: 'Payment initialization failed', error: error.message });
  }
});

// Verify payment
router.post('/verify/:reference', verifyToken, async (req, res) => {
  try {
    const { reference } = req.params;

    // Verify with Paystack
    const verifyResult = await paystack.verifyPayment(reference);

    if (!verifyResult.success) {
      return res.status(400).json(verifyResult);
    }

    const paymentData = verifyResult.data;

    if (paymentData.status === 'success') {
      // Update transaction status
      await pool.query(
        'UPDATE transactions SET status = $1 WHERE payment_ref = $2',
        ['completed', reference]
      );

      return res.json({
        success: true,
        message: 'Payment verified successfully',
        data: paymentData,
      });
    }

    res.status(400).json({
      success: false,
      message: 'Payment not successful',
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Payment verification failed', error: error.message });
  }
});

// Get transaction history
router.get('/transactions', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, ml.title as listing_title 
       FROM transactions t
       LEFT JOIN marketplace_listings ml ON t.listing_id = ml.id
       WHERE t.user_id = $1
       ORDER BY t.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
});

module.exports = router;
