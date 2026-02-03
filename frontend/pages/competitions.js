import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../utils/api';
import { FaTrophy, FaClock, FaLink } from 'react-icons/fa';

export default function Competitions() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    fetchCompetitions();
  }, [user, loading]);

  const fetchCompetitions = async () => {
    try {
      const response = await apiClient.get('/competitions');
      setCompetitions(response.data);
    } catch (error) {
      console.error('Error fetching competitions:', error);
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
          <h1 className="text-4xl font-bold mb-8 text-teal-600">Competitions & Events</h1>

          {competitions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600 text-lg">No active competitions yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {competitions.map((comp) => (
                <div key={comp.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 h-32 flex items-center justify-center text-white text-5xl">
                    🏆
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{comp.title}</h2>
                    <p className="text-gray-600 mb-4">{comp.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <FaClock className="text-orange-500" />
                        <span>Deadline: {new Date(comp.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaTrophy className="text-orange-500" />
                        <span>Prize: {comp.prize}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <h4 className="font-bold mb-2">Rules:</h4>
                      <p className="text-gray-700 text-sm">{comp.rules}</p>
                    </div>

                    <a
                      href={comp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 flex items-center gap-2 w-fit"
                    >
                      <FaLink /> Participate Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
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
