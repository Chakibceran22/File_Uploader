import React, { useState } from 'react';
import { Mail,  Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import useTheme from '../hooks/useTheme';
import ToggleThemeButton from '../components/ThemeToggleButton';
import Logo from '../components/Logo';
import AuthToaster from '../components/AuthToaster';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/authServiceSigneTon';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const {isDarkMode, toggleTheme} = useTheme()
  const navigate = useNavigate()
  
  const handleSubmit = async() => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.sendResetPasswordLink(email)
      console.log(response)
      if(response){
        toast.success(response.data.message)
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  const handleBackToLogin = () => {
    navigate('/')
  };

  const handleResendEmail = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Email resent successfully!');
    }, 1500);
  };

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-200 ${
      isDarkMode ? 'bg-neutral-950' : 'bg-gray-50'
    }`}>
      <AuthToaster isDarkMode={isDarkMode}/>

      {/* Theme Toggle Button */}
      <ToggleThemeButton isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <Logo isDarkMode={isDarkMode}/>

        {!emailSent ? (
          // Initial Form
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className={`text-2xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Reset your password
              </h1>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
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
                        ? 'bg-neutral-900 text-white placeholder-gray-500 border-neutral-700 focus:border-neutral-500 focus:ring-neutral-500'
                        : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200 focus:border-gray-400 focus:ring-gray-400'
                    } border focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm ${
                  isDarkMode
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-black text-white hover:bg-gray-900'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={handleBackToLogin}
                disabled={isLoading}
                className={`w-full font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-neutral-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          </>
        ) : (
          // Success State
          <div className={`rounded-lg border shadow-sm p-8 ${
            isDarkMode 
              ? 'bg-neutral-900 border-neutral-800' 
              : 'bg-white border-gray-200'
          }`}>
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
                Check your email
              </h1>
              <p className={`text-sm mb-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                We've sent a password reset link to
              </p>
              <p className={`text-sm font-medium mb-8 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {email}
              </p>

              {/* Info Box */}
              <div className={`p-4 rounded-md border mb-6 text-left ${
                isDarkMode 
                  ? 'bg-neutral-800 border-neutral-700' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  What to do next:
                </h3>
                <ul className={`text-sm space-y-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <li>• Check your inbox and spam folder</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create a new password</li>
                </ul>
              </div>

              {/* Resend Button */}
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className={`w-full font-medium py-2.5 rounded-md border transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm mb-3 ${
                  isDarkMode
                    ? 'bg-neutral-900 text-gray-300 border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Resending...
                  </span>
                ) : (
                  'Resend email'
                )}
              </button>

              {/* Back to Login */}
              <button
                onClick={handleBackToLogin}
                disabled={isLoading}
                className={`w-full font-medium py-2.5 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-neutral-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          </div>
        )}

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

export default ForgotPasswordPage;