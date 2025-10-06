import { useEffect, useState } from "react";
import type { ThemeProviderProps } from "../types/ThemeProviderProps";
import { ThemeContext } from "../contexts/ThemeContext";

function ThemeProvider({ children }: ThemeProviderProps) {
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
