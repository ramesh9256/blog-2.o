import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 pt-10 pb-6 mt-0">
      <div className="max-w-5xl mx-auto px-4 text-center">
        {/* Title & Description */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-blue-500">Blog.io</h2>
          <p className="text-sm mt-2 text-gray-400">
            Discover stories, ideas, and voices from across the globe.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          <Link to="/" className="hover:text-white transition duration-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-white transition duration-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-white transition duration-300">
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="#" aria-label="GitHub" className="hover:text-white">
            <i className="fab fa-github text-xl"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-white">
            <i className="fab fa-twitter text-xl"></i>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white">
            <i className="fab fa-linkedin text-xl"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-blue-400">Blog.io</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
