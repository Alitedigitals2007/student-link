import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Sending login request to backend
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Updating auth context and redirecting to dashboard/home
      login(user, token);
      router.push('/');
    } catch (err) {
      // Displaying specific server error or a fallback message
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-12 px-4 flex items-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 w-full border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Welcome Back!</h1>

          {/* Error Alert Block */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Registration Link */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="text-teal-600 hover:underline font-bold transition-all">
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
