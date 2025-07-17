import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await API.get(`/blog/get-blog/${id}`);
        if (res.data.success) {
          const { title, description, image } = res.data.blog;
          setForm({ title, description, image });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBlog();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/blog/update-blog/${id}`, form);
      if (res.data.success) {
        navigate(`/blog/${id}`);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update blog");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 shadow-lg rounded-2xl w-full max-w-2xl p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          ✏️ Edit Blog
        </h2>
        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              placeholder="Write blog content here..."
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>

          {/* Image Input */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300"
          >
            ✅ Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
