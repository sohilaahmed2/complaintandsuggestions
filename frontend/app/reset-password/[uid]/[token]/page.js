"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
const API_URL = "https://hana74.pythonanywhere.com";
export default function ResetPasswordPage() {
  const params = useParams();
  const uid = params.uid;
  const token = params.token;

  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(
      `${API_URL}/members/password-reset-confirm/${uid}/${token}/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include"
      }
    );

    const data = await res.json();
    setMessage(data.message);

    if (data.success) setTimeout(() => router.push("/reset-success"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 shadow-lg rounded-2xl w-96 border border-gray-300 dark:border-gray-700 transition-colors duration-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300"
        />
        <button className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg font-semibold">
          Reset Password
        </button>
        {message && (
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
            {message}
          </p>
        )}

        {/* "Go to Login" button */}
        <p className="mt-4 text-center text-sm">
          Remembered your password?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Go to Login
          </button>
        </p>
      </form>
    </div>
  );
}
