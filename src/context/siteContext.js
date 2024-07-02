"use client";

import { createContext, useState } from "react";

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [burgerMenu, setBurgermenu] = useState(false);
  const [currentLang, setCurrentLang] = useState("UA");

  return (
    <SiteContext.Provider
      value={{ burgerMenu, setBurgermenu, currentLang, setCurrentLang }}
    >
      {children}
    </SiteContext.Provider>
  );
};
