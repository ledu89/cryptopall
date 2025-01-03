import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { toast } from "react-toastify";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("c") || "true")
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      toast.info(`Theme changed to ${newMode ? "Dark" : "Light"} mode`, {
        autoClose: 500,
        position: "top-right",
        style: {
          maxWidth: "300px",
          margin: "0 auto",
          marginTop: "60px",
        },
      });
      return newMode;
    });
  };

  useEffect(() => {
    const mainElement = document.querySelector(".main");
    if (mainElement) {
      mainElement.classList.remove("light-mode", "dark-mode");
      mainElement.classList.add(isDarkMode ? "dark-mode" : "light-mode");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
