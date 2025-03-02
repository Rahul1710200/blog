import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreatePost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    article: "",
    author: "",
    tags: [],
    category: "", 
    publishedDate: "",
  });
  const [errors, setErrors] = useState({}); 
  const [isLoading, setIsLoading] = useState(false); 

  const categories = ["Tech", "Lifestyle", "Health", "Business","Education","Entertanment","Science"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
  };

  const validateForm = () => {
    const newErrors = {};
    if (!post.title.trim()) newErrors.title = "Title is required";
    if (!post.article.trim()) newErrors.article = "Article is required";
    if (!post.author.trim()) newErrors.author = "Author is required";
    if (post.tags.length === 0) newErrors.tags = "Tags are required"; 
    if (!post.publishedDate)
      newErrors.publishedDate = "Published date is required";
    if (!post.category) newErrors.category = "Category is required"; 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    setIsLoading(true); 
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/post/create`,
        post
      );
      console.log("resss", response);
      navigate(`/`); 
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <div className="flex justify-end w-full">
        <button
          onClick={() => navigate("/")} 
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Go to Blog List
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter post title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Article
          </label>
          <textarea
            name="article"
            value={post.article}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.article ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="6"
            placeholder="Write your article here..."
          />
          {errors.article && (
            <p className="text-red-500 text-sm mt-1">{errors.article}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.author ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter author name"
          />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={post.tags.join(", ")}
            onChange={(e) => {
              const value = e.target.value;
              setPost({ ...post, tags: value ? value.split(", ") : [] });

              if (errors.tags) {
                setErrors({ ...errors, tags: "" });
              }
            }}
            className={`w-full p-3 border ${
              errors.tags ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter tags separated by commas (e.g., tech, lifestyle)"
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={post.category}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required 
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Published Date
          </label>
          <input
            type="date"
            name="publishedDate"
            value={post.publishedDate}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.publishedDate ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.publishedDate && (
            <p className="text-red-500 text-sm mt-1">{errors.publishedDate}</p>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 relative"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
                <span className="ml-2">Creating...</span>
              </div>
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePost;
