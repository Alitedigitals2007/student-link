import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEdit, FaCamera, FaLink } from 'react-icons/fa';

export default function Profile() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-teal-600 to-teal-500 h-32"></div>

            <div className="px-6 pb-6">
              <div className="flex flex-col md:flex-row gap-6 -mt-16 mb-6">
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/120"
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700">
                    <FaCamera />
                  </button>
                </div>

                <div className="flex-1 mt-8">
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-gray-600">{user.university}</p>
                  <p className="text-gray-600">{user.department} • Level {user.level}</p>
                </div>

                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 h-fit flex items-center gap-2">
                  <FaEdit /> Edit Profile
                </button>
              </div>

              {/* Profile Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div>
                  <h3 className="font-bold text-gray-600 mb-2">Email</h3>
                  <p className="text-gray-800">{user.email}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600 mb-2">WhatsApp</h3>
                  <p className="text-gray-800">{user.whatsapp_number || 'Not added'}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600 mb-2">School Group</h3>
                  <p className="text-gray-800">{user.university}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="border-b flex gap-6 px-6 py-4">
              <button className="text-teal-600 border-b-2 border-teal-600 pb-2 font-bold">
                My Posts
              </button>
              <button className="text-gray-600 hover:text-teal-600">Resources Shared</button>
              <button className="text-gray-600 hover:text-teal-600">Bookmarks</button>
              <button className="text-gray-600 hover:text-teal-600">Friends</button>
            </div>

            <div className="p-6">
              <p className="text-gray-600">Your posts will appear here.</p>
            </div>
          </div>
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
