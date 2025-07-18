import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/axios";
import { useUser } from "../context/Usercontext"; 

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const {setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("inLogin test");
      
      const res = await API.post("/user/login", {email , password});
      setMessage({ type: "success", text: res.data.message });

      // Save user and redirect after small delay
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user)
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="bg-zinc-900 p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-md transition duration-300">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back 👋
        </h2>

        {/* Smooth Message Box */}
        {message.text && (
          <div
            className={`text-sm font-medium px-4 py-2 rounded mb-4 transition-all duration-500 ${
              message.type === "success"
                ? "bg-green-700 text-white"
                : "bg-red-700 text-white"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-white underline hover:text-gray-300"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
