import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/ConfirmEmail";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import ThemeProvider from "./providers/ThemeProvider";
import ResendConfirmationPage from "./pages/ResendConfirmationPage";
import ResetPasswordPage from "./pages/ResetPasswordFormPage";
import { AuthProvider } from "./providers/AuthProvider";
import FileUploadDashboard from "./pages/FileUploadDahsboardPage";
import MyFilesPage from "./pages/MyFilesPage";
import SettingsPage from "./pages/SettingsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <AuthProvider>
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/callback" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/resend-confirmation" element={<ResendConfirmationPage/>}/>
          <Route path="/create-password" element={<ResetPasswordPage/>} />
          <Route path="/main" element= {<FileUploadDashboard/>} />
          <Route path="/main/myfiles" element={<MyFilesPage/>} />
          <Route path="/main/settings" element={<SettingsPage/>} />
        </Routes>
      </Router>
      </AuthProvider>
    </ThemeProvider>
    <ReactQueryDevtools position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
