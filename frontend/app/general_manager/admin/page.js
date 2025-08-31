"use client";
import { useRouter } from "next/navigation";

export default function GeneralManagerProfile() {
  const router = useRouter();

  const handleViewUsers = () => {
    router.push("/general_manager/users");
  };

  const handleAddUser = () => {
    router.push("/general_manager/user/addUser");
  };

  const handleViewDepartments = () => {
    router.push("/general_manager/departments");
  };

  const handleAddDepartment = () => {
    router.push("/general_manager/department/adddepartment");
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      {/* Users Management Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-6 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="flex gap-4">
          <button
            onClick={handleViewUsers}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            View Users
          </button>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Departments Management Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 mb-6 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
        <h2 className="text-xl font-semibold mb-4">Departments</h2>
        <div className="flex gap-4">
          <button
            onClick={handleViewDepartments}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
          >
            View Departments
          </button>
          <button
            onClick={handleAddDepartment}
            className="px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Add Department
          </button>
        </div>
      </div>
    </div>
  );
}
