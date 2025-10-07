import { useEffect, useState } from "react";
import type { ProviderProps } from "../types/ThemeProviderProps";
import { ThemeContext } from "../contexts/ThemeContext";

function ThemeProvider({ children }: ProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme')
    return saved == 'dark'
  });

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setIsDarkMode(saved == "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
