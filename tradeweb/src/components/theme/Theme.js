import React, { createContext, useState } from 'react'
import ProductRegister from '../product/ProductRegister';
import ReactSwitch from "react-switch";

export const ThemeContext = createContext("light");

const Theme = () => {
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme((curr) => (curr === "lignt" ? "dark" : "light"))
    }  

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
        <ProductRegister />
        <div>
            <label>{theme === "light" ? "light mode" : "dark mode"}</label>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
    </ThemeContext.Provider>
  )
}


