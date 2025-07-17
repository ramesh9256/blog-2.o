  import { Link, useNavigate } from "react-router-dom";
  import { useEffect, useState } from "react";
  import { LogOut, PlusCircle, UserCircle, LogIn, UserPlus } from "lucide-react";
  import API from "../utils/axios";
  import { useUser } from "../components/context/Usercontext"; 

  const Navbar = () => {
    const navigate = useNavigate();
    const {user, setUser}= useUser();

    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    };

    useEffect(() => {
      fetchUser();
    }, []);

    const handleLogout = async () => {
      try {
        await API.get("/user/logout");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <nav className="bg-[#0f0f0f] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <Link to="/" className="text-2xl font-bold text-blue-500 flex items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSaZrvWoxoMLLIGNANqQaa_3W2tU82phWrdw&s"
            alt="Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:block">Blog.io</span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/create"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
              >
                <PlusCircle size={18} />
                <span className="hidden sm:block">Create</span>
              </Link>

              <Link
                to="/my-blogs"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-200"
              >
                <UserCircle size={18} />
                <span className="hidden sm:block">My Blogs</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
              >
                <LogOut size={18} />
                <span className="hidden sm:block">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-200"
              >
                <LogIn size={18} />
                <span className="hidden sm:block">Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-200"
              >
                <UserPlus size={18} />
                <span className="hidden sm:block">Register</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    );
  };

  export default Navbar;
