"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const API_URL = "https://hana74.pythonanywhere.com";
export default function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    setError("");

    try {
      const response = await fetch(`${API_URL}/members/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // keep session cookie
      });

      const resData = await response.json();
      console.log("Response data:", resData);

      if (!response.ok || !resData.success) {
        setError(resData.message || "Login failed");
        return;
      }

      console.log("✅ Login success:", resData);

      // Redirect based on backend role
      router.push(resData.user.redirect);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Student Complaints System
        </h2>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Forgot password link */}
          <div className="text-right">
            <Link
              href="/forgot_password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-500 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
