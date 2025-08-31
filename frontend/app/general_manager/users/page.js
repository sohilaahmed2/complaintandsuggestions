"use client";
import { useEffect, useState } from "react";

const API_URL = "https://hana74.pythonanywhere.com";

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/members/users/`, {
        credentials: "include", // ✅ send session cookies
      });

      console.log("Fetch status:", res.status, res.statusText);

      if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
      const data = await res.json();
      console.log("API data:", data);

      // ✅ Adjust key depending on your backend response
      const filteredUsers = data.users.filter((u) => u.role !== "GeneralManager");
      setUsers(filteredUsers);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/members/deleteUser/${userId}/`, {
        method: "DELETE",
        credentials: "include", // ✅ send session cookies
      });

      if (res.ok) {
        // Option 1: remove locally
        setUsers((prev) => prev.filter((u) => u.UserId !== userId && u.id !== userId));

        // Option 2 (safer): re-fetch all users
        // await fetchUsers();
      } else {
        let errorMsg = "Unknown error";
        try {
          const data = await res.json();
          errorMsg = data.error || errorMsg;
        } catch {
          errorMsg = await res.text();
        }
        alert("Error deleting user: " + errorMsg);
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500 dark:text-gray-300">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500 dark:text-red-400">{error}</p>;

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 border-b pb-3">
          Users
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-blue-700 dark:bg-blue-900 text-left text-white">
                <th className="py-3 px-4 font-medium">ID</th>
                <th className="py-3 px-4 font-medium">Username</th>
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Role</th>
                <th className="py-3 px-4 font-medium">GPA</th>
                <th className="py-3 px-4 font-medium">Department</th>
                <th className="py-3 px-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr
                  key={u.UserId || u.id}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-600 transition`}
                >
                  <td className="py-3 px-4 text-blue-800 dark:text-blue-400">
                    {u.UserId || u.id}
                  </td>
                  <td className="py-3 px-4 text-blue-800 dark:text-blue-400">
                    {u.username}
                  </td>
                  <td className="py-3 px-4 text-blue-800 dark:text-blue-400">
                    {u.name}
                  </td>
                  <td className="py-3 px-4 text-blue-800 dark:text-blue-400">
                    {u.email}
                  </td>
                  <td className="py-3 px-4 text-blue-800 dark:text-blue-400">
                    {u.role}
                  </td>
                  <td className="py-3 px-4 text-blue-800 dark:text-blue-400">
                    {u.gpa}
                  </td>
                  <td className="py-3 px-4 text-blue-800 dark:text-blue-400">
                    {u.department || "-"}
                  </td>
                  <td className="py-3 px-4 flex gap-3 justify-center">
                    <button
                      onClick={() => handleDelete(u.UserId || u.id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
