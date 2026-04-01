import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Sun, Moon, Globe } from "lucide-react";

export default function Navbar() {
  const { lang, dark, toggleLang, toggleDark } = useAppStore();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close on click outside (anywhere on screen)
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        btnRef.current && !btnRef.current.contains(target)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [mobileOpen]);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/", label: t(lang, "home") },
    { href: "/menu", label: t(lang, "menu") },
    { href: "/photos", label: t(lang, "photos") },
    { href: "/reviews", label: t(lang, "reviews") },
    { href: "/contact", label: t(lang, "contact") },
  ];

  const isActive = (href: string) => location === href;

  return (
    <>
      {/* Full-screen overlay — closes menu on any tap */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md nav-scrolled"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/30 group-hover:ring-primary group-hover:scale-110 transition-all duration-300">
                <img
                  src="/logo-banner.png"
                  alt="Cha A Chumuk"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="leading-tight">
                <p
                  className={`font-bold text-base text-primary leading-none transition-colors group-hover:text-primary/80 ${
                    lang === "bn" ? "font-bengali" : "font-serif"
                  }`}
                >
                  {lang === "bn" ? "চা এ চুমুক" : "Cha A Chumuk"}
                </p>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                  {lang === "bn" ? "ফিউশন রেস্তোরাঁ" : "Fusion Restaurant"}
                </p>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    lang === "bn" ? "font-bengali" : ""
                  } ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground scale-105"
                      : "text-foreground hover:bg-muted hover:scale-105"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Controls */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm font-medium hover:bg-muted hover:scale-105 active:scale-95 transition-all duration-200"
                title="Toggle Language"
              >
                <Globe className="w-4 h-4" />
                <span className={lang === "bn" ? "font-bengali text-xs" : "text-xs"}>
                  {t(lang, "langToggle")}
                </span>
              </button>
              <button
                onClick={toggleDark}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted hover:scale-110 active:scale-90 transition-all duration-200"
                title={dark ? "Light Mode" : "Dark Mode"}
              >
                <span className={`transition-all duration-300 ${dark ? "rotate-180 opacity-100" : "rotate-0 opacity-100"}`}>
                  {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </span>
              </button>
            </div>

            {/* Animated Hamburger button */}
            <button
              ref={btnRef}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border hover:bg-muted active:scale-90 transition-all duration-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-foreground rounded-full origin-center transition-all duration-300 ease-in-out ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ease-in-out ${
                  mobileOpen ? "w-0 opacity-0 scale-x-0" : "w-5 opacity-100 scale-x-100"
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-foreground rounded-full origin-center transition-all duration-300 ease-in-out ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile menu panel */}
          <div
            ref={menuRef}
            className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
              mobileOpen ? "max-h-[400px] opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
            style={{ transitionProperty: "max-height, opacity" }}
          >
            <div className="flex flex-col gap-1 pt-2 border-t border-border/50 mt-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    lang === "bn" ? "font-bengali" : ""
                  } ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted hover:pl-6"
                  }`}
                  style={{
                    transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                    transform: mobileOpen ? "translateX(0)" : "translateX(-10px)",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 px-1 pt-3">
                <button
                  onClick={toggleLang}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted active:scale-95 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className={lang === "bn" ? "font-bengali text-xs" : "text-xs"}>
                    {t(lang, "langToggle")}
                  </span>
                </button>
                <button
                  onClick={toggleDark}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted active:scale-95 transition-all duration-200"
                >
                  <span className="transition-transform duration-300">
                    {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </span>
                  <span className="text-xs">{dark ? t(lang, "themeLightToggle") : t(lang, "themeToggle")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
