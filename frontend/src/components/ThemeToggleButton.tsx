import { Sun, Moon } from "lucide-react"
import type { ThemeContextType } from "../types/ThemeContextType"

const ToggleThemeButton = ({isDarkMode, toggleTheme} : ThemeContextType) => {
    return(
        <button
        onClick={() => toggleTheme()}
        className={`fixed top-6 right-6 p-3 rounded-lg transition-all ${
          isDarkMode 
            ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
            : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
        }`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

    )
}
export default ToggleThemeButton