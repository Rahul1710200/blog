import React from 'react'
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <div>
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-xl font-bold">
            Blog
          </Link>
          <Link to="/create" className="hover:underline">
            Create Post
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar
