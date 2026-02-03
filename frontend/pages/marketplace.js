import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../utils/api';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

export default function Marketplace() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState({ category: '', search: '' });

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    fetchListings();
  }, [filter, user, loading]);

  const fetchListings = async () => {
    try {
      const response = await apiClient.get('/marketplace', { params: filter });
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
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
          <h1 className="text-4xl font-bold mb-8 text-teal-600">Marketplace</h1>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="">All Categories</option>
                <option value="notes">Notes</option>
                <option value="apps">Apps</option>
                <option value="tutoring">Tutoring</option>
                <option value="equipment">Equipment</option>
              </select>

              <input
                type="text"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                placeholder="Search marketplace..."
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />

              <button className="bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                + List Item
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 h-40 flex items-center justify-center text-white text-5xl">
                  🛍️
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{listing.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-orange-500 flex items-center gap-1">
                    ₦ {listing.price}
                    </div>
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded text-xs font-bold">
                      {listing.category}
                    </span>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <FaStar className="text-orange-400" />
                    <span className="text-sm text-gray-600">5.0 (12 reviews)</span>
                  </div>

                  <button className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center justify-center gap-2">
                    <FaShoppingCart /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {listings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No items found. Try different filters.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
