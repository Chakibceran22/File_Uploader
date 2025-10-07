import { Menu,Upload } from "lucide-react";

export const MobileMainHeader = ({
  isDarkMode,
  setSidebarOpen,
}: {
  isDarkMode: boolean;
  setSidebarOpen: (state: boolean) => void;
}) => {
  return (
    <div
      className={`lg:hidden sticky top-0 z-30 border-b px-4 py-3 flex items-center justify-between ${
        isDarkMode
          ? "bg-neutral-900 border-neutral-800"
          : "bg-white border-gray-200"
      }`}
    >
      <button
        onClick={() => setSidebarOpen(true)}
        className={`p-2 rounded-md transition-colors ${
          isDarkMode
            ? "hover:bg-neutral-800 text-white"
            : "hover:bg-gray-100 text-gray-900"
        }`}
      >
        <Menu className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        <div
          className={`p-1.5 rounded-md ${isDarkMode ? "bg-white" : "bg-black"}`}
        >
          <Upload
            className={`w-4 h-4 ${isDarkMode ? "text-black" : "text-white"}`}
          />
        </div>
        <span
          className={`text-base font-semibold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          FileUploader
        </span>
      </div>

      <div className="w-9" />
    </div>
  );
};
