import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";


const ThemeToggle = () => {
const { theme, toggleTheme } = useContext(ThemeContext);
return (
<button
onClick={toggleTheme}
className="p-2 rounded-full bg-yellow-400 text-black dark:bg-black dark:text-yellow-400"
aria-label="Toggle theme"
>
{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
</button>
);
};


export default ThemeToggle;