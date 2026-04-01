import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { Star, Send, Trash2, MessageCircle, AlertCircle } from "lucide-react";

const LS_REVIEWS = "cac_reviews_v2";
const LS_DEVICE = "cac_device_id";
const LS_TIMES = "cac_review_times";
const LS_TOTAL = "cac_review_total";
const MAX_TOTAL = 5;
const MAX_PER_WINDOW = 2;
const WINDOW_MS = 10 * 60 * 1000;

const BAD_WORDS = [
  "fuck","fucking","fucker","fuk","f*ck","f**k","fck","fucked","fuking",
  "sex","sexy","sexting","sexual",
  "bitch","b*tch","btch",
  "bastard","basterd",
  "shit","sh*t","$hit",
  "ass","asshole","a**hole","arse",
  "cock","c*ck","d*ck","dick","penis","vagina",
  "pussy","cunt","boob","boobs","breast",
  "whore","slut","rape","rapist",
  "nude","naked","porn","porno","pornography",
  "nigger","nigga","faggot","fag",
  "kill yourself","kys","suicide",
  "choda","chuda","chodon","chudon",
  "magi","maagi","beshya","bessha",
  "harami","haram","khankir","randi","raandi",
  "loda","lora","bhoda","chul","chhinal",
  "চোদা","চুদ","চোদ","শালা","মাদারচোদ","বেশ্যা",
  "হারামি","খানকি","রাণ্ডী","ভোদা","লোদা","মাগি","মাগী","ছিনাল",
];

function filterBadWords(text: string): string {
  let out = text;
  BAD_WORDS.forEach((w) => {
    const re = new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    out = out.replace(re, "*".repeat(w.length));
  });
  return out;
}

function genDeviceId(): string {
  let id = localStorage.getItem(LS_DEVICE);
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(LS_DEVICE, id);
  }
  return id;
}

interface Review {
  id: string;
  deviceId: string;
  name: string;
  message: string;
  stars: number;
  timestamp: number;
}

function loadReviews(): Review[] {
  try { return JSON.parse(localStorage.getItem(LS_REVIEWS) || "[]"); } catch { return []; }
}
function saveReviews(r: Review[]) {
  try { localStorage.setItem(LS_REVIEWS, JSON.stringify(r)); } catch {}
}

function getRateLimitInfo(): { recentCount: number; totalCount: number; nextAllowed: number } {
  const times: number[] = JSON.parse(localStorage.getItem(LS_TIMES) || "[]");
  const now = Date.now();
  const recent = times.filter((t) => now - t < WINDOW_MS);
  const total = Number(localStorage.getItem(LS_TOTAL) || "0");
  const oldest = recent.length >= MAX_PER_WINDOW ? recent[0] : null;
  const nextAllowed = oldest ? oldest + WINDOW_MS : 0;
  return { recentCount: recent.length, totalCount: total, nextAllowed };
}

function recordSend() {
  const times: number[] = JSON.parse(localStorage.getItem(LS_TIMES) || "[]");
  const now = Date.now();
  const recent = times.filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  localStorage.setItem(LS_TIMES, JSON.stringify(recent));
  const total = Number(localStorage.getItem(LS_TOTAL) || "0") + 1;
  localStorage.setItem(LS_TOTAL, String(total));
}

function StarDisplay({ value, max = 5, size = "md" }: { value: number; max?: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-8 h-8" : size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const filled = i + 1 <= Math.floor(value);
        const half = !filled && i + 0.5 <= value;
        return (
          <span key={i} className="relative">
            <Star className={`${sz} text-muted/30`} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: filled ? "100%" : half ? "50%" : "0%" }}
            >
              <Star className={`${sz} fill-yellow-400 text-yellow-400`} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hov, setHov] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHov(s)}
          onMouseLeave={() => setHov(0)}
          onClick={() => onChange(s)}
          className="p-0.5 rounded transition-transform duration-100 active:scale-90 hover:scale-110"
          aria-label={`${s} star`}
        >
          <Star
            className="w-8 h-8 transition-all duration-150"
            style={{
              fill: s <= (hov || value) ? "#FACC15" : "none",
              color: s <= (hov || value) ? "#FACC15" : "#9CA3AF",
              transform: s <= (hov || value) ? "scale(1.1)" : "scale(1)",
            }}
          />
        </button>
      ))}
    </div>
  );
}

