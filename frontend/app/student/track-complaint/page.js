"use client";
import { useState } from "react";
const API_URL = "https://hana74.pythonanywhere.com";
export default function TrackComplaintPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${API_URL}/members/track/?tracking_code=${trackingCode}`,
        { credentials: "include" }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setComplaint(null);
      } else {
        setComplaint(data);
        setError("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setComplaint(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-4xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400">
          Track Your Complaint
        </h2>

        <form onSubmit={handleTrack} className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter your Tracking Code"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="flex-1 border-2 border-indigo-200 dark:border-indigo-700 rounded-xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Track
          </button>
        </form>

        {error && (
          <div className="text-red-600 dark:text-red-400 font-semibold text-center">
            {error}
          </div>
        )}

        {complaint && (
          <div className="mt-6 space-y-6">
            {/* Complaint Details Card */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
                Complaint Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-200">{complaint.status}</p>
                </div>
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-200">{complaint.type}</p>
                </div>
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner col-span-1 md:col-span-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-200">{complaint.title}</p>
                </div>
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner col-span-1 md:col-span-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</p>
                  <p className="mt-1 text-gray-900 dark:text-gray-200">{complaint.description}</p>
                </div>
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Created</p>
                  <p className="mt-1 text-gray-900 dark:text-gray-200">{complaint.created}</p>
                </div>
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tracking Code</p>
                  <p className="mt-1 text-gray-900 dark:text-gray-200">{complaint.trackingCode}</p>
                </div>
              </div>
            </div>

            {/* Responses Card */}
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">Responses</h3>
              {complaint.responses.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300">No responses yet.</p>
              ) : (
                <div className="space-y-4">
                  {complaint.responses.map((res, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl shadow-inner">
                      <p className="text-gray-900 dark:text-gray-200">{res.message}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <strong>Date:</strong> {res.date}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
