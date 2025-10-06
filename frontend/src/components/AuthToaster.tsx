import { Toaster } from "react-hot-toast";

const AuthToaster = ({isDarkMode} : {isDarkMode: boolean}) => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: isDarkMode ? "#171717" : "#000",
          color: "#fff",
          border: isDarkMode ? "1px solid #262626" : "1px solid #333",
          borderRadius: "8px",
          padding: "12px 16px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: isDarkMode ? "#fff" : "#000",
            secondary: isDarkMode ? "#000" : "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: isDarkMode ? "#fff" : "#000",
            secondary: isDarkMode ? "#000" : "#fff",
          },
        },
      }}
    />
  );
};
export default AuthToaster;
