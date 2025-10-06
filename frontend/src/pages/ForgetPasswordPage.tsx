import React, { useState } from 'react';
import { Mail, Upload, Loader2, ArrowLeft } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
    const navigate = useNavigate()
  const handleSubmit = () => {
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

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast.success('Password reset email sent!');
    }, 2000);
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#000',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-black p-2 rounded-md">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">FileUploader</span>
          </div>
        </div>

        {!emailSent ? (
          // Initial Form
          <>
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Reset your password</h1>
              <p className="text-sm text-gray-500">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-md py-2.5 px-3 border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-black text-white font-medium py-2.5 rounded-md hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm"
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
                className="w-full text-gray-700 font-medium py-2.5 rounded-md hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          </>
        ) : (
          // Success State
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-50 p-4 rounded-full">
                  <Mail className="w-12 h-12 text-gray-900" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Check your email
              </h1>
              <p className="text-sm text-gray-500 mb-2">
                We've sent a password reset link to
              </p>
              <p className="text-sm font-medium text-gray-900 mb-8">
                {email}
              </p>

              {/* Info Box */}
              <div className="p-4 bg-gray-50 rounded-md border border-gray-200 mb-6 text-left">
                <h3 className="text-sm font-medium text-gray-900 mb-2">What to do next:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check your inbox and spam folder</li>
                  <li>• Click the reset link in the email</li>
                  <li>• Create a new password</li>
                </ul>
              </div>

              {/* Resend Button */}
              <button
                onClick={handleResendEmail}
                disabled={isLoading}
                className="w-full bg-white text-gray-700 font-medium py-2.5 rounded-md border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-sm mb-3"
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
                className="w-full text-gray-700 font-medium py-2.5 rounded-md hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;