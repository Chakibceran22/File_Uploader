import React, { useState, useEffect } from "react";
import { Upload, CheckCircle, Loader2, Mail, Moon, Sun } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useTheme from "../hooks/useTheme";
import ToggleThemeButton from "../components/ThemeToggleButton";
import Logo from "../components/Logo";
import AuthToaster from "../components/AuthToaster";
import { useNavigate } from "react-router-dom";
import { authService } from "../utils/authServiceSigneTon";
import type { AccessTokenDTO } from "../types/AccessTokenDTO";
const EmailVerificationPage: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [errorReason, setErrorReason] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyToken = async () => {
      // Get the hash part: #access_token=xxx&refresh_token=yyy
      const hash = window.location.hash.substring(1); // Remove #

      // Parse it into an object
      const params = new URLSearchParams(hash);
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const error = params.get("error");
      const errorCode = params.get("error_code");
      const errorDescription = params.get("error_code");
      const type = params.get('type')
      setIsVerifying(true);
      if (!accessToken || !refreshToken || !type) {
        console.log(errorCode);
        console.log(' i went here for some reason')
        setErrorReason(errorDescription || "Unkown error");
        // No tokens found - show error
        setIsVerifying(false);
        setIsVerified(false);
        return;
      }
      if(type == 'recovery'){
        navigate(`/create-password#access_token=${accessToken}&refresh_token=${refreshToken}`)
      }
      

      const emailToken: AccessTokenDTO = {
        accessToken,
        refreshToken,
      };
      try {
        const session = await authService.verifyEmail(emailToken);
          if (!session) {
          return;
        }
        sessionStorage.setItem('session', session)
        setIsVerified(true)
        return
      } catch (error: any) {
        toast.error(error.message);
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    };
    verifyToken();
  }, []);

  const handleContinue = () => {
    setIsNavigating(true);

    setTimeout(() => {
      setIsNavigating(false);
      toast.success("Redirecting to dashboard...");
      // Here you would typically redirect to the main app
    }, 1500);
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
          className={`rounded-lg border shadow-sm p-8 ${
            isDarkMode
              ? "bg-neutral-900 border-neutral-800"
              : "bg-white border-gray-200"
          }`}
        >
          {isVerifying ? (
            // Verifying State
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div
                  className={`p-4 rounded-full ${
                    isDarkMode ? "bg-neutral-800" : "bg-gray-50"
                  }`}
                >
                  <Loader2
                    className={`w-12 h-12 animate-spin ${
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
                Verifying your email
              </h1>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Please wait while we confirm your email address...
              </p>
            </div>
          ) : isVerified ? (
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
                Email verified!
              </h1>
              <p
                className={`text-sm mb-8 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Your email has been successfully verified. You can now access
                all features of FileUploader.
              </p>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={isNavigating}
                className={`w-full font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm mb-4 ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                {isNavigating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Continue to Dashboard"
                )}
              </button>

              {/* Additional Info */}
              <div
                className={`mt-6 p-4 rounded-md border ${
                  isDarkMode
                    ? "bg-neutral-800 border-neutral-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <h3
                  className={`text-sm font-medium mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  What's next?
                </h3>
                <ul
                  className={`text-sm space-y-1 text-left ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <li>• Upload and manage your files</li>
                  <li>• Share files with your team</li>
                  <li>• Access files from anywhere</li>
                </ul>
              </div>
            </div>
          ) : (
            // Error State
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div
                  className={`p-4 rounded-full ${
                    isDarkMode ? "bg-neutral-800" : "bg-gray-50"
                  }`}
                >
                  <Mail
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
                Verification failed
              </h1>
              <p
                className={`text-sm mb-8 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                We couldn't verify you Identity. The link may have expired or is
                invalid. Reason is {errorReason}
              </p>

              

              {/* Back to Login */}
              <button
                className={`w-full font-medium py-2.5 rounded-md border transition-all text-sm shadow-sm ${
                  isDarkMode
                    ? "bg-neutral-900 text-gray-300 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
                onClick={() => navigate('/')}
              >
                Back to Sign In
              </button>
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

export default EmailVerificationPage;
