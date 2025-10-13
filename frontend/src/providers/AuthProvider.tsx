import { useEffect, useState } from "react";
import type { ProviderProps } from "../types/ThemeProviderProps";
import { authService } from "../utils/authServiceSigneTon";
import type { LoginDTO } from "../types/LoginDTO";
import { AuthContext } from "../contexts/AuthContext";

export function AuthProvider({ children }: ProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    async function verifyUser() {
      const savedToken = sessionStorage.getItem("session");
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.verifyToken(savedToken);
        if (!response) {
          setIsAuthenticated(false);
          return;
        }
        if (!response.valid) {
          setIsAuthenticated(false);
          throw new Error("UnAutherized access");
        }
        setIsAuthenticated(true);
        setToken(savedToken)

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    verifyUser();
  }, []);

  const login = async (credentials: LoginDTO) => {
    const session = await authService.login(credentials);
    if (session) {
        sessionStorage.setItem('session',session)
      setIsAuthenticated(true);
    }
  };

  const googleLogin = async() => {
    try {
      const url = await authService.googleLogin()
      return url
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  const logout = () => {
    authService.logOut()
    setIsAuthenticated(false)
    return
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, googleLogin, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
}
