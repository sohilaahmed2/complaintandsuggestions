"use client";
import { useState, useEffect } from "react";

const API_URL = "https://hana74.pythonanywhere.com";

export default function AddUserPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    role: "DepartmentManager", // fixed role
    dept: "",
    password: "",
  });

  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch departments on page load
  useEffect(() => {
    fetch(`${API_URL}/members/departments/`)
      .then((res) => res.json())
      .then((data) => setDepartments(data.departments))
      .catch((err) => console.error("Failed to load departments:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/members/addUser/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error}`);
      } else {
        setMessage(`✅ ${data.message}`);
        setFormData({
          username: "",
          email: "",
          name: "",
          role: "DepartmentManager", // reset with default role
          dept: "",
          password: "",
        });
      }
    } catch (err) {
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg text-gray-900 dark:text-gray-200 transition-colors">
      <h2 className="text-xl font-semibold text-center mb-6">
        Add User
      </h2>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm"
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm"
          />
        </div>

        {/* Department */}
        <div>
          <label htmlFor="dept" className="block text-sm font-medium">
            Department
          </label>
          <select
            id="dept"
            value={formData.dept}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm"
          >
            <option value="">Select department</option>
            {departments.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 dark:bg-gray-600 text-white text-sm rounded-md hover:bg-gray-500 dark:hover:bg-gray-700"
            onClick={() =>
              setFormData({
                username: "",
                email: "",
                name: "",
                role: "DepartmentManager",
                dept: "",
                password: "",
              })
            }
          >
            Cancel
          </button>
        </div>
      </form>

      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.startsWith("✅") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
