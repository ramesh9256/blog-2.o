import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, PlusCircle, NotebookPen } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-black px-4 py-12">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-blue-500">Blog.io</span>
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Share your thoughts, inspire others, and explore a world of ideas. <br />
          A simple platform to read, write, and grow.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {user ? (
            <>
              <Link
                to="/create"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
              >
                <PlusCircle size={18} />
                <span>Create Blog</span>
              </Link>
              <Link
                to="/my-blogs"
                className="flex items-center gap-2 px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-200"
              >
                <NotebookPen size={18} />
                <span>My Blogs</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-200"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
