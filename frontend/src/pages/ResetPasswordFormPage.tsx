import React, { useState, useEffect } from "react";
import { CheckCircle, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import useTheme from "../hooks/useTheme";
import ToggleThemeButton from "../components/ThemeToggleButton";
import Logo from "../components/Logo";
import AuthToaster from "../components/AuthToaster";
import { useNavigate } from "react-router-dom";
import { authService } from "../utils/authServiceSigneTon";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Parse tokens from URL hash
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access = params.get("access_token");
    const refresh = params.get("refresh_token");

    if (!access || !refresh) {
      toast.error("Invalid or expired reset link");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    setAccessToken(access);
    setRefreshToken(refresh);
  }, [navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.resetPassword(
        accessToken,
        refreshToken,
        password
      );
      if (response) {
        console.log(response);
        setIsSuccess(true);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return
      }
      setIsSuccess(false);
      toast.error("Unkown Issue");

      // Redirect to login after 2 seconds
        
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-200 ${
        isDarkMode ? "bg-neutral-950" : "bg-gray-50"
      }`}
    >
      <AuthToaster isDarkMode={isDarkMode} />

      {/* Theme Toggle Button */}
      <ToggleThemeButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="w-full max-w-md">
        {/* Logo */}
        <Logo isDarkMode={isDarkMode} />

        {/* Card */}
        <div
          className={
            isSuccess
              ? `rounded-lg border shadow-sm p-8 ${
                  isDarkMode
                    ? "bg-neutral-900 border-neutral-800"
                    : "bg-white border-gray-200"
                }`
              : "p-8"
          }
        >
          {isSuccess ? (
            // Success State
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div
                  className={`p-4 rounded-full ${
                    isDarkMode ? "bg-neutral-800" : "bg-gray-50"
                  }`}
                >
                  <CheckCircle
                    className={`w-12 h-12 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  />
                </div>
              </div>
              <h1
                className={`text-2xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Password reset successful!
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Your password has been updated. Redirecting you to login...
              </p>
            </div>
          ) : (
            // Reset Password Form
            <div>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div
                    className={`p-4 rounded-full ${
                      isDarkMode ? "bg-neutral-800" : "bg-gray-50"
                    }`}
                  >
                    <Lock
                      className={`w-12 h-12 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    />
                  </div>
                </div>
                <h1
                  className={`text-2xl font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Create new password
                </h1>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Please enter your new password below
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={`w-full px-4 py-2.5 pr-10 rounded-md border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-gray-500 focus:border-neutral-600"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-300"
                      } focus:outline-none`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`w-full px-4 py-2.5 pr-10 rounded-md border text-sm transition-colors ${
                        isDarkMode
                          ? "bg-neutral-800 border-neutral-700 text-white placeholder-gray-500 focus:border-neutral-600"
                          : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-300"
                      } focus:outline-none`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-8 font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm ${
                    isDarkMode
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Resetting password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <p
          className={`text-center text-xs mt-6 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
