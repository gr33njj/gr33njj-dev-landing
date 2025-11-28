"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ru";

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  t: (en: string, ru: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language;
    if (saved) setLang(saved);
    setMounted(true);
  }, []);

  const toggleLang = () => {
    const newLang = lang === "en" ? "ru" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (en: string, ru: string) => {
    if (!mounted) return en; // Default to English during SSR/Hydration to avoid mismatch
    return lang === "en" ? en : ru;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};


