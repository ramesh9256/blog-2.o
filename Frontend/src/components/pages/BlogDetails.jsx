import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../utils/axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const getBlog = async () => {
    try {
      const res = await API.get(`/blog/get-blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);
      } else {
        alert("Failed to fetch blog");
      }
    } catch (error) {
      console.log(error);
      alert("Error fetching blog");
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      {blog ? (
        <div className="max-w-3xl mx-auto shadow-lg rounded-xl overflow-hidden">
          <div className="relative">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center px-4">
                {blog.title}
              </h1>
            </div>
          </div>

          <div className="p-6 bg-gray-900">
            <p className="text-md md:text-lg leading-relaxed text-gray-300 whitespace-pre-line">
              {blog.description}
            </p>
            <div className="mt-6 text-sm text-gray-500 flex justify-end">
              — Posted by: <span className="ml-1 font-medium">{blog?.user?.username || "Unknown"}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400">Loading blog...</div>
      )}
    </div>
  );
};

export default BlogDetails;
