"use client";
import { useRouter } from "next/navigation";

export default function ResetSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-96 text-center border border-gray-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-500 mb-4">
          Password Reset
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Your password has been successfully changed. <br />
          You can now log in.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
