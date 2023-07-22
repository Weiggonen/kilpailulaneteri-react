import React, { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }) {
  const [profileCreated, setProfileCreated] = useState(false);

  useEffect(() => {
    // Get the profile from local storage
    const profile = localStorage.getItem("profile");

    // If the profile exists in local storage, set profileCreated to true
    // Otherwise, set it to false
    setProfileCreated(!!profile);
  }, []); // The empty array ensures this effect runs once on mount

  return (
    <GlobalContext.Provider value={{ profileCreated, setProfileCreated }}>
      {children}
    </GlobalContext.Provider>
  );
}
