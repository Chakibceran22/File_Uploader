import React, { useState } from "react";
import {
  Upload,
  Folder,
  Settings,
  LogOut,
  Moon,
  Sun,
  X,
  Menu,
  Home,
  Clock,
  User,
  Bell,
  Lock,
  Trash2,
  HardDrive,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useTheme from "../hooks/useTheme";
import AuthToaster from "../components/AuthToaster";
import { SideBar } from "../components/SideBar";
import { useAuth } from "../hooks/useAuth";
import { MobileMainHeader } from "../components/MobileMainHeader";
const SettingsPage: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    uploadComplete: true,
    storageWarnings: false,
  });

  return (
    <div
      className={`min-h-screen flex transition-colors duration-200 ${
        isDarkMode ? "bg-neutral-950" : "bg-gray-50"
      }`}
    >
      <AuthToaster isDarkMode={isDarkMode} />

      {/* Mobile Overlay */}
      <SideBar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logout={logout}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        {/* Mobile Header */}
        <MobileMainHeader
          isDarkMode={isDarkMode}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1
              className={`text-2xl sm:text-3xl font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Settings
            </h1>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Account Settings */}
            <div
              className={`rounded-lg border p-6 ${
                isDarkMode
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <User
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Account Information
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className={`w-full rounded-md py-2.5 px-3 text-sm transition-colors ${
                      isDarkMode
                        ? "bg-neutral-800 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500"
                        : "bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                    } border focus:outline-none focus:ring-1`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className={`w-full rounded-md py-2.5 px-3 text-sm transition-colors ${
                      isDarkMode
                        ? "bg-neutral-800 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500"
                        : "bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                    } border focus:outline-none focus:ring-1`}
                  />
                </div>

                <button
                  onClick={() => toast.success("Account information updated")}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Password Settings */}
            <div
              className={`rounded-lg border p-6 ${
                isDarkMode
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Change Password
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      className={`w-full rounded-md py-2.5 px-3 pr-11 text-sm transition-colors ${
                        isDarkMode
                          ? "bg-neutral-800 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500"
                          : "bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                      } border focus:outline-none focus:ring-1`}
                    />
                    <button
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className={`w-full rounded-md py-2.5 px-3 pr-11 text-sm transition-colors ${
                        isDarkMode
                          ? "bg-neutral-800 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500"
                          : "bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                      } border focus:outline-none focus:ring-1`}
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => toast.success("Password updated successfully")}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Storage Settings */}
            <div
              className={`rounded-lg border p-6 ${
                isDarkMode
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <HardDrive
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Storage
                </h2>
              </div>

              <div className="space-y-4">
                <div
                  className={`p-4 rounded-md ${
                    isDarkMode ? "bg-neutral-800" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      3.2 GB of 10 GB used
                    </span>
                    <span
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      32%
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${
                      isDarkMode ? "bg-neutral-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-full ${
                        isDarkMode ? "bg-white" : "bg-black"
                      }`}
                      style={{ width: "32%" }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => toast.success("Storage info updated")}
                  className={`px-4 py-2 rounded-md font-medium text-sm border transition-colors ${
                    isDarkMode
                      ? "border-neutral-700 text-gray-300 hover:bg-neutral-800"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Manage Storage
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div
              className={`rounded-lg border p-6 ${
                isDarkMode
                  ? "bg-neutral-900 border-neutral-800"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Bell
                  className={`w-5 h-5 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                />
                <h2
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Notifications
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    label: "Email notifications",
                    desc: "Receive email updates about your account",
                  },
                  {
                    key: "uploadComplete",
                    label: "Upload complete",
                    desc: "Notify when file uploads are finished",
                  },
                  {
                    key: "storageWarnings",
                    label: "Storage warnings",
                    desc: "Alert when storage is running low",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setNotifications((prev) => ({
                          ...prev,
                          [item.key]:
                            !prev[item.key as keyof typeof notifications],
                        }));
                        toast.success("Notification preference updated");
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications]
                          ? isDarkMode
                            ? "bg-white"
                            : "bg-black"
                          : isDarkMode
                          ? "bg-neutral-700"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? "translate-x-6 bg-black" +
                              (isDarkMode ? "" : " bg-white")
                            : "translate-x-1 bg-white" +
                              (isDarkMode ? "" : " bg-gray-500")
                        } ${
                          isDarkMode &&
                          notifications[item.key as keyof typeof notifications]
                            ? "bg-black"
                            : ""
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className={`rounded-lg border p-6 ${
              isDarkMode
                ? 'bg-neutral-900 border-neutral-800'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  isDarkMode ? 'bg-red-950' : 'bg-red-50'
                }`}>
                  <Trash2 className={`w-4 h-4 ${
                    isDarkMode ? 'text-red-400' : 'text-red-600'
                  }`} />
                </div>
                <h2 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Danger Zone
                </h2>
              </div>

              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Once you delete your account, there is no going back. Please be certain.
              </p>

              <button
                onClick={() => toast.error('Account deletion cancelled')}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors border ${
                  isDarkMode
                    ? 'border-red-900 text-red-400 hover:bg-red-950'
                    : 'border-red-200 text-red-600 hover:bg-red-50'
                }`}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
