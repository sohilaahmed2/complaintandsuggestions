"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
const API_URL = "https://hana74.pythonanywhere.com";
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    Name: "",
    GPA: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    const usernameRegex = /^[\w.@+-]{1,150}$/;
    if (!usernameRegex.test(username)) {
      return "Username must be 150 characters or fewer. Letters, digits and @/./+/-/_ only.";
    }

    const academicEmailRegex = /^[A-Za-z0-9._%+-]+@compit\.aun\.edu\.eg$/;
    if (!academicEmailRegex.test(email)) {
      return "Email must be an academic email (example@compit.aun.edu.eg).";
    }

    if (password.length < 8) {
      return "Password must contain at least 8 characters.";
    }
    if (/^\d+$/.test(password)) {
      return "Password cannot be entirely numeric.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    try {
      const response = await fetch(`${API_URL}/members/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          Name: formData.Name,
          GPA: formData.GPA,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Server response:", text);
        setError(text);
        return;
      }

      const data = await response.json();
      console.log("✅ Registration success:", data);
      router.push("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400">
          Student Register
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Create your student account
        </p>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          {/* Academic Email */}
          <input
            type="email"
            name="email"
            placeholder="Academic Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          {/* Name */}
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          {/* GPA */}
          <input
            type="number"
            step="0.01"
            name="GPA"
            placeholder="GPA"
            value={formData.GPA}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Register
          </button>
        </form>

        <div className="text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
