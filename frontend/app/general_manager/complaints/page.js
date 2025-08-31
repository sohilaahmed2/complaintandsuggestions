"use client";
import { useEffect, useState } from "react";
const API_URL = "https://hana74.pythonanywhere.com";
export default function AllComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/members/allComplaints/`, {
        method: "GET",
        credentials: "include",
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Failed to fetch");

      const complaintsData = data.complaints || [];
      const departmentsData = data.departments || [];

      setComplaints(complaintsData);
      setDepartments(departmentsData);

      const preSelected = {};
      complaintsData.forEach((c) => {
        if (c.Department) {
          const match = departmentsData.find(
            (d) => String(d.DepartmentName) === String(c.Department)
          );
          if (match) preSelected[c.ComplaintId] = match.DepartmentId;
        }
      });
      setSelectedDept(preSelected);
    } catch (err) {
      console.error("fetchData error:", err);
      alert("Failed to load complaints: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (complaintId) => {
    const deptId = selectedDept[complaintId];
    if (!deptId) return alert("Select a department first");

    try {
      const res = await fetch(`${API_URL}/members/allComplaints/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ComplaintId: complaintId,
          DepartmentId: Number(deptId),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const deptName =
          departments.find((d) => String(d.DepartmentId) === String(deptId))
            ?.DepartmentName || null;

        setComplaints((prev) =>
          prev.map((c) =>
            c.ComplaintId === complaintId
              ? { ...c, Status: "In Review", Department: deptName }
              : c
          )
        );
        alert(data.message || "Assigned successfully");
      } else {
        throw new Error(data.error || data.message || "Assign failed");
      }
    } catch (err) {
      console.error("assign error:", err);
      alert("Assign failed: " + err.message);
    }
  };

  if (loading)
    return (
      <div className="p-8 text-gray-800 dark:text-gray-200 text-lg font-medium">
        Loading complaints...
      </div>
    );

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-400">
        All Complaints
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          <thead className="bg-blue-600 text-white dark:bg-blue-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm md:text-base">Title</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Description</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Attachment</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Status</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Department</th>
              <th className="px-6 py-3 text-left text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
            {complaints.map((c) => (
              <tr
                key={c.ComplaintId}
                className="hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-medium">{c.Title}</td>

                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.Description || "-"}</td>

                <td className="px-6 py-4">
                  {c.Attachments && c.Attachments.length > 0 ? (
                    c.Attachments.map((file, idx) => (
                      <a
                        key={idx}
                        href={file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline block"
                      >
                        View {idx + 1}
                      </a>
                    ))
                  ) : (
                    <span className="text-gray-400">No file</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      c.Status === "In Review"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : c.Status === "Resolved"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {c.Status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-800 dark:text-gray-200">
                  {c.Department || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-2">
                    <select
                      value={selectedDept[c.ComplaintId] || ""}
                      onChange={(e) =>
                        setSelectedDept({
                          ...selectedDept,
                          [c.ComplaintId]: e.target.value,
                        })
                      }
                      className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 text-sm md:text-base"
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map((d) => (
                        <option key={d.DepartmentId} value={d.DepartmentId}>
                          {d.DepartmentName}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleAssign(c.ComplaintId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm md:text-base transition"
                    >
                      {c.Department ? "Reassign" : "Assign"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {complaints.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500 dark:text-gray-400 text-base"
                >
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
