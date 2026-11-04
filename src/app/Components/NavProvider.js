"use client";

import { createContext, useContext } from "react";

const NavContext = createContext([]);

// Navigation fetched by the root layout, so its links are part of the first HTML.
export default function NavProvider({ items, children }) {
  return <NavContext.Provider value={items}>{children}</NavContext.Provider>;
}

export const useNavItems = () => useContext(NavContext);
