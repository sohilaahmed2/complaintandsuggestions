"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, FileText, ShieldCheck, LogOut } from "lucide-react";

export default function DepartmentManagerLayout({ children }) {
  const pathname = usePathname();

  const links = [
    {
      href: "/department_manager/profile",
      label: "Profile",
      icon: <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      href: "/department_manager/complaints",
      label: "Complaints / Suggestions",
      icon: <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
    },
    { href: "/logout", label: "Logout", icon: <LogOut className="w-5 h-5 dark:text-gray-300" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-start items-center transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center mr-12">
          <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>

        {/* Links */}
        <div className="flex space-x-8 ml-auto mr-16">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 font-medium relative transition-colors duration-300 ${
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
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white dark:bg-gray-900 transition-colors duration-300">
        {children}
      </main>
    </div>
  );
}
