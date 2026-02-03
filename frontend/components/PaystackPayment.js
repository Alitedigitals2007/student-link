import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../utils/api';
import { FaShoppingCart } from 'react-icons/fa';

export default function PaystackPayment({ listing, onSuccess, onClose }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Initialize payment
      const initResponse = await apiClient.post('/payments/initialize', {
        listing_id: listing.id,
        amount: listing.price,
      });

      if (!initResponse.data.success) {
        setError(initResponse.data.message);
        setLoading(false);
        return;
      }

      // Load Paystack script
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => {
        const paystack = window.PaystackPop;
        paystack.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: user.email,
          amount: listing.price * 100, // Convert to kobo
          ref: initResponse.data.data.reference,
          onClose: () => {
            setLoading(false);
            setError('Payment window closed.');
          },
          onSuccess: async () => {
            // Verify payment
            const verifyResponse = await apiClient.post(
              `/payments/verify/${initResponse.data.data.reference}`,
              {}
            );

            if (verifyResponse.data.success) {
              setLoading(false);
              onSuccess(verifyResponse.data.data);
            } else {
              setError('Payment verification failed');
              setLoading(false);
            }
          },
        });
        paystack.openIframe();
      };
      document.body.appendChild(script);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment initialization failed');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Purchase</h2>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Item: {listing.title}</p>
          <p className="text-2xl font-bold text-teal-600 mt-2">₦{listing.price.toLocaleString()}</p>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <FaShoppingCart /> {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>

        <p className="text-xs text-gray-600 text-center mt-4">
          Secured by Paystack | SSL Encrypted
        </p>
      </div>
    </div>
  );
}
