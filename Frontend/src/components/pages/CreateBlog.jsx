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

  const [message, setMessage] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  const [userId, setUserId] = useState("");

  // ✅ Load user safely from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(userData);
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log(parsedUser);
        
        const id = parsedUser?._id || parsedUser?.id;

        if (id) {
          setUserId(id);
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("User JSON parse error:", err);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);
    

    const payload = {
      ...form,
      user:userId, // ✅ send string only
    };
    console.log(payload);
    
    try {
      const res = await API.post("/blog/create-blog", payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setForm({ title: "", description: "", image: "" });
      setMessage("✅ Blog created successfully");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000);
    } catch (err) { 
      console.error("Blog create error:", err);
      setMessage(err.response?.data?.message || "❌ Error creating blog");
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {showMsg && (
        <div className="mb-4 bg-green-700 text-white px-6 py-3 rounded-lg shadow-md">
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
