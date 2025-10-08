import { useState } from "react";
import {
  Sun,
  Moon,
  Upload,
  X,
  Home,
  Folder,
  Clock,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SideBar = ({
  isDarkMode,
  toggleTheme,
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  logout,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (state: boolean) => void;
  activeTab: string;
  setActiveTab: (state: string) => void;
  logout: () => void;
}) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    logout();
    navigate('/')
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-50 w-64 border-r flex flex-col transition-transform duration-300 ${
          isDarkMode
            ? "bg-neutral-900 border-neutral-800"
            : "bg-white border-gray-200"
        } ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div
          className={`p-6 border-b flex items-center justify-between ${
            isDarkMode ? "border-neutral-800" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-md ${
                isDarkMode ? "bg-white" : "bg-black"
              }`}
            >
              <Upload
                className={`w-5 h-5 ${
                  isDarkMode ? "text-black" : "text-white"
                }`}
              />
            </div>
            <span
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              FileUploader
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden p-1 rounded transition-colors ${
              isDarkMode
                ? "hover:bg-neutral-800 text-gray-400"
                : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveTab("upload");
                setSidebarOpen(false);
                navigate("/main");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "upload"
                  ? isDarkMode
                    ? "bg-neutral-800 text-white"
                    : "bg-gray-100 text-gray-900"
                  : isDarkMode
                  ? "text-gray-400 hover:bg-neutral-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Home className="w-4 h-4" />
              Upload Files
            </button>

            <button
              onClick={() => {
                setActiveTab("files");
                setSidebarOpen(false);
                navigate("/main/myfiles");
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "files"
                  ? isDarkMode
                    ? "bg-neutral-800 text-white"
                    : "bg-gray-100 text-gray-900"
                  : isDarkMode
                  ? "text-gray-400 hover:bg-neutral-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Folder className="w-4 h-4" />
              My Files
            </button>

            {/* <button
              onClick={() => {
                setActiveTab("recent");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "recent"
                  ? isDarkMode
                    ? "bg-neutral-800 text-white"
                    : "bg-gray-100 text-gray-900"
                  : isDarkMode
                  ? "text-gray-400 hover:bg-neutral-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Clock className="w-4 h-4" />
              Recent
            </button> */}

            <button
              onClick={() => {
                setActiveTab("settings");
                setSidebarOpen(false);
                navigate('/main/settings')
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "settings"
                  ? isDarkMode
                    ? "bg-neutral-800 text-white"
                    : "bg-gray-100 text-gray-900"
                  : isDarkMode
                  ? "text-gray-400 hover:bg-neutral-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </nav>

        {/* Bottom Section */}
        <div
          className={`p-4 border-t space-y-2 ${
            isDarkMode ? "border-neutral-800" : "border-gray-200"
          }`}
        >
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:bg-neutral-800 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={handleSignOut}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:bg-neutral-800 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};
