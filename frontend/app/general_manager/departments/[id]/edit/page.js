"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const API_URL = "https://hana74.pythonanywhere.com";

export default function EditDepartmentPage() {
  const router = useRouter();
  const params = useParams();
  const departmentId = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch department by ID
  useEffect(() => {
    if (!departmentId) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/members/departments/`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();

        // Now departments has objects: {id, name}
        const dept = data.departments.find(
          (d) => d.id.toString() === departmentId
        );
        setDepartment(dept || null);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [departmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!department) return;

    try {
      const res = await fetch(
        `${API_URL}/members/departments/${department.id}/edit/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name: department.name.trim() }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to update department");
        return;
      }

      alert("Department updated successfully");
      router.push("/general_manager/departments");
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!department)
    return <p className="text-center mt-10">Department not found</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center">
          ✏️ Edit Department
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
              Department Name
            </label>
            <input
              type="text"
              value={department.name}
              onChange={(e) =>
                setDepartment({ ...department, name: e.target.value })
              }
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
