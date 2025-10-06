import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, Loader2, Mail, Moon, Sun } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import useTheme from '../hooks/useTheme';
import ToggleThemeButton from '../components/ThemeToggleButton';
import Logo from '../components/Logo';
const EmailVerificationPage: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    // Simulate email verification check
    const timer = setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast.success('Email verified successfully!');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setIsNavigating(true);
    
    setTimeout(() => {
      setIsNavigating(false);
      toast.success('Redirecting to dashboard...');
      // Here you would typically redirect to the main app
    }, 1500);
  };

  const handleResendEmail = () => {
    toast.success('Verification email sent!');
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-200 ${
      isDarkMode ? 'bg-neutral-950' : 'bg-gray-50'
    }`}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#171717' : '#000',
            color: '#fff',
            border: isDarkMode ? '1px solid #262626' : '1px solid #333',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: isDarkMode ? '#fff' : '#000',
              secondary: isDarkMode ? '#000' : '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: isDarkMode ? '#fff' : '#000',
              secondary: isDarkMode ? '#000' : '#fff',
            },
          },
        }}
      />

      {/* Theme Toggle Button */}
      <ToggleThemeButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="w-full max-w-md">
        {/* Logo */}
        <Logo isDarkMode={isDarkMode} />

        {/* Card */}
        <div className={`rounded-lg border shadow-sm p-8 ${
          isDarkMode 
            ? 'bg-neutral-900 border-neutral-800' 
            : 'bg-white border-gray-200'
        }`}>
          {isVerifying ? (
            // Verifying State
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-gray-50'
                }`}>
                  <Loader2 className={`w-12 h-12 animate-spin ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                </div>
              </div>
              <h1 className={`text-2xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Verifying your email
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Please wait while we confirm your email address...
              </p>
            </div>
          ) : isVerified ? (
            // Success State
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-full ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-gray-50'
                }`}>
                  <CheckCircle className={`w-12 h-12 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                </div>
              </div>
              <h1 className={`text-2xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Email verified!
              </h1>
              <p className={`text-sm mb-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Your email has been successfully verified. You can now access all features of FileUploader.
              </p>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={isNavigating}
                className={`w-full font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm mb-4 ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {isNavigating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Continue to Dashboard'
                )}
              </button>

              {/* Additional Info */}
              <div className={`mt-6 p-4 rounded-md border ${
                isDarkMode 
                  ? 'bg-neutral-800 border-neutral-700' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  What's next?
                </h3>
                <ul className={`text-sm space-y-1 text-left ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
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
                <div className={`p-4 rounded-full ${
                  isDarkMode ? 'bg-neutral-800' : 'bg-gray-50'
                }`}>
                  <Mail className={`w-12 h-12 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                </div>
              </div>
              <h1 className={`text-2xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Verification failed
              </h1>
              <p className={`text-sm mb-8 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                We couldn't verify your email. The link may have expired or is invalid.
              </p>

              {/* Resend Button */}
              <button
                onClick={handleResendEmail}
                className={`w-full font-medium py-2.5 rounded-md transition-all text-sm shadow-sm mb-4 ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                Resend verification email
              </button>

              {/* Back to Login */}
              <button
                className={`w-full font-medium py-2.5 rounded-md border transition-all text-sm shadow-sm ${
                  isDarkMode
                    ? 'bg-neutral-900 text-gray-300 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className={`text-center text-xs mt-6 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;