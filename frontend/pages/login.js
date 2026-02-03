import React, { useState } from 'react';
import { useRouter } from 'next/router';
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
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      login(user, token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-12 px-4 flex items-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 w-full">
          <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Welcome Back!</h1>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="my-4 text-center text-sm text-gray-600">
            <p>Demo Admin Credentials:</p>
            <p>Email: studentlink@admin.com</p>
            <p>Password: studentlinkadmin</p>
          </div>

          <p className="text-center mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-teal-600 hover:underline font-bold">
              Register
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
    revalidate: false,
  };
}
