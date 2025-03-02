import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EditPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // For navigation after submission
  const [post, setPost] = useState({
    title: "",
    article: "",
    author: "",
    tags: [],
    category: "", // Changed to a single string
    publishedDate: "",
  });

  // Hardcoded categories
  const categories = [
    "Tech",
    "Lifestyle",
    "Health",
    "Business",
    "Education",
    "Entertainment",
    "Science",
  ];

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/post/getPost/${id}`
        );
        const postData = response.data;
        // Ensure the date is in the correct format for the input field
        postData.publishedDate = new Date(postData.publishedDate)
          .toISOString()
          .split("T")[0];
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/post/update/${id}`,
        post
      );
      navigate(`/posts/${id}`); // Redirect to the post details page
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-4"
    >
      <div className=" ml-[84vw] mb-[2vw]">
        <button
          onClick={() => navigate("/")} // Navigate back to the blog list
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center gap-2"
        >
          <span>Go to Blog List</span>
        </button>
      </div>
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Article Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Article
            </label>
            <textarea
              name="article"
              value={post.article}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              required
            />
          </div>

          {/* Author Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={post.author}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Tags Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={post.tags.join(", ")}
              onChange={(e) =>
                setPost({ ...post, tags: e.target.value.split(", ") })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tags separated by commas"
            />
          </div>

          {/* Category Field (Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={post.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Published Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Published Date
            </label>
            <input
              type="date"
              name="publishedDate"
              value={post.publishedDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Update Post
            </button>
          </div>
        </form>

        {/* Stylish "Go Back to Blog List" Button */}
      </div>
    </motion.div>
  );
};

export default EditPost;
