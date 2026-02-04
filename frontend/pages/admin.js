import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user || !user.is_admin) {
      router.push('/');
      return;
    }

    // Fetch dashboard stats
  }, [user, loading]);

  if (loading || !user || !user.is_admin) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-teal-600">Admin Dashboard</h1>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-bold mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-teal-600">--</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-bold mb-2">Resources</h3>
              <p className="text-3xl font-bold text-teal-600">--</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-bold mb-2">Competitions</h3>
              <p className="text-3xl font-bold text-orange-500">--</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-gray-600 text-sm font-bold mb-2">Marketplace Items</h3>
              <p className="text-3xl font-bold text-teal-600">--</p>
            </div>
          </div>

          {/* Admin Tabs */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b flex gap-6 px-6 py-4">
              <button className="text-teal-600 border-b-2 border-teal-600 pb-2 font-bold">
                Pending Approvals
              </button>
              <button className="text-gray-600 hover:text-teal-600">Manage Users</button>
              <button className="text-gray-600 hover:text-teal-600">Competitions</button>
              <button className="text-gray-600 hover:text-teal-600">Announcements</button>
            </div>

            <div className="p-6">
              <p className="text-gray-600">Admin features coming soon...</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
