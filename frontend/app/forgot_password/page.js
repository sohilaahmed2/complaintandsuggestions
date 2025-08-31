// app/forgot-password/page.jsx
"use client";
import { useState } from "react";

const API_URL = "https://hana74.pythonanywhere.com";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/members/password-reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        setMessage(data.message || "Password reset link has been sent to your email.");
      } else {
        setError(data.error || `Error: ${res.status} ${res.statusText}`);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        className="bg-white dark:bg-gray-800 p-6 shadow rounded w-96 transition-colors duration-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Forgot Password
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 rounded transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm text-red-500 dark:text-red-400">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
