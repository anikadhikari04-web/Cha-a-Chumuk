import { create } from "zustand";
import type { Lang } from "./i18n";

const getSystemDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const applyDark = (dark: boolean) => {
  if (dark) document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
};

const initialDark = getSystemDark();
applyDark(initialDark);

type AppState = {
  lang: Lang;
  dark: boolean;
  toggleLang: () => void;
  toggleDark: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  lang: "bn",
  dark: initialDark,
  toggleLang: () => set((s) => ({ lang: s.lang === "en" ? "bn" : "en" })),
  toggleDark: () =>
    set((s) => {
      const next = !s.dark;
      applyDark(next);
      return { dark: next };
    }),
}));
