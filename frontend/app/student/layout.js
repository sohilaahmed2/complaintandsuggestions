"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShieldCheck, LogOut, ListChecks } from "lucide-react"; // Added ListChecks for track complaints

export default function DepartmentManagerLayout({ children }) {
  const pathname = usePathname();

  // Navigation links (except logout)
  const navLinks = [
    {
      href: "/student/profile",
      label: "Profile",
      icon: <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      href: "/student/complaint",
      label: "Complaints / Suggestions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-700 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      href: "/student/track-complaint",
      label: "Track Complaints / Suggestions",
      icon: (
        <ListChecks className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Center Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 font-medium relative transition ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout (Right) */}
        <Link
          href="/logout"
          className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300 hover:text-red-500 transition"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white dark:bg-gray-900">{children}</main>
    </div>
  );
}
