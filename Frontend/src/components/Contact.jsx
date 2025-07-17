import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");
                                                                                                  // http://localhost:5000/api/contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://blog-app-hwv2.onrender.com/api/contact", form);
      setMsg(res.data.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setMsg("Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-12 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Contact Us</h1>

        {msg && <p className="text-center mb-4 text-green-400">{msg}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your Name"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700"
            required
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700"
            required
          />
          <textarea
            rows="5"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Your message..."
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
