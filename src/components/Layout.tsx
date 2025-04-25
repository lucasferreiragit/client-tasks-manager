import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { Menu, X, Home, Plus } from "lucide-react";
import Tooltip from "./ui/Tooltip";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home", icon: Home },
    { path: "/new", label: "New Task", icon: Plus },
  ];

  return (
    <div className="h-screen flex flex-col bg-sky-100/70">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex items-center px-4 lg:px-0">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
            >
              <img
                src="/task-logo.png"
                alt="Task Manager Logo"
                className="h-6 w-6"
              />
              Task Manager
            </Link>
          </div>

          <div className="sm:flex sm:items-center sm:space-x-8 hidden">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={twMerge(
                    "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  )}
                >
                  <Tooltip
                    key={link.path}
                    id={`nav-${link.path}`}
                    content={link.label}
                    place="bottom"
                  >
                    <Icon className="h-5 w-5" />
                  </Tooltip>
                </Link>
              );
            })}
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none px-4"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div
          className={twMerge(
            "sm:hidden transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "h-[100px]" : "h-0"
          )}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={twMerge(
                    "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-auto">{children}</main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Task Manager - Lucas Ferreira
          </p>
        </div>
      </footer>
    </div>
  );
}
