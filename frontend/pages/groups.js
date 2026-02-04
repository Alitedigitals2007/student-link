import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../utils/api';
import { FaUsers, FaComments } from 'react-icons/fa';

export default function Groups() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    fetchGroups();
  }, [user, loading]);

  const fetchGroups = async () => {
    try {
      const response = await apiClient.get('/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
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
          <h1 className="text-4xl font-bold mb-8 text-teal-600">School Groups</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-24 flex items-center justify-center text-white text-4xl">
                  🎓
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{group.description || 'Official group for this university'}</p>

                  <div className="flex gap-4 mb-6">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600">
                      <FaUsers /> View Members
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600">
                      <FaComments /> Chat
                    </button>
                  </div>

                  <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                    Join Group
                  </button>
                </div>
              </div>
            ))}
          </div>

          {groups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No groups available yet.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
