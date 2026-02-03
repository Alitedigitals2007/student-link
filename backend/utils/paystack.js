const axios = require('axios');

class PaystackService {
  constructor() {
    this.secretKey = process.env.PAYSTACK_SECRET_KEY;
    this.publicKey = process.env.PAYSTACK_PUBLIC_KEY;
    this.baseURL = 'https://api.paystack.co';
  }

  // Initialize payment
  async initializePayment(email, amount, metadata = {}) {
    try {
      const response = await axios.post(
        `${this.baseURL}/transaction/initialize`,
        {
          email,
          amount: amount * 100, // Convert to kobo
          metadata,
        },
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.error('Paystack initialization error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Payment initialization failed',
      };
    }
  }

  // Verify payment
  async verifyPayment(reference) {
    try {
      const response = await axios.get(
        `${this.baseURL}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
          },
        }
      );

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      console.error('Paystack verification error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Payment verification failed',
      };
    }
  }

  // Get payment details
  async getPaymentDetails(reference) {
    return this.verifyPayment(reference);
  }
}

module.exports = new PaystackService();
