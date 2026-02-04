import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import apiClient from '../utils/api';
import { FaHeart, FaComment, FaBookmark, FaPlus } from 'react-icons/fa';

export default function Timeline() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }

    fetchPosts();
  }, [user, loading]);

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/timeline');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading2(true);
    try {
      await apiClient.post('/timeline', {
        content: newPost,
        post_type: 'text',
      });
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading2(false);
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-teal-600">Timeline</h1>

          {/* Create Post Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex gap-4 mb-4">
              <img
                src="https://via.placeholder.com/40"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind? Share your knowledge, ask questions, or post updates..."
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-teal-600 hover:bg-teal-50 p-2 rounded">
                <FaPlus />
              </button>
              <button
                onClick={handleCreatePost}
                disabled={loading2 || !newPost.trim()}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50"
              >
                {loading2 ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600">No posts yet. Be the first to share!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <div className="flex gap-4 mb-4">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-bold">{post.name}</p>
                    <p className="text-sm text-gray-500">{post.university} • Just now</p>
                  </div>
                </div>

                <p className="mb-4">{post.content}</p>

                <div className="flex gap-4 pt-4 border-t">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600">
                    <FaHeart /> {post.likes_count}
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600">
                    <FaComment /> {post.comments_count}
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600">
                    <FaBookmark />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
