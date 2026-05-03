"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AppLocale = "en" | "roman-ur" | "ur";

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "eventlio-locale";

export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<AppLocale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as AppLocale | null;
    if (stored === "en" || stored === "roman-ur" || stored === "ur") {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "ur" ? "ur" : "en";
    document.documentElement.dir = locale === "ur" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
