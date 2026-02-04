import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../utils/api';
import { FaDownload, FaEye } from 'react-icons/fa';

export default function Resources() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [resources, setResources] = useState([]);
  const [filter, setFilter] = useState({ department: '', level: '', university: '' });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    fetchResources();
  }, [filter, user, loading]);

  const fetchResources = async () => {
    try {
      const response = await apiClient.get('/resources', { params: filter });
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-teal-600">Study Resources</h1>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filter.department}
                onChange={(e) => setFilter({ ...filter, department: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Law">Law</option>
              </select>

              <select
                value={filter.level}
                onChange={(e) => setFilter({ ...filter, level: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="">All Levels</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
              </select>

              <button className="bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                + Submit Resource
              </button>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-24 flex items-center justify-center text-white text-3xl">
                  📚
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  
                  <div className="flex gap-2 mb-4 text-xs">
                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded">{resource.department}</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">Level {resource.level}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEye /> {resource.views_count}
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 flex items-center gap-2"
                    >
                      <FaDownload /> Access
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {resources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No resources found. Try changing your filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
