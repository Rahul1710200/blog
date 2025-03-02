import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PostDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); // For navigation
  const [post, setPost] = useState(null);

  // Fetch the post data when the component mounts
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/post/getPost/${id}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  // Show a loading state while the post is being fetched
  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <button
          onClick={() => navigate("/")} 
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 mb-8"
        >
          Go to Blog List
        </button>

        {/* Post Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold text-gray-900"
        >
          {post.title}
        </motion.h1>

        {/* Author */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 mt-2"
        >
          By {post.author}
        </motion.p>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-gray-800 leading-relaxed"
        >
          {post.article}
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Category */}
        {post.category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-gray-900">Category</h2>
            <p className="mt-2 text-gray-800">{post.category}</p>
          </motion.div>
        )}

        {/* Published Date */}
        {post.publishedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-8"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Published Date
            </h2>
            <p className="mt-2 text-gray-800">
              {new Date(post.publishedDate).toLocaleDateString()}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PostDetails;
