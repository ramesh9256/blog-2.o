import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../utils/axios";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/user/register", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-[#1f1f1f] shadow-2xl rounded-xl px-10 py-8 w-full max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create Account</h2>

        <div className="mb-4">
          <label className="block mb-1 text-gray-300 font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg bg-[#2b2b2b] text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-300 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg bg-[#2b2b2b] text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-gray-300 font-medium">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-2 border rounded-lg bg-[#2b2b2b] text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
