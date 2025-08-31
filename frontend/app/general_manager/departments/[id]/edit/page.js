"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
const API_URL = "https://hana74.pythonanywhere.com";
export default function EditDepartmentPage() {
  const router = useRouter();
  const params = useParams();
  const departmentId = params.id;

  const [department, setDepartment] = useState(null);

  useEffect(() => {
    // Fetch department details from backend
    const fetchDepartment = async () => {
      try {
        const res = await fetch(
          `${API_URL}/members/departments/`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch departments");
        const data = await res.json();
        const depts = data.departments.map((name, idx) => ({ id: idx + 1, name }));
        const dept = depts.find((d) => d.id.toString() === departmentId);
        setDepartment(dept);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchDepartment();
  }, [departmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/members/departments/${department.id}/edit/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: department.name }),
        credentials: "include"
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to update department");
        return;
      }

      alert("Department updated successfully");
      router.push("/general_manager/departments");
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  if (!department) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">✏️ Edit Department</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Department Name</label>
            <input
              type="text"
              value={department.name}
              onChange={(e) => setDepartment({ ...department, name: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
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