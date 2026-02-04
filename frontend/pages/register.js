import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Added Link import
import apiClient from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define the list outside the component for better performance
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
  'University of Benin',
  'University of Ilorin',
  'Federal University of Technology, Akure',
  'Yaba College of Technology',
  'Federal Polytechnic, Ilaro',
  'Auchi Polytechnic',
  'Kaduna Polytechnic',
  'The Polytechnic, Ibadan',
  'Lagos State Polytechnic',
  'Federal College of Education, Akoka',
  'Adeyemi College of Education',
  'Alvan Ikoku Federal College of Education',
  'Federal College of Education (Special), Oyo'
];

const departments = ['Computer Science', 'Engineering', 'Medicine', 'Law', 'Business', 'Science', 'Arts'];
const levels = ['100', '200', '300', '400', '500'];

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
      setError(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 py-12 px-4 flex items-center">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 w-full border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">Join Student Link</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-4 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />

            <input
              type="tel"
              name="whatsapp_number"
              placeholder="WhatsApp Number (e.g., 080123...)"
              value={formData.whatsapp_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
            />

            <select
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all bg-white"
            >
              <option value="">Select University</option>
              {universities.map((uni) => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-4">
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all bg-white"
              >
                <option value="">Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all bg-white"
              >
                <option value="">Level</option>
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-teal-600 hover:underline font-bold">
              Login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
