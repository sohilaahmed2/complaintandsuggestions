"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const API_URL = "https://hana74.pythonanywhere.com";
export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    async function logoutUser() {
      try {
        await fetch(`${API_URL}/members/logout/`, {
          method: "POST",
          credentials: "include", // sends the session cookie
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        router.push("/login");
      }
    }
    logoutUser();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
        Logging out...
      </p>
    </div>
  );
}
