
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import EmailVerificationPage from "./pages/ConfirmEmail"
import ForgotPasswordPage from "./pages/ForgetPasswordPage"
function App() {

  return (
   <Router>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path='/auth/callback' element={<EmailVerificationPage/>} />
      <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
    </Routes>
   </Router>
  )
}

export default App
