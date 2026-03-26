import { useState, useEffect } from "react";
import api from "../services/axios";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const inputClass =
  "w-full h-11 rounded-xl border border-gray-200 px-4 text-gray-700 placeholder:text-gray-400 leading-tight appearance-none focus:outline-none focus:ring-2 focus:ring-primary";

const AuthCard = () => {
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true); // default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ HANDLE ROUTE STATE SAFELY (IMPORTANT FIX)
  useEffect(() => {
    if (location.state?.mode === "signup") {
      setIsLogin(false);
    } else if (location.state?.mode === "login") {
      setIsLogin(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post("/api/auth/login", {
          email: form.email,
          password: form.password,
        });

        setUser(res.data.user);
      } else {
        if (form.password !== form.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        await api.post("/api/auth/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        // ✅ Switch to login after signup
        setIsLogin(true);

        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-md shadow-xl p-8">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isLogin
            ? "Log In to Continue Your Job Journey"
            : "Sign up to start your job journey"}
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-center text-sm text-red-500 mb-3">{error}</p>
      )}

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleSubmit}>

        {!isLogin && (
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className={inputClass}
              onChange={handleChange}
              value={form.name}
            />
          </div>
        )}

        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className={inputClass}
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className={inputClass}
            onChange={handleChange}
            value={form.password}
          />
        </div>

        {!isLogin && (
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className={inputClass}
              onChange={handleChange}
              value={form.confirmPassword}
            />
          </div>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-4 rounded-xl bg-linear-to-r from-indigo-500 to-blue-500 text-white font-medium shadow-md hover:opacity-90 transition"
        >
          {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
        </button>

      </form>

      {/* TOGGLE */}
      <p className="text-center text-sm text-gray-500 mt-6">
        {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-primary font-medium cursor-pointer"
        >
          {isLogin ? "Sign up" : "Log in"}
        </span>
      </p>

    </div>
  );
};

export default AuthCard;