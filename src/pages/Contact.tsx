import { useAppStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
  const { lang } = useAppStore();
  const ref1 = useReveal();
  const ref2 = useReveal();

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative py-20 px-4 sm:px-6 overflow-hidden" ref={ref1}>
        <div className="absolute inset-0">
          <img
            src="/cafe-interior.jpg"
            alt="Cafe interior"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center reveal">
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            {lang === "bn" ? "যোগাযোগ করুন" : "Get In Touch"}
          </span>
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              lang === "bn" ? "font-bengali" : "font-serif"
            }`}
          >
            {t(lang, "contactTitle")}
          </h1>
          <p className={`text-muted-foreground text-lg ${lang === "bn" ? "font-bengali" : ""}`}>
            {t(lang, "contactSubtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6" ref={ref2}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Cards */}
          <div className="space-y-5">
            {/* Phone */}
            <div className="reveal bg-card border border-card-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-2xl flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-foreground text-lg mb-1 ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    {t(lang, "callUs")}
                  </h3>
                  <p className="text-2xl font-bold text-primary">+91 79474 32180</p>
                  <a
                    href="tel:+917947432180"
                    className={`inline-block mt-3 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-all hover:scale-105 ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    {t(lang, "callUs")}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="reveal bg-card border border-card-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-2xl flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-foreground text-lg mb-1 ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    {t(lang, "whatsapp")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {lang === "bn"
                      ? "হোয়াটসঅ্যাপে সরাসরি কথা বলুন"
                      : "Chat with us directly on WhatsApp"}
                  </p>
                  <a
                    href="https://wa.me/917947432180"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`whatsapp-btn inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-600 transition-all hover:scale-105 ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {t(lang, "whatsapp")}
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="reveal bg-card border border-card-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-2xl flex-shrink-0">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-foreground text-lg mb-1 ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    {t(lang, "location")}
                  </h3>
                  <p
                    className={`text-muted-foreground mb-3 ${lang === "bn" ? "font-bengali" : ""}`}
                  >
                    {t(lang, "locationText")}
                  </p>
                  <a
                    href="https://maps.google.com/?q=22.728266722814023,87.86883833411817"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline"
                  >
                    <MapPin className="w-4 h-4" />
                    {lang === "bn" ? "গুগল ম্যাপে দেখুন" : "View on Google Maps"}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="reveal bg-card border border-card-border rounded-3xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex-shrink-0">
                  <Clock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3
                    className={`font-semibold text-foreground text-lg mb-1 ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    {t(lang, "openingHours")}
                  </h3>
                  <p
                    className={`text-foreground font-medium ${
                      lang === "bn" ? "font-bengali" : ""
                    }`}
                  >
                    {t(lang, "hoursText")}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-600 font-medium">
                      {lang === "bn" ? "এখন খোলা" : "Open Now"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="reveal">
            <div className="bg-card border border-card-border rounded-3xl overflow-hidden shadow-sm h-full min-h-[400px] flex flex-col">
              <div className="bg-muted px-5 py-3 border-b border-border flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span
                  className={`text-sm font-medium ${lang === "bn" ? "font-bengali" : ""}`}
                >
                  {t(lang, "mapPlaceholder")}
                </span>
              </div>
              <div className="flex-1">
                <iframe
                  src="https://maps.google.com/maps?q=22.728266722814023,87.86883833411817&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[400px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cha A Chumuk Location"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Gallery strip */}
        <div className="mt-14 reveal">
          <h2
            className={`text-2xl font-bold mb-6 text-center ${
              lang === "bn" ? "font-bengali" : "font-serif"
            }`}
          >
            {lang === "bn" ? "আমাদের পরিবেশ" : "Our Ambience"}
          </h2>
          <div className="grid grid-cols-3 gap-3 rounded-3xl overflow-hidden">
            {["/cafe-crowd.jpg", "/cafe-dining.png", "/cafe-stars.png"].map((src, i) => (
              <div key={i} className="aspect-video overflow-hidden">
                <img
                  src={src}
                  alt={`Cafe ambience ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
