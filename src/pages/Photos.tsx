import { useState, useEffect, useCallback, useRef } from "react";
import { useAppStore } from "@/lib/store";
import type { Lang } from "@/lib/i18n";
import { X, Download, Share2, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import img01 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-twh7ltpixz.av_1774778105938.png";
import img02 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-rhz145yi0w.av_1774778105953.png";
import img03 from "@assets/cha-a-chumuk-khanakul-hooghly-coffee-shops-ba89rw6kzz_1774778105954.png";
import img04 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-d1tar7ayhp_1774778105954.png";
import img05 from "@assets/cha-a-chumuk-khanakul-hooghly-coffee-shops-iijsm4aiev.avif_1774778105956.png";
import img06 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-9v74rp4liv_1774778105957.jpg";
import img07 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-749ljoomhp_1774778105958.jpg";
import img08 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-2enu9gqnh7_1774778105958.jpg";
import img09 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-fgqplpj9s2_1774778105959.jpg";
import img10 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-5w86b327vr.av_1774778105960.png";
import img11 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-6y2f6td0qn_1774778105961.jpg";
import img12 from "@assets/cha-a-chumuk-khanakul-hooghly-coffee-shops-ba89rw6kzz.avif_1774778105962.png";
import img13 from "@assets/cha-a-chumuk-khanakul-hooghly-fusion-restaurants-jun0wft7na.av_1774778105962.png";
import img14 from "@assets/cha-a-chumuk-khanakul-hooghly-coffee-shops-8i2167zfnv_1774778105963.png";

interface Photo {
  id: string;
  src: string;
  caption: string;
  captionBn: string;
  tag: string;
}

const PHOTOS: Photo[] = [
  { id: "p03", src: img03, caption: "Indoor Dining Area", captionBn: "ইনডোর ডাইনিং এরিয়া", tag: "Ambience" },
  { id: "p06", src: img06, caption: "Tandoori Platter", captionBn: "তন্দুরি প্লেটার", tag: "Food" },
  { id: "p07", src: img07, caption: "Outdoor Evening Crowd", captionBn: "বাইরের সন্ধ্যা ভিড়", tag: "Ambience" },
  { id: "p08", src: img08, caption: "Special Tandoori Chicken", captionBn: "স্পেশাল তন্দুরি চিকেন", tag: "Food" },
  { id: "p05", src: img05, caption: "Dal Makhani Bucket", captionBn: "ডাল মাখানি বাকেট", tag: "Food" },
  { id: "p14", src: img14, caption: "Outdoor Star Decor Night", captionBn: "আউটডোর স্টার ডেকোর নাইট", tag: "Ambience" },
  { id: "p02", src: img02, caption: "Herb Chicken Special", captionBn: "হার্ব চিকেন স্পেশাল", tag: "Food" },
  { id: "p04", src: img04, caption: "Tea & Snacks Combo", captionBn: "চা ও স্ন্যাকস কম্বো", tag: "Food" },
  { id: "p09", src: img09, caption: "Chicken Legs Plate", captionBn: "চিকেন লেগস প্লেট", tag: "Food" },
  { id: "p11", src: img11, caption: "Outdoor Seating Area", captionBn: "আউটডোর বসার জায়গা", tag: "Ambience" },
  { id: "p01", src: img01, caption: "Cafe Signboard", captionBn: "ক্যাফে সাইনবোর্ড", tag: "Ambience" },
  { id: "p12", src: img12, caption: "Busy Restaurant Interior", captionBn: "ব্যস্ত রেস্তোরাঁ ইন্টেরিয়র", tag: "Ambience" },
  { id: "p10", src: img10, caption: "Cha A Chumuk Brand", captionBn: "চা এ চুমুক ব্র্যান্ড", tag: "Brand" },
  { id: "p13", src: img13, caption: "Special Menu Card", captionBn: "স্পেশাল মেনু কার্ড", tag: "Menu" },
];

const ALL_TAGS = ["All", "Food", "Ambience", "Brand", "Menu"];

interface PhotoCardProps {
  photo: Photo;
  index: number;
  visible: boolean;
  lang: Lang;
  onOpen: () => void;
  onShare: () => void;
  onDownload: () => void;
}

function PhotoCard({ photo, index, visible, lang, onOpen, onShare, onDownload }: PhotoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: dy * 5, y: -dx * 5 });
    setShimmerPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const delay = `${Math.min(index, 10) * 55}ms`;

  return (
    <div
      ref={cardRef}
      className="break-inside-avoid relative rounded-2xl cursor-pointer overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0) scale(${hovered ? 1.02 : 1})`
          : "translateY(28px) scale(0.95)",
        transition: visible
          ? `opacity 0.55s cubic-bezier(.22,.68,0,1.2) ${delay}, transform 0.55s cubic-bezier(.22,.68,0,1.2) ${delay}`
          : "none",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      onClick={onOpen}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-muted z-10 rounded-2xl overflow-hidden min-h-[120px]">
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s ease infinite" }} />
        </div>
      )}

      <img
        src={photo.src}
        alt={photo.caption}
        className="w-full h-auto object-cover block"
        style={{ transform: hovered ? "scale(1.12)" : "scale(1)", transition: "transform 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94)", willChange: hovered ? "transform" : "auto" }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />

      {hovered && (
        <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(circle 100px at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(255,255,255,0.12) 0%, transparent 70%)` }} />
      )}

      <div className="absolute inset-0 flex flex-col justify-end p-3 rounded-2xl"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)", opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease" }}>
        <p className={`text-white text-sm font-semibold leading-tight mb-2 drop-shadow ${lang === "bn" ? "font-bengali" : ""}`}
          style={{ transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2) 0.05s" }}>
          {lang === "bn" ? photo.captionBn : photo.caption}
        </p>
        <div className="flex gap-2 flex-wrap"
          style={{ transform: hovered ? "translateY(0)" : "translateY(10px)", transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2) 0.08s" }}>
          <button onClick={(e) => { e.stopPropagation(); onShare(); }}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/40 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm active:scale-95"
            style={{ transition: "background-color 0.15s, transform 0.12s" }}>
            <Share2 className="w-3 h-3" />{lang === "bn" ? "শেয়ার" : "Share"}
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDownload(); }}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/40 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm active:scale-95"
            style={{ transition: "background-color 0.15s, transform 0.12s" }}>
            <Download className="w-3 h-3" />{lang === "bn" ? "ডাউনলোড" : "Download"}
          </button>
        </div>
      </div>

      <span className={`absolute top-2 left-2 bg-primary/85 backdrop-blur-sm text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full`}
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.9)", transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(.22,.68,0,1.2)" }}>
        {photo.tag}
      </span>

      <div className="absolute top-2 right-2"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.9)", transition: "opacity 0.3s ease 0.05s, transform 0.3s cubic-bezier(.22,.68,0,1.2) 0.05s" }}>
        <div className="w-7 h-7 bg-black/35 backdrop-blur-sm rounded-full flex items-center justify-center">
          <ZoomIn className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function Photos() {
  const { lang } = useAppStore();
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean[]>([]);

  const filtered = activeTag === "All" ? PHOTOS : PHOTOS.filter((p) => p.tag === activeTag);

  useEffect(() => {
    setVisible(Array(filtered.length).fill(false));
    const timers = filtered.map((_, i) =>
      setTimeout(() => setVisible((prev) => { const next = [...prev]; next[i] = true; return next; }), i * 60)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeTag]);

  const closeLightbox = () => setLightboxIdx(null);
  const prev = useCallback(() => { if (lightboxIdx === null) return; setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length); }, [lightboxIdx, filtered.length]);
  const next = useCallback(() => { if (lightboxIdx === null) return; setLightboxIdx((lightboxIdx + 1) % filtered.length); }, [lightboxIdx, filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightboxIdx, prev, next]);

  const handleDownload = (src: string, caption: string) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = `cha-a-chumuk-${caption.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    a.click();
  };

  const handleShare = async (src: string, caption: string) => {
    const url = window.location.origin + src;
    if (navigator.share) { try { await navigator.share({ title: "Cha A Chumuk — " + caption, url }); } catch {} }
    else { await navigator.clipboard.writeText(url); setShareMsg(lang === "bn" ? "লিঙ্ক কপি!" : "Link copied!"); setTimeout(() => setShareMsg(null), 2000); }
  };

  const tagLabel = (tag: string) => {
    if (lang !== "bn") return tag;
    return { All: "সব", Food: "খাবার", Ambience: "পরিবেশ", Brand: "ব্র্যান্ড", Menu: "মেনু" }[tag] ?? tag;
  };

  const current = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div className="min-h-screen pt-20 pb-16">
      {shareMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-full shadow-lg animate-fade-in-down pointer-events-none">
          {shareMsg}
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-14 mb-8">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary/5 animate-float"
              style={{ width: `${60 + i * 30}px`, height: `${60 + i * 30}px`, left: `${10 + i * 15}%`, top: `${10 + (i % 3) * 30}%`, animationDelay: `${i * 0.5}s`, animationDuration: `${4 + i}s` }} />
          ))}
        </div>
        <div className="relative text-center px-4">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
            {lang === "bn" ? "ফটো গ্যালারি" : "Photo Gallery"}
          </span>
          <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${lang === "bn" ? "font-bengali" : "font-serif"}`}>
            {lang === "bn" ? "আমাদের মুহূর্তগুলো" : "Our Moments"}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            {lang === "bn" ? "আমাদের ক্যাফের সেরা মুহূর্ত, খাবার ও পরিবেশের ঝলক দেখুন।" : "A glimpse into our food, ambience, and the moments that make Cha A Chumuk special."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {ALL_TAGS.map((tag) => {
            const count = tag === "All" ? PHOTOS.length : PHOTOS.filter((p) => p.tag === tag).length;
            return (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 ${activeTag === tag ? "bg-primary text-primary-foreground scale-105 shadow-md shadow-primary/30" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary hover:scale-105"}`}>
                {tagLabel(tag)}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTag === tag ? "bg-white/20" : "bg-primary/10 text-primary"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} visible={!!visible[i]} lang={lang}
              onOpen={() => setLightboxIdx(i)}
              onShare={() => handleShare(photo.src, photo.caption)}
              onDownload={() => handleDownload(photo.src, photo.caption)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {current && lightboxIdx !== null && (
        <div className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-md flex items-center justify-center p-4" onClick={closeLightbox} style={{ animation: "fadeIn 0.2s ease" }}>
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeLightbox} className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white hover:scale-110 hover:rotate-90" style={{ transition: "background-color 0.2s, transform 0.2s" }}>
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ animation: "scaleIn 0.28s ease" }}>
              <img src={current.src} alt={current.caption} className="w-full max-h-[68vh] object-contain bg-black" />
            </div>
            <div className="mt-4 w-full flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className={`text-white font-semibold text-base ${lang === "bn" ? "font-bengali" : ""}`}>{lang === "bn" ? current.captionBn : current.caption}</p>
                <p className="text-white/50 text-xs mt-0.5">{lightboxIdx + 1} / {filtered.length}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleShare(current.src, current.caption)} className="flex items-center gap-1.5 bg-white/10 hover:bg-white/25 text-white text-sm px-4 py-2 rounded-full hover:scale-105" style={{ transition: "background-color 0.2s, transform 0.15s" }}>
                  <Share2 className="w-4 h-4" />{lang === "bn" ? "শেয়ার" : "Share"}
                </button>
                <button onClick={() => handleDownload(current.src, current.caption)} className="flex items-center gap-1.5 bg-primary hover:bg-primary/80 text-primary-foreground text-sm px-4 py-2 rounded-full hover:scale-105" style={{ transition: "background-color 0.2s, transform 0.15s" }}>
                  <Download className="w-4 h-4" />{lang === "bn" ? "ডাউনলোড" : "Download"}
                </button>
              </div>
            </div>
            <button onClick={prev} className="absolute left-0 top-[40%] -translate-x-4 w-11 h-11 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white hover:scale-110" style={{ transition: "background-color 0.2s, transform 0.2s" }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-0 top-[40%] translate-x-4 w-11 h-11 bg-white/10 hover:bg-white/30 rounded-full flex items-center justify-center text-white hover:scale-110" style={{ transition: "background-color 0.2s, transform 0.2s" }}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
