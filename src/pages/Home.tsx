import { Link } from "wouter";
import { useAppStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { ArrowRight, MapPin, Star, Utensils } from "lucide-react";
import { useEffect, useRef } from "react";

const popularItems = [
  {
    nameEn: "Chicken Biryani",
    nameBn: "চিকেন বিরিয়ানি",
    price: "₹100",
    img: "/tandoori-full.jpg",
    emoji: "🍛",
    tag: "Bestseller",
    delay: 0,
  },
  {
    nameEn: "Cha A Chumuk Special Roll",
    nameBn: "চা এ চুমুক স্পেশাল রোল",
    price: "₹90",
    img: "/food-bucket.png",
    emoji: "🌯",
    tag: "Signature",
    delay: 100,
  },
  {
    nameEn: "Tandoori Chicken",
    nameBn: "তন্দুরি চিকেন",
    price: "₹150",
    img: "/tandoori-chicken.jpg",
    emoji: "🍗",
    tag: "Fan Favorite",
    delay: 200,
  },
  {
    nameEn: "Pan Fried Momo",
    nameBn: "প্যান ফ্রাইড মোমো",
    price: "₹80",
    img: "/chicken-legs.jpg",
    emoji: "🥟",
    tag: "Popular",
    delay: 300,
  },
];

const galleryImages = [
  { src: "/cafe-crowd.jpg", alt: "Cafe crowd" },
  { src: "/cafe-interior.jpg", alt: "Cafe interior" },
  { src: "/cafe-dining.png", alt: "Cafe dining" },
  { src: "/cafe-stars.png", alt: "Cafe night view" },
];

const tickerItems = [
  "☕ Fresh Tea Brewed Daily",
  "🍛 Special Biryani",
  "🥟 Handmade Momos",
  "🌯 Signature Rolls",
  "🍜 Chawmin",
  "🍗 Tandoori Specials",
  "📍 Khanakul, Hooghly",
];

function useIntersectionReveal(selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale") {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const targets = el.querySelectorAll(selectors);
    if (targets.length > 0) targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [selectors]);
  return ref;
}

