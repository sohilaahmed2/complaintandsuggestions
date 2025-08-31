// app/general_manager/responses/page.jsx
"use client";
import { useEffect, useState } from "react";
const API_URL = "https://hana74.pythonanywhere.com";
export default function ResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/members/general_manager_responses/`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch responses");

      setResponses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchData error:", err);
      alert("Failed to load responses: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggle = async (id, currentVisible) => {
    try {
      const res = await fetch(
        `${API_URL}/members/general_manager_responses/${id}/publish/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ visible: !currentVisible }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update visibility");

      setResponses((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, visible: !currentVisible } : r
        )
      );
    } catch (err) {
      console.error("toggle error:", err);
      alert("Failed to update: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="p-6 text-gray-800 dark:text-gray-200 font-medium">
        Loading responses...
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400">
        Responses
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead className="bg-blue-600 text-white dark:bg-blue-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm md:text-base">Complaint</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Message</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Department</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Date</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Visible</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {responses.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">
                  {r.complaintTitle}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                  {r.responseMessage}
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                  {r.senderDepartment}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {r.responseDate}
                </td>
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                  {r.visible ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggle(r.id, r.visible)}
                    className={`px-4 py-2 rounded text-white text-sm md:text-base font-medium transition ${
                      r.visible ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {r.visible ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
            ))}

            {responses.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 dark:text-gray-400 text-base">
                  No responses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
