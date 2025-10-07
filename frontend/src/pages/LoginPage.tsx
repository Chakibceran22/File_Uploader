import React, { useState } from "react";
import {
  Mail,
  Lock,
  Upload,
  Eye,
  EyeOff,
  Loader2,
  Moon,
  Sun,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useTheme from "../hooks/useTheme";
import AuthToaster from "../components/AuthToaster";
import { useNavigate } from "react-router-dom";
import ToggleThemeButton from "../components/ThemeToggleButton";
import Logo from "../components/Logo";
import type { LoginDTO } from "../types/LoginDTO";
import { useAuth } from "../hooks/useAuth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, loading, login, googleLogin } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const userInput: LoginDTO = {
      email,
      password,
    };

    try {
      await login(userInput);

      toast.success("Login Successful");
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    try {
      const url = await googleLogin();
      window.location.href = url?.url;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleEmailLogin();
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
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Logo isDarkMode={isDarkMode} />

        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className={`text-2xl font-semibold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Sign in to your account
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Welcome back
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className={`w-full rounded-md py-2.5 px-3 text-sm transition-colors ${
                  isDarkMode
                    ? "bg-neutral-900 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500"
                    : "bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                } border focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className={`w-full rounded-md py-2.5 px-3 pr-11 text-sm transition-colors ${
                  isDarkMode
                    ? "bg-neutral-900 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500"
                    : "bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
                } border focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className={`text-sm transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              disabled={isLoading}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            onClick={handleEmailLogin}
            disabled={isLoading}
            className={`w-full font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm ${
              isDarkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDarkMode ? "border-neutral-800" : "border-gray-200"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span
                className={`px-3 uppercase ${
                  isDarkMode
                    ? "bg-neutral-950 text-gray-500"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`w-full font-medium py-2.5 rounded-md border transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm shadow-sm ${
              isDarkMode
                ? "bg-neutral-900 text-gray-300 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p
            className={`text-center text-sm mt-8 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Don't have an account?{" "}
            <button
              className={`font-medium hover:underline ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              disabled={isLoading}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </button>
          </p>
          {/* Resend Confirmation Link */}
          <p
            className={`text-center text-xs mt-3 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Didn't receive confirmation email?{" "}
            <button
              className={`font-medium hover:underline ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => navigate("/resend-confirmation")}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
