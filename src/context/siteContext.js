"use client";

import { createContext, useEffect, useState } from "react";

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [burgerMenu, setBurgermenu] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIsLoad(false);
  }, []);

  return (
    <SiteContext.Provider value={{ burgerMenu, setBurgermenu, isLoad }}>
      {children}
    </SiteContext.Provider>
  );
};
