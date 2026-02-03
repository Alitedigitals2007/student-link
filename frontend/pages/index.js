import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBook, FaRocket, FaShoppingCart, FaUsers, FaCalendar, FaLightbulb } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-teal-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Student Link</h1>
            <p className="text-xl mb-8">The Central Hub for Nigerian Students - Learn, Compete, Network & Grow</p>
            {!user ? (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/register')}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600"
                >
                  Get Started
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
                >
                  Login
                </button>
              </div>
            ) : (
              <p className="text-2xl">Welcome, {user.name}! 🎓</p>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <FaBook className="text-4xl text-teal-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Study Resources</h3>
                <p className="text-gray-600">Share and access study materials, apps, and links from verified students.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <FaRocket className="text-4xl text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Competitions</h3>
                <p className="text-gray-600">Participate in exciting competitions with prizes and climb the leaderboard.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <FaShoppingCart className="text-4xl text-teal-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Marketplace</h3>
                <p className="text-gray-600">Buy and sell notes, apps, tutoring services, and academic equipment.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <FaUsers className="text-4xl text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">School Groups</h3>
                <p className="text-gray-600">Connect with students from your university and build your network.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <FaCalendar className="text-4xl text-teal-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">Timeline</h3>
                <p className="text-gray-600">Stay updated with trending posts, announcements, and campus news.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <FaLightbulb className="text-4xl text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Chat</h3>
                <p className="text-gray-600">Direct messaging with friends and group chats for your school.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-teal-50 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Join Thousands of Nigerian Students</h2>
            <p className="text-xl text-gray-600 mb-8">Start learning, competing, and networking today!</p>
            {!user && (
              <button
                onClick={() => router.push('/register')}
                className="bg-teal-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-700"
              >
                Sign Up Now
              </button>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  // This makes the page dynamic/server-rendered, not static
  return {
    props: {},
    revalidate: false, // No ISR/static caching
  };
}
