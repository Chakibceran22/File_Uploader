import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function useTheme() {
    const context = useContext(ThemeContext)

    if(context == undefined) {
        throw new Error("Theme Contest must be used within the theme provider")
    }
    return context
}
export default useTheme