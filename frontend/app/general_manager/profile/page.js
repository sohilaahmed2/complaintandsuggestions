"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
const API_URL = "https://hana74.pythonanywhere.com";
export default function GeneralManagerProfile() {
  const [general_manager, setGeneralManager] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`${API_URL}/members/general/profile/`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
          setGeneralManager(data.user);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudent();
  }, []);

  if (loading) {
    return <p className="text-center text-lg text-gray-800 dark:text-gray-200">Loading...</p>;
  }

  if (!general_manager) {
    return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-5xl transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${general_manager.name.replace(
              " ",
              "+"
            )}&size=128&background=ec4899&color=fff`}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-blue-500 dark:border-blue-400"
          />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Welcome, {general_manager.name} 👑
          </h2>
          <p className="text-gray-500 dark:text-gray-300">General Manager Dashboard</p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner transition-colors duration-300">
            <p className="text-sm text-gray-500 dark:text-gray-300">Full Name</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{general_manager.name}</p>
          </div>

          <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner transition-colors duration-300">
            <p className="text-sm text-gray-500 dark:text-gray-300">Email</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{general_manager.email}</p>
          </div>

          <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner transition-colors duration-300">
            <p className="text-sm text-gray-500 dark:text-gray-300">Username</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{general_manager.username}</p>
          </div>

          <div className="bg-blue-50 dark:bg-gray-700 p-6 rounded-2xl shadow-inner transition-colors duration-300">
            <p className="text-sm text-gray-500 dark:text-gray-300">Dashboard Info</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Manage departments & managers
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-4 items-center">
          <Link
            href="/general_manager/admin"
            className="px-8 py-4 text-lg font-semibold bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition w-full text-center"
          >
            ⚙ Go to Admin Interface
          </Link>

          <Link
            href="/general_manager/responses"
            className="px-8 py-4 text-lg font-semibold bg-blue-500 dark:bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-600 dark:hover:bg-blue-500 transition w-full text-center"
          >
            📑 View All Responses
          </Link>

          <Link
            href="/general_manager/complaints"
            className="px-8 py-4 text-lg font-semibold bg-blue-400 dark:bg-blue-500 text-white rounded-2xl shadow-lg hover:bg-blue-500 dark:hover:bg-blue-400 transition w-full text-center"
          >
            📝 View All Complaints
          </Link>
        </div>
      </div>
    </div>
  );
}
