"use client";

import { createContext, useState } from "react";

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [burgerMenu, setBurgermenu] = useState(false);

  return (
    <SiteContext.Provider value={{ burgerMenu, setBurgermenu }}>
      {children}
    </SiteContext.Provider>
  );
};
