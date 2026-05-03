import { useEffect, useState } from "react";
import api from "../services/axios";
import { useAuth } from "../context/useAuth";
import { useLocation } from "react-router-dom";
import { PrimaryButton } from "./ui/Buttons";
import { inputClass, labelClass } from "../utils/uiClasses";

const AuthCard = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-lg">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {isLogin
            ? "Log in to continue your job journey"
            : "Sign up to start your job journey"}
        </p>
      </div>

      {error && (
        <p className="mb-3 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-500">
          {error}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label className={labelClass}>Full Name</label>
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
          <label className={labelClass}>Email Address</label>
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
          <label className={labelClass}>Password</label>
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
            <label className={labelClass}>Confirm Password</label>
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

        <PrimaryButton type="submit" disabled={loading} className="mt-4 w-full">
          {loading ? "Please wait..." : isLogin ? "Log In" : "Sign Up"}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="font-medium text-purple-600"
        >
          {isLogin ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
};

export default AuthCard;
