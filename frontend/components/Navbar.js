import React from 'react';
import { FaHome, FaComments, FaBookmark, FaTrophy, FaStore, FaUsers, FaUser, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-teal-600">Student Link</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="flex items-center gap-2 hover:text-teal-600">
            <FaHome /> Home
          </Link>
          <Link href="/timeline" className="flex items-center gap-2 hover:text-teal-600">
            <FaComments /> Timeline
          </Link>
          <Link href="/resources" className="flex items-center gap-2 hover:text-teal-600">
            <FaBookmark /> Resources
          </Link>
          <Link href="/competitions" className="flex items-center gap-2 hover:text-teal-600">
            <FaTrophy /> Competitions
          </Link>
          <Link href="/marketplace" className="flex items-center gap-2 hover:text-teal-600">
            <FaStore /> Marketplace
          </Link>
          <Link href="/groups" className="flex items-center gap-2 hover:text-teal-600">
            <FaUsers /> Groups
          </Link>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/profile" className="flex items-center gap-2 hover:text-teal-600">
                <FaUser /> {user.name}
              </Link>
              {user.is_admin && (
                <Link href="/admin" className="flex items-center gap-2 hover:text-orange-500">
                  <FaCog /> Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-teal-600 hover:text-teal-700">
                Login
              </Link>
              <Link href="/register" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gray-100 px-4 py-2 flex gap-2 overflow-x-auto">
        <Link href="/" className="text-teal-600 whitespace-nowrap">Home</Link>
        <Link href="/timeline" className="text-teal-600 whitespace-nowrap">Timeline</Link>
        <Link href="/resources" className="text-teal-600 whitespace-nowrap">Resources</Link>
        <Link href="/competitions" className="text-teal-600 whitespace-nowrap">Competitions</Link>
        <Link href="/marketplace" className="text-teal-600 whitespace-nowrap">Marketplace</Link>
        <Link href="/groups" className="text-teal-600 whitespace-nowrap">Groups</Link>
      </div>
    </nav>
  );
}