export default function Home() {
  const { lang } = useAppStore();
  const popularRef = useIntersectionReveal();
  const galleryRef = useIntersectionReveal();
  const ctaRef = useIntersectionReveal();
  const statsRef = useIntersectionReveal();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background image with slow zoom */}
        <div className="absolute inset-0">
          <img
            src="/cafe-dining.png"
            alt="Cha A Chumuk Cafe"
            className="w-full h-full object-cover scale-105"
            style={{ animation: "floatSlow 18s ease-in-out infinite alternate" }}
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Floating badge — top right */}
        <div
          className="absolute top-24 right-6 lg:right-16 animate-float hidden sm:block"
          style={{ animationDelay: "0s" }}
        >
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-white text-center border border-white/25 shadow-xl">
            <div className="text-3xl mb-1">☕</div>
            <p className="text-xs font-semibold tracking-wide">Fresh Brewed</p>
          </div>
        </div>

        {/* Floating badge — bottom left */}
        <div
          className="absolute bottom-36 left-6 lg:left-16 animate-float hidden sm:block"
          style={{ animationDelay: "1.8s" }}
        >
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-white text-center border border-white/25 shadow-xl">
            <div className="text-3xl mb-1">🍛</div>
            <p className="text-xs font-semibold tracking-wide">Special Biryani</p>
          </div>
        </div>

        {/* Floating badge — mid left */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-10 animate-float hidden lg:block"
          style={{ animationDelay: "3.5s" }}
        >
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 text-white text-center border border-white/25 shadow-xl">
            <div className="text-3xl mb-1">🥟</div>
            <p className="text-xs font-semibold tracking-wide">Momos</p>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          {/* Location pill */}
          <div
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-4 py-2 text-sm mb-6 animate-fade-in-down"
            style={{ animationDelay: "0.1s" }}
          >
            <MapPin className="w-4 h-4" />
            <span className={lang === "bn" ? "font-bengali" : ""}>
              {lang === "bn" ? "খানাকুল, হুগলি" : "Khanakul, Hooghly"}
            </span>
          </div>

          {/* Main tagline */}
          <h1
            className={`text-5xl sm:text-7xl font-bold mb-4 leading-tight animate-fade-in-up hero-title-gradient ${
              lang === "bn" ? "font-bengali" : "font-serif"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            {t(lang, "heroTagline")}
          </h1>

          <p
            className={`text-lg sm:text-xl text-white/88 mb-8 max-w-xl mx-auto leading-relaxed animate-fade-in-up ${
              lang === "bn" ? "font-bengali" : ""
            }`}
            style={{ animationDelay: "0.38s" }}
          >
            {t(lang, "heroSubtitle")}
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.52s" }}
          >
            <Link
              href="/menu"
              className={`btn-glow inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg ${
                lang === "bn" ? "font-bengali" : ""
              }`}
            >
              {t(lang, "viewMenu")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/40 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/28 transition-all hover:scale-105 active:scale-95 ${
                lang === "bn" ? "font-bengali" : ""
              }`}
            >
              {t(lang, "contactNow")}
            </Link>
          </div>

          {/* Stats */}
          <div
            className="flex items-center justify-center gap-6 sm:gap-12 mt-14 animate-fade-in-up"
            style={{ animationDelay: "0.68s" }}
          >
            {[
              { value: "500+", label: lang === "bn" ? "দৈনিক গ্রাহক" : "Daily Guests" },
              { value: "30+", label: lang === "bn" ? "মেনু আইটেম" : "Menu Items" },
              { value: "5★", label: lang === "bn" ? "রেটিং" : "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className={`text-xs text-white/70 mt-0.5 ${lang === "bn" ? "font-bengali" : ""}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TICKER STRIP ────────────────────────── */}
      <div className="bg-primary text-white py-3 overflow-hidden">
        <div className="marquee-track gap-0">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-6 text-sm font-medium whitespace-nowrap px-6">
              {item}
              <span className="w-1 h-1 rounded-full bg-white/50 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── POPULAR DISHES ──────────────────────── */}
      <section className="py-20 px-4 sm:px-6" ref={popularRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Wave bars decoration */}
            <div className="wave-bars flex items-center justify-center gap-1 mb-4">
              {[...Array(6)].map((_, i) => <span key={i} />)}
            </div>
            <p className="reveal text-primary font-medium text-sm uppercase tracking-widest mb-2">
              {lang === "bn" ? "আমাদের মেনু থেকে" : "From Our Kitchen"}
            </p>
            <h2
              className={`reveal text-3xl sm:text-4xl font-bold mb-3 ${
                lang === "bn" ? "font-bengali" : "font-serif"
              }`}
            >
              {t(lang, "popularTitle")}
            </h2>
            <p className={`reveal text-muted-foreground max-w-md mx-auto ${lang === "bn" ? "font-bengali" : ""}`}>
              {t(lang, "popularSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularItems.map((item) => (
              <div
                key={item.nameEn}
                className="food-card reveal bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm"
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={item.img}
                    alt={item.nameEn}
                    className="food-card-img w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="animate-pop-in bg-primary text-white text-xs px-2.5 py-1 rounded-full font-medium shadow">
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-2xl">{item.emoji}</div>
                </div>
                <div className="p-4">
                  <h3
                    className={`font-semibold text-foreground leading-tight mb-1 ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    {lang === "bn" ? item.nameBn : item.nameEn}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-primary font-bold text-lg">{item.price}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <Link
              href="/menu"
              className={`btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-md ${
                lang === "bn" ? "font-bengali" : ""
              }`}
            >
              {t(lang, "viewMenu")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ───────────────────────────── */}
      <section className="py-14 bg-primary/5 border-y border-border" ref={statsRef}>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🍽️", value: "30+", label: lang === "bn" ? "মেনু আইটেম" : "Menu Items" },
            { icon: "👨‍🍳", value: "5+", label: lang === "bn" ? "শেফ" : "Expert Chefs" },
            { icon: "⭐", value: "4.8", label: lang === "bn" ? "গড় রেটিং" : "Avg. Rating" },
            { icon: "📅", value: "365", label: lang === "bn" ? "দিন খোলা" : "Days Open" },
          ].map((s) => (
            <div
              key={s.label}
              className="stat-card reveal bg-card border border-card-border rounded-2xl p-5 shadow-sm"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className={`text-xs text-muted-foreground mt-1 ${lang === "bn" ? "font-bengali" : ""}`}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── GALLERY ─────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6" ref={galleryRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="reveal text-primary font-medium text-sm uppercase tracking-widest mb-2">
              {lang === "bn" ? "পরিবেশ" : "Ambience"}
            </p>
            <h2
              className={`reveal text-3xl sm:text-4xl font-bold mb-3 ${
                lang === "bn" ? "font-bengali" : "font-serif"
              }`}
            >
              {lang === "bn" ? "আমাদের ক্যাফে" : "Our Cafe"}
            </h2>
            <p className={`reveal text-muted-foreground ${lang === "bn" ? "font-bengali" : ""}`}>
              {lang === "bn"
                ? "আড্ডার জায়গা, স্মৃতির আলো"
                : "A place of warmth, food, and memories"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden">
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className={`gallery-item reveal rounded-2xl ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={i === 0 ? "aspect-square md:aspect-auto md:h-full min-h-[260px]" : "aspect-square"}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ──────────────────────────────── */}
      <section className="py-16 bg-muted/30 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto" ref={useIntersectionReveal()}>
          <div className="text-center mb-10">
            <h2
              className={`reveal text-3xl font-bold mb-2 ${
                lang === "bn" ? "font-bengali" : "font-serif"
              }`}
            >
              {lang === "bn" ? "কেন চা এ চুমুক?" : "Why Cha A Chumuk?"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                icon: "🌿",
                title: lang === "bn" ? "তাজা উপাদান" : "Fresh Ingredients",
                desc: lang === "bn"
                  ? "প্রতিদিন তাজা উপকরণে তৈরি খাবার।"
                  : "Every dish crafted fresh daily with quality ingredients.",
              },
              {
                icon: "💫",
                title: lang === "bn" ? "অনন্য রেসিপি" : "Unique Recipes",
                desc: lang === "bn"
                  ? "আমাদের বিশেষ ফিউশন রেসিপি যা অন্য কোথাও পাবেন না।"
                  : "Our signature fusion recipes you won't find anywhere else.",
              },
              {
                icon: "❤️",
                title: lang === "bn" ? "ভালোবাসায় তৈরি" : "Made with Love",
                desc: lang === "bn"
                  ? "ভালোবাসা ও যত্নে প্রতিটি খাবার তৈরি।"
                  : "Every meal made with care, love, and passion.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`reveal bg-card border border-card-border rounded-2xl p-6 text-center shadow-sm stat-card ${
                  i === 0 ? "" : i === 1 ? "reveal" : "reveal"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${i * 0.8}s` }}>
                  {item.icon}
                </div>
                <h3 className={`font-bold text-foreground mb-2 ${lang === "bn" ? "font-bengali" : ""}`}>
                  {item.title}
                </h3>
                <p className={`text-sm text-muted-foreground leading-relaxed ${lang === "bn" ? "font-bengali" : ""}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden" ref={ctaRef}>
        <div className="absolute inset-0">
          <img
            src="/cafe-stars.png"
            alt=""
            className="w-full h-full object-cover opacity-25 dark:opacity-15"
          />
          <div className="absolute inset-0 bg-background/82" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center reveal">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Utensils className="w-4 h-4" />
            {lang === "bn" ? "আমাদের সাথে যোগ দিন" : "Join the Experience"}
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-bold mb-5 ${
              lang === "bn" ? "font-bengali" : "font-serif"
            }`}
          >
            {lang === "bn" ? "আজই আসুন আমাদের সাথে!" : "Come Visit Us Today!"}
          </h2>
          <p className={`text-muted-foreground mb-10 text-lg leading-relaxed ${lang === "bn" ? "font-bengali" : ""}`}>
            {lang === "bn"
              ? "খানাকুলের সেরা ফিউশন রেস্তোরাঁয় আপনাকে স্বাগতম।"
              : "Welcome to Khanakul's best fusion restaurant experience."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className={`btn-glow inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl ${
                lang === "bn" ? "font-bengali" : ""
              }`}
            >
              {t(lang, "contactNow")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/menu"
              className={`inline-flex items-center gap-2 border-2 border-primary text-primary px-10 py-4 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all hover:scale-105 active:scale-95 ${
                lang === "bn" ? "font-bengali" : ""
              }`}
            >
              {t(lang, "viewMenu")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
