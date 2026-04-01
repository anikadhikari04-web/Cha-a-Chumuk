import { useState, useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { menuItems } from "@/lib/menuData";
import { Search, X } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

type Category = "all" | "breakfast" | "momo" | "chinese" | "noodles" | "biryani" | "rolls";

const categoryKeys: { key: Category; labelKey: string }[] = [
  { key: "all", labelKey: "allCategories" },
  { key: "breakfast", labelKey: "catBreakfast" },
  { key: "momo", labelKey: "catMomo" },
  { key: "chinese", labelKey: "catChinese" },
  { key: "noodles", labelKey: "catNoodles" },
  { key: "biryani", labelKey: "catBiryani" },
  { key: "rolls", labelKey: "catRolls" },
];

const categoryEmoji: Record<Category, string> = {
  all: "🍽️",
  breakfast: "🌅",
  momo: "🥟",
  chinese: "🥢",
  noodles: "🍜",
  biryani: "🍛",
  rolls: "🌯",
};

export default function Menu() {
  const { lang } = useAppStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const headerRef = useReveal();
  const menuRef = useReveal();

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        item.nameEn.toLowerCase().includes(q) ||
        item.nameBn.toLowerCase().includes(q) ||
        item.price.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  // Group filtered items by category
  const grouped = useMemo(() => {
    const groups: Record<string, typeof menuItems> = {};
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  const categoryLabels: Record<Category, string> = {
    all: t(lang, "allCategories"),
    breakfast: t(lang, "catBreakfast"),
    momo: t(lang, "catMomo"),
    chinese: t(lang, "catChinese"),
    noodles: t(lang, "catNoodles"),
    biryani: t(lang, "catBiryani"),
    rolls: t(lang, "catRolls"),
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div
        className="relative py-20 px-4 sm:px-6 overflow-hidden"
        ref={headerRef}
      >
        <div className="absolute inset-0">
          <img
            src="/menu-image.png"
            alt="Menu"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {lang === "bn" ? "আমাদের মেনু" : "Our Menu"}
          </span>
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              lang === "bn" ? "font-bengali" : "font-serif"
            }`}
          >
            {t(lang, "menuTitle")}
          </h1>
          <p className={`text-muted-foreground text-lg ${lang === "bn" ? "font-bengali" : ""}`}>
            {t(lang, "menuSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Menu Image */}
        <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-border reveal" ref={useReveal()}>
          <img
            src="/menu-image.png"
            alt="Cha A Chumuk Special Menu"
            className="w-full object-contain max-h-[600px]"
          />
          <div className="bg-card px-6 py-4 text-center border-t border-border">
            <p className={`font-semibold text-foreground ${lang === "bn" ? "font-bengali" : "font-serif"}`}>
              {t(lang, "menuImageTitle")}
            </p>
            <p className={`text-sm text-muted-foreground mt-1 ${lang === "bn" ? "font-bengali" : ""}`}>
              {t(lang, "menuImageSubtitle")}
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8" ref={menuRef}>
          {/* Search */}
          <div className="relative mb-5 reveal">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t(lang, "searchPlaceholder")}
              className={`w-full pl-12 pr-12 py-3.5 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${
                lang === "bn" ? "font-bengali" : ""
              }`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 reveal">
            {categoryKeys.map(({ key }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`filter-pill flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  lang === "bn" ? "font-bengali" : ""
                } ${
                  activeCategory === key
                    ? "bg-primary text-primary-foreground border-primary active"
                    : "bg-card border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <span>{categoryEmoji[key]}</span>
                {categoryLabels[key]}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <p className={`text-muted-foreground text-lg ${lang === "bn" ? "font-bengali" : ""}`}>
              {t(lang, "noResults")}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="search-result">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{categoryEmoji[cat as Category]}</span>
                  <h2
                    className={`text-xl font-bold text-foreground ${
                      lang === "bn" ? "font-bengali" : "font-serif"
                    }`}
                  >
                    {categoryLabels[cat as Category]}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground">{items.length} items</span>
                </div>
                <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      className={`menu-item-row flex items-center justify-between px-5 py-4 ${
                        i < items.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <p
                          className={`font-medium text-foreground ${
                            lang === "bn" ? "font-bengali" : ""
                          }`}
                        >
                          {lang === "bn" ? item.nameBn : item.nameEn}
                        </p>
                        {lang === "en" && (
                          <p className="text-xs text-muted-foreground mt-0.5 font-bengali">
                            {item.nameBn}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary text-base bg-primary/10 px-3 py-1 rounded-full">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
