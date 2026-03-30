import React, { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export type Lang = "en" | "zh";

type LanguageContextValue = { lang: Lang };

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const lang: Lang = pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
