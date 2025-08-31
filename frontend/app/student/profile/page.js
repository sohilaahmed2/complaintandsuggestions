"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
const API_URL = "https://hana74.pythonanywhere.com";
export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const res = await fetch(`${API_URL}/members/student/profile/`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (data.success) {
          setStudent(data.user);
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

  // 👇 Inject chatbot once student is loaded
  useEffect(() => {
    if (student) {
      (function (d, m) {
        var kommunicateSettings = {
          appId: "2ef0af9bb0bddc92901af4102c4f2045d",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
          userId: student.email.toLowerCase(),
          userName: student.name,
          authenticationTypeId: 1,
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }, [student]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!student) {
    return <p className="text-center text-red-500">Unauthorized. Please log in.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <img
            src={`https://ui-avatars.com/api/?name=${student.name}&size=128&background=4f46e5&color=fff`}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full shadow-lg border-4 border-indigo-500"
          />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome, {student.name} 🎓
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Student Profile</p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {student.name}
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 break-words">
              {student.email}
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">GPA</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {student.gpa ?? "N/A"}
            </p>
          </div>
          <div className="bg-indigo-50 dark:bg-gray-800 p-6 rounded-2xl shadow-inner">
            <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {student.username}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-4 items-center">
          <Link
            href="/student/complaint"
            className="px-8 py-4 text-lg font-semibold bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition w-full text-center"
          >
            ✍️ Write Complaint / Suggestion
          </Link>

          <Link
            href="/student/track-complaint"
            className="px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition w-full text-center"
          >
            📌 Track Your Complaint
          </Link>
        </div>
      </div>
    </div>
  );
}