function formatTime(ts: number, lang: string) {
  const diff = Date.now() - ts;
  if (diff < 60000) return lang === "bn" ? "এইমাত্র" : "just now";
  if (diff < 3600000) return lang === "bn" ? `${Math.floor(diff / 60000)} মিনিট আগে` : `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return lang === "bn" ? `${Math.floor(diff / 3600000)} ঘণ্টা আগে` : `${Math.floor(diff / 3600000)}h ago`;
  return new Date(ts).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-IN", { day: "numeric", month: "short" });
}

export default function Reviews() {
  const { lang } = useAppStore();
  const [reviews, setReviews] = useState<Review[]>(loadReviews);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const deviceId = useRef(genDeviceId());
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const avgStars = reviews.length ? reviews.reduce((a, r) => a + r.stars, 0) / reviews.length : 0;

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleSubmit = () => {
    setError("");
    if (!name.trim()) {
      setError(lang === "bn" ? "নাম লিখুন।" : "Please enter your name.");
      return;
    }
    if (stars === 0) {
      setError(lang === "bn" ? "স্টার রেটিং দিন।" : "Please select a star rating.");
      return;
    }
    if (!message.trim()) {
      setError(lang === "bn" ? "মতামত লিখুন।" : "Please write your review.");
      return;
    }
    if (message.trim().length < 3) {
      setError(lang === "bn" ? "মতামত খুব ছোট।" : "Review is too short.");
      return;
    }

    const { recentCount, totalCount, nextAllowed } = getRateLimitInfo();

    if (totalCount >= MAX_TOTAL) {
      setError(lang === "bn"
        ? `আপনি সর্বোচ্চ ${MAX_TOTAL} বার রিভিউ পাঠাতে পারবেন।`
        : `You can only submit ${MAX_TOTAL} reviews from this device.`);
      return;
    }
    if (recentCount >= MAX_PER_WINDOW) {
      const secsLeft = Math.ceil((nextAllowed - Date.now()) / 1000);
      setCountdown(secsLeft);
      setError(lang === "bn"
        ? `প্রতি ১০ মিনিটে সর্বোচ্চ ২টি রিভিউ পাঠাতে পারবেন। ${Math.ceil(secsLeft / 60)} মিনিট অপেক্ষা করুন।`
        : `You can only send 2 reviews per 10 minutes. Wait ${Math.ceil(secsLeft / 60)} min.`);
      return;
    }

    setSending(true);
    const filtered = filterBadWords(message.trim());
    const filteredName = filterBadWords(name.trim());

    const newReview: Review = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      deviceId: deviceId.current,
      name: filteredName,
      message: filtered,
      stars,
      timestamp: Date.now(),
    };

    recordSend();
    const next = [newReview, ...reviews];
    saveReviews(next);
    setReviews(next);
    setName("");
    setMessage("");
    setStars(0);
    setSending(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    const next = reviews.filter((r) => r.id !== id);
    saveReviews(next);
    setReviews(next);
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400/10 via-background to-primary/10 py-14 mb-8">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-yellow-400/5 animate-float"
              style={{ width: `${50 + i * 40}px`, height: `${50 + i * 40}px`, left: `${8 + i * 18}%`, top: `${10 + (i % 3) * 25}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${5 + i}s` }}
            />
          ))}
        </div>
        <div className="relative text-center px-4">
          <span className="inline-block bg-yellow-400/10 text-yellow-600 dark:text-yellow-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
            {lang === "bn" ? "গ্রাহক মতামত" : "Customer Reviews"}
          </span>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${lang === "bn" ? "font-bengali" : "font-serif"}`}>
            {lang === "bn" ? "আপনার মতামত দিন" : "Share Your Experience"}
          </h1>

          {/* Average stars */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1 justify-center">
              {[1,2,3,4,5].map((s) => (
                <Star
                  key={s}
                  className="w-9 h-9 transition-all duration-500"
                  style={{
                    fill: s <= Math.round(avgStars) ? "#FACC15" : "none",
                    color: s <= Math.round(avgStars) ? "#FACC15" : "#D1D5DB",
                    filter: s <= Math.round(avgStars) ? "drop-shadow(0 0 6px rgba(250,204,21,0.6))" : "none",
                    transform: s <= Math.round(avgStars) ? "scale(1.1)" : "scale(1)",
                  }}
                />
              ))}
            </div>
            {reviews.length > 0 && (
              <p className="text-muted-foreground text-sm">
                <span className="font-bold text-foreground text-lg">{avgStars.toFixed(1)}</span>
                {" "}{lang === "bn" ? `/ ৫ (${reviews.length} জন গ্রাহক)` : `/ 5 (${reviews.length} reviews)`}
              </p>
            )}
            {reviews.length === 0 && (
              <p className="text-muted-foreground text-sm">
                {lang === "bn" ? "এখনো কোনো রিভিউ নেই।" : "No reviews yet. Be the first!"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Rate limit info */}
        {(() => { const { totalCount, recentCount } = getRateLimitInfo(); return totalCount < MAX_TOTAL && (
          <div className="flex flex-wrap gap-2 justify-center mb-6 text-xs text-muted-foreground">
            <span className="bg-muted px-3 py-1 rounded-full">
              {lang === "bn" ? `প্রতি ১০ মিনিটে সর্বোচ্চ ২টি রিভিউ` : `Max 2 reviews per 10 min`}
            </span>
            <span className="bg-muted px-3 py-1 rounded-full">
              {lang === "bn" ? `মোট সীমা: ${MAX_TOTAL - totalCount}টি বাকি` : `${MAX_TOTAL - totalCount} reviews remaining`}
            </span>
            {recentCount > 0 && (
              <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {lang === "bn" ? `এই ১০ মিনিটে ${recentCount}/২টি ব্যবহার হয়েছে` : `${recentCount}/2 used this window`}
              </span>
            )}
          </div>
        )})()}

        {/* Review Form */}
        {(() => { const { totalCount } = getRateLimitInfo(); return totalCount < MAX_TOTAL ? (
          <div className="card-shadow rounded-2xl border border-border bg-card p-5 sm:p-6 mb-8">
            <h2 className={`font-semibold text-base mb-4 flex items-center gap-2 ${lang === "bn" ? "font-bengali" : ""}`}>
              <MessageCircle className="w-5 h-5 text-primary" />
              {lang === "bn" ? "রিভিউ লিখুন" : "Write a Review"}
            </h2>

            <div className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className={`text-sm font-medium text-muted-foreground block mb-1.5 ${lang === "bn" ? "font-bengali" : ""}`}>
                  {lang === "bn" ? "আপনার নাম *" : "Your Name *"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  placeholder={lang === "bn" ? "নাম লিখুন..." : "Enter your name..."}
                  className={`w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all ${lang === "bn" ? "font-bengali" : ""}`}
                />
              </div>

              {/* Stars */}
              <div>
                <label className={`text-sm font-medium text-muted-foreground block mb-2 ${lang === "bn" ? "font-bengali" : ""}`}>
                  {lang === "bn" ? "রেটিং দিন *" : "Your Rating *"}
                </label>
                <StarPicker value={stars} onChange={setStars} />
                {stars > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {["","⭐ Poor","⭐⭐ Fair","⭐⭐⭐ Good","⭐⭐⭐⭐ Very Good","⭐⭐⭐⭐⭐ Excellent"][stars]}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className={`text-sm font-medium text-muted-foreground block mb-1.5 ${lang === "bn" ? "font-bengali" : ""}`}>
                  {lang === "bn" ? "আপনার মতামত *" : "Your Review *"}
                </label>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                  rows={3}
                  placeholder={lang === "bn" ? "আপনার অভিজ্ঞতা শেয়ার করুন..." : "Share your experience..."}
                  className={`w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none transition-all ${lang === "bn" ? "font-bengali" : ""}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) e.preventDefault();
                  }}
                />
                <p className="text-xs text-muted-foreground/60 mt-1 text-right">{message.length}/500</p>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-xl animate-fade-in-up">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className={lang === "bn" ? "font-bengali" : ""}>{error}</span>
                </div>
              )}

              {/* Countdown */}
              {countdown > 0 && (
                <div className="text-center text-sm text-muted-foreground">
                  <span className="font-mono bg-muted px-3 py-1 rounded-full">
                    {String(Math.floor(countdown / 60)).padStart(2, "0")}:{String(countdown % 60).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className={`text-center text-green-600 dark:text-green-400 text-sm font-medium animate-fade-in-up ${lang === "bn" ? "font-bengali" : ""}`}>
                  {lang === "bn" ? "✅ রিভিউ সফলভাবে পাঠানো হয়েছে!" : "✅ Review submitted successfully!"}
                </div>
              )}

              {/* Send button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={sending || countdown > 0}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/85 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40"
                >
                  <Send className="w-4 h-4" />
                  <span className={lang === "bn" ? "font-bengali" : ""}>
                    {sending ? (lang === "bn" ? "পাঠানো হচ্ছে..." : "Sending...") : (lang === "bn" ? "পাঠান" : "Send")}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-shadow rounded-2xl border border-border bg-card p-6 mb-8 text-center">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className={`text-muted-foreground text-sm ${lang === "bn" ? "font-bengali" : ""}`}>
              {lang === "bn"
                ? `এই ডিভাইস থেকে সর্বোচ্চ ${MAX_TOTAL}টি রিভিউ পাঠানো হয়ে গেছে।`
                : `You've reached the ${MAX_TOTAL}-review limit from this device.`}
            </p>
          </div>
        )})()}

        {/* Reviews list */}
        {reviews.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className={`font-semibold text-sm text-muted-foreground uppercase tracking-widest mb-1 ${lang === "bn" ? "font-bengali" : ""}`}>
              {lang === "bn" ? `সকল মতামত (${reviews.length})` : `All Reviews (${reviews.length})`}
            </h3>
            {reviews.map((review, idx) => (
              <div
                key={review.id}
                className="card-shadow rounded-2xl border border-border bg-card p-4 sm:p-5"
                style={{ animation: `fadeInUp 0.4s ease ${idx * 0.06}s both` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-base">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className={`font-semibold text-sm truncate ${lang === "bn" ? "font-bengali" : ""}`}>
                        {review.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarDisplay value={review.stars} size="sm" />
                        <span className="text-xs text-muted-foreground">{formatTime(review.timestamp, lang)}</span>
                      </div>
                    </div>
                  </div>
                  {review.deviceId === deviceId.current && (
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all duration-200 hover:scale-110 active:scale-90 flex-shrink-0"
                      title={lang === "bn" ? "মুছুন" : "Delete"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className={`mt-3 text-sm text-foreground/90 leading-relaxed ${lang === "bn" ? "font-bengali" : ""}`}>
                  {review.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className={lang === "bn" ? "font-bengali" : ""}>
              {lang === "bn" ? "এখনো কোনো মতামত নেই।" : "No reviews yet. Be the first to share!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
