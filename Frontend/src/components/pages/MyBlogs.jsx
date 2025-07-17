import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/axios";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // ✅ user from localStorage

  const getUserBlogs = async () => {
    try {
      const res = await API.get(`/blog/user-blog/${user?.id || user?._id}`);
      if (res.data.success) {
        setBlogs(res.data.userBlog);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching user blogs");
    }
  };

  const deleteBlog = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete?");
      if (!confirmDelete) return;

      const res = await API.delete(`/blog/delete-blog/${id}`);
      if (res.data.success) {
        getUserBlogs();
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting blog");
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">My Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-gray-900 text-white shadow-md rounded-lg overflow-hidden transition hover:shadow-xl"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
              <p className="text-gray-300 text-sm mb-4">
                {blog.description.substring(0, 100)}...
              </p>
              <div className="flex gap-3">
                <Link
                  to={`/edit-blog/${blog._id}`}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"

                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="flex items-center gap-2 px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-200"

                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
