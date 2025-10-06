import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EmailVerificationPage from "./pages/ConfirmEmail";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import ThemeProvider from "./providers/ThemeProvider";
import ResendConfirmationPage from "./pages/ResendConfirmationPage";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/auth/callback" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/resend-confirmation" element={<ResendConfirmationPage/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
