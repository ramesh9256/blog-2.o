import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axios";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [message, setMessage] = useState(null); // ✅ Success/Error message
  const [showMsg, setShowMsg] = useState(false); // ✅ Animation visibility control

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/blog/create-blog", { ...form, user: user?.id });
      setForm({ title: "", description: "", image: "" });

      // ✅ Show success message
      setMessage("✅ Blog created successfully");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000); // hide after 3 sec
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating blog");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* ✅ Message Box */}
      {showMsg && (
        <div className="mb-4 bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-500 ease-in-out animate-fade-in-out">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gray-900 p-8 shadow-md rounded-xl space-y-6 border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create New Blog</h2>

        <input
          type="text"
          placeholder="Blog Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          placeholder="Blog Description"
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
