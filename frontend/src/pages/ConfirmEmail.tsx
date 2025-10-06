import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, Loader2, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AuthToaster from '../components/AuthToaster';

const EmailVerificationPage: React.FC = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <AuthToaster/>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-black p-2 rounded-md">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">FileUploader</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
          {isVerifying ? (
            // Verifying State
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-50 p-4 rounded-full">
                  <Loader2 className="w-12 h-12 text-gray-900 animate-spin" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Verifying your email
              </h1>
              <p className="text-sm text-gray-500">
                Please wait while we confirm your email address...
              </p>
            </div>
          ) : isVerified ? (
            // Success State
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gray-50 p-4 rounded-full">
                  <CheckCircle className="w-12 h-12 text-gray-900" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Email verified!
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Your email has been successfully verified. You can now access all features of FileUploader.
              </p>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={isNavigating}
                className="w-full bg-black text-white font-medium py-2.5 rounded-md hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm shadow-sm mb-4"
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
              <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">What's next?</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
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
                <div className="bg-gray-50 p-4 rounded-full">
                  <Mail className="w-12 h-12 text-gray-900" />
                </div>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Verification failed
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                We couldn't verify your email. The link may have expired or is invalid.
              </p>

              {/* Resend Button */}
              <button
                onClick={handleResendEmail}
                className="w-full bg-black text-white font-medium py-2.5 rounded-md hover:bg-gray-900 transition-all text-sm shadow-sm mb-4"
              >
                Resend verification email
              </button>

              {/* Back to Login */}
              <button
                className="w-full bg-white text-gray-700 font-medium py-2.5 rounded-md border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm shadow-sm"
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Need help? Contact our support team
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;