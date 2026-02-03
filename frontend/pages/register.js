import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    whatsapp_number: '',
    university: '',
    department: '',
    level: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const universities = [
    'University of Lagos',
    'University of Ibadan',
    'Abubakar Tafawa Balewa University',
    'Covenant University',
    'Lagos State University',
    'Ahmadu Bello University',
    'Obafemi Awolowo University',
    'University of Nigeria',
    'Federal University of Technology, Minna',
    'Bayero University Kano',
  ];

  const departments = ['Computer Science', 'Engineering', 'Medicine', 'Law', 'Business', 'Science', 'Arts'];
  const levels = ['100', '200', '300', '400', '500'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiClient.post('/auth/register', formData);
      const { token, user } = response.data;
      
      login(user, token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-12 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Join Student Link</h1>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <input
              type="tel"
              name="whatsapp_number"
              placeholder="WhatsApp Number"
              value={formData.whatsapp_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />

            <select
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Select University</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-teal-600 hover:underline font-bold">
              Login
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
