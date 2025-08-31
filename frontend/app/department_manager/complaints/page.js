"use client";
import { useState, useEffect } from "react";

const API_URL = "https://hana74.pythonanywhere.com";

export default function DepartmentComplaints() {
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints
  useEffect(() => {
    fetch(`${API_URL}/members/departmentComplaints/`, {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setComplaints(data);
        } catch (err) {
          console.error("❌ JSON parse error, response was:", text);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Send response
  const handleResponse = (id, response) => {
    fetch(`${API_URL}/members/departmentComplaints/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      credentials: "include",
      body: JSON.stringify({ complaint_id: id, response }),
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (data.success) {
            const updated = complaints.map((c) =>
              c.id === id ? { ...c, status: "Resolved", response } : c
            );
            setComplaints(updated);
          } else {
            alert(data.error || "Something went wrong");
          }
        } catch {
          console.error("❌ Backend returned non-JSON:", text);
        }
      });
  };

  // Helper to read cookies
  function getCookie(name) {
    if (typeof document === "undefined") return null;
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-8">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
          📂 Complaints & Suggestions for Your Department
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse rounded-2xl overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-blue-400 text-white dark:from-indigo-700 dark:to-indigo-500">
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Description</th>
                <th className="px-6 py-4 text-left">Created Date</th>
                <th className="px-6 py-4 text-left">Attachments</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4 font-medium dark:text-gray-200">{c.type}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      c.status === "In Review"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {c.status}
                  </td>
                  <td className="px-6 py-4 dark:text-gray-200">{c.title}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {c.createdDate}
                  </td>
                  <td className="px-6 py-4">
                    {c.attachments && c.attachments.length > 0 ? (
                      c.attachments.map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          className="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-800 dark:hover:text-indigo-300 block"
                        >
                          View File {i + 1}
                        </a>
                      ))
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">No File</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <textarea
                      value={c.response || ""}
                      onChange={(e) => {
                        const updated = complaints.map((x) =>
                          x.id === c.id ? { ...x, response: e.target.value } : x
                        );
                        setComplaints(updated);
                      }}
                      placeholder="Type your response..."
                      className="w-full p-2 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 mb-2"
                    />
                    <button
                      onClick={() => handleResponse(c.id, c.response)}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-500 transition"
                    >
                      Send Response
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
