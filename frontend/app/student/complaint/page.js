"use client";
import { useState } from "react";
const API_URL = "https://hana74.pythonanywhere.com";
export default function ComplaintPage() {
  const [data, setData] = useState({
    type: "Complaint",
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setData({ ...data, file: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting complaint...");

    const formData = new FormData();
    formData.append("type", data.type);
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.file) {
      formData.append("file", data.file);
    }

    
    const res = await fetch(`${API_URL}/members/submit/`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const result = await res.json();

    if (result.success) {
      window.location.href = "/student/success";
    } else {
      alert(result.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-white dark:from-gray-900 dark:to-gray-800 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-3xl space-y-8 transition-colors duration-300">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-2">
            Submit Your Complaint / Suggestion
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please fill in the form below to send your message to the management.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Type
            </label>
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              className="w-full border-2 border-indigo-200 dark:border-indigo-600 rounded-xl px-4 py-3 bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            >
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter title..."
              value={data.title}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 dark:border-blue-600 rounded-xl px-4 py-3 bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write your complaint or suggestion..."
              value={data.description}
              onChange={handleChange}
              className="w-full border-2 border-indigo-200 dark:border-indigo-600 rounded-xl px-4 py-3 bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              rows="6"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Upload File / Image
            </label>
            <input
              type="file"
              name="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-400 dark:from-indigo-600 dark:via-blue-600 dark:to-blue-500 text-white rounded-2xl shadow-lg hover:scale-105 transform transition"
            >
              🚀 Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
