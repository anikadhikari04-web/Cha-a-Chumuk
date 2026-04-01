export type Lang = "en" | "bn";

export const translations = {
  en: {
    // Nav
    home: "Home",
    menu: "Menu",
    photos: "Photos",
    contact: "Contact",
    reviews: "Reviews",
    langToggle: "বাংলা",
    themeToggle: "Dark Mode",
    themeLightToggle: "Light Mode",

    // Hero
    heroTagline: "Cha a Chumuk",
    heroSubtitle: "Your favorite fusion café in Khanakul, Hooghly — where every sip starts a story.",
    viewMenu: "View Menu",
    contactNow: "Contact Now",

    // Popular items
    popularTitle: "Our Popular Dishes",
    popularSubtitle: "Handpicked favorites loved by our guests",

    // Menu page
    menuTitle: "Our Menu",
    menuSubtitle: "Fresh food, great flavors — made with love in Khanakul",
    searchPlaceholder: "Search for food items...",
    searchLabel: "Search Menu",
    allCategories: "All",
    noResults: "No items found. Try a different search.",
    menuImageTitle: "Special Menu Card",
    menuImageSubtitle: "Our full menu at a glance",

    // Categories
    catBreakfast: "Breakfast",
    catMomo: "Momo",
    catChinese: "Chinese",
    catNoodles: "Noodles",
    catBiryani: "Biryani",
    catRolls: "Rolls",

    // Contact page
    contactTitle: "Find Us",
    contactSubtitle: "Come visit us in Khanakul, Hooghly",
    callUs: "Call Us",
    whatsapp: "WhatsApp Chat",
    location: "Location",
    locationText: "Khanakul, Hooghly, West Bengal, India",
    mapPlaceholder: "Khanakul, Hooghly, West Bengal",
    openingHours: "Opening Hours",
    hoursText: "Daily: 8:00 AM – 11:00 PM",

    // Footer
    footerTagline: "চা এ চুমুক, আড্ডা জমুক",
    footerDesc: "Cha A Chumuk — Fusion Tea Shop & Restaurant",
    footerLocation: "Khanakul, Hooghly, West Bengal, India",
    footerLinks: "Quick Links",
    footerFollow: "Follow Us",
    footerRights: "All rights reserved.",
  },
  bn: {
    // Nav
    home: "হোম",
    menu: "মেনু",
    photos: "ফটো",
    contact: "যোগাযোগ",
    reviews: "রিভিউ",
    langToggle: "English",
    themeToggle: "ডার্ক মোড",
    themeLightToggle: "লাইট মোড",

    // Hero
    heroTagline: "চা এ চুমুক, আড্ডা জমুক",
    heroSubtitle: "খানাকুল, হুগলির পছন্দের ফিউশন ক্যাফে — যেখানে প্রতিটি চুমুক একটি গল্পের শুরু।",
    viewMenu: "মেনু দেখুন",
    contactNow: "এখনই যোগাযোগ করুন",

    // Popular items
    popularTitle: "আমাদের জনপ্রিয় খাবার",
    popularSubtitle: "আমাদের অতিথিদের প্রিয় খাবারসমূহ",

    // Menu page
    menuTitle: "আমাদের মেনু",
    menuSubtitle: "তাজা খাবার, দারুণ স্বাদ — খানাকুলে ভালোবাসায় তৈরি",
    searchPlaceholder: "খাবার খুঁজুন...",
    searchLabel: "মেনু সার্চ করুন",
    allCategories: "সব",
    noResults: "কোনো আইটেম পাওয়া যায়নি। অন্য কিছু সার্চ করুন।",
    menuImageTitle: "বিশেষ মেনু কার্ড",
    menuImageSubtitle: "এক নজরে আমাদের পুরো মেনু",

    // Categories
    catBreakfast: "ব্রেকফাস্ট",
    catMomo: "মোমো",
    catChinese: "চাইনিজ",
    catNoodles: "নুডলস",
    catBiryani: "বিরিয়ানি",
    catRolls: "রোলস",

    // Contact page
    contactTitle: "আমাদের খুঁজুন",
    contactSubtitle: "খানাকুল, হুগলিতে আমাদের দেখতে আসুন",
    callUs: "কল করুন",
    whatsapp: "হোয়াটসঅ্যাপ চ্যাট",
    location: "অবস্থান",
    locationText: "খানাকুল, হুগলি, পশ্চিমবঙ্গ, ভারত",
    mapPlaceholder: "খানাকুল, হুগলি, পশ্চিমবঙ্গ",
    openingHours: "খোলার সময়",
    hoursText: "প্রতিদিন: সকাল ৮টা – রাত ১১টা",

    // Footer
    footerTagline: "চা এ চুমুক, আড্ডা জমুক",
    footerDesc: "চা এ চুমুক — ফিউশন চা দোকান ও রেস্তোরাঁ",
    footerLocation: "খানাকুল, হুগলি, পশ্চিমবঙ্গ, ভারত",
    footerLinks: "দ্রুত লিঙ্ক",
    footerFollow: "আমাদের অনুসরণ করুন",
    footerRights: "সর্বস্বত্ব সংরক্ষিত।",
  },
};

export function t(lang: Lang, key: keyof typeof translations["en"]): string {
  return translations[lang][key] ?? translations["en"][key];
}
