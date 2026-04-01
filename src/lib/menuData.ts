export type MenuItem = {
  id: number;
  nameEn: string;
  nameBn: string;
  price: string;
  category: "breakfast" | "momo" | "chinese" | "noodles" | "biryani" | "rolls";
};

export const menuItems: MenuItem[] = [
  // Breakfast
  { id: 1, nameEn: "Kochuri (4 pcs)", nameBn: "কচুরি (৪ পিস)", price: "₹25", category: "breakfast" },
  { id: 2, nameEn: "Porota (1 pc)", nameBn: "পরোটা (১ পিস)", price: "₹15", category: "breakfast" },
  { id: 3, nameEn: "Lacha Porota", nameBn: "লাচ্ছা পরোটা", price: "₹25", category: "breakfast" },

  // Momo
  { id: 4, nameEn: "Steamed Momo", nameBn: "স্টিমড মোমো", price: "₹50", category: "momo" },
  { id: 5, nameEn: "Fried Momo", nameBn: "ফ্রাইড মোমো", price: "₹60", category: "momo" },
  { id: 6, nameEn: "Pan Fried Momo", nameBn: "প্যান ফ্রাইড মোমো", price: "₹80", category: "momo" },

  // Chinese
  { id: 7, nameEn: "Chicken Pakora (1 pc)", nameBn: "চিকেন পকোড়া (১ পিস)", price: "₹20", category: "chinese" },
  { id: 8, nameEn: "Chicken Lollipop (1 pc)", nameBn: "চিকেন ললিপপ (১ পিস)", price: "₹35", category: "chinese" },
  { id: 9, nameEn: "Chicken Cutlet (1 pc)", nameBn: "চিকেন কাটলেট (১ পিস)", price: "₹30", category: "chinese" },
  { id: 10, nameEn: "Chili Chicken (6 pcs)", nameBn: "চিলি চিকেন (৬ পিস)", price: "₹100", category: "chinese" },
  { id: 11, nameEn: "Jeera Rice", nameBn: "জিরা রাইস", price: "₹70", category: "chinese" },
  { id: 12, nameEn: "Fried Rice", nameBn: "ফ্রাইড রাইস", price: "₹80", category: "chinese" },
  { id: 13, nameEn: "Mix Rice", nameBn: "মিক্স রাইস", price: "₹120", category: "chinese" },
  { id: 14, nameEn: "Chicken Kosha (6 pcs)", nameBn: "চিকেন কোষা (৬ পিস)", price: "₹100", category: "chinese" },
  { id: 15, nameEn: "Butter Chicken Masala (6 pcs)", nameBn: "বাটার চিকেন মাসালা (৬ পিস)", price: "₹100", category: "chinese" },
  { id: 16, nameEn: "Chili Paneer (6 pcs)", nameBn: "চিলি পনির (৬ পিস)", price: "₹100", category: "chinese" },
  { id: 17, nameEn: "Paneer Butter Masala (6 pcs)", nameBn: "পনির বাটার মাসালা (৬ পিস)", price: "₹100", category: "chinese" },

  // Noodles
  { id: 18, nameEn: "Veg Chawmin", nameBn: "ভেজ চাউমিন", price: "₹45", category: "noodles" },
  { id: 19, nameEn: "Egg Chawmin", nameBn: "এগ চাউমিন", price: "₹50–40", category: "noodles" },
  { id: 20, nameEn: "Chicken Chawmin", nameBn: "চিকেন চাউমিন", price: "₹70–50", category: "noodles" },
  { id: 21, nameEn: "Mix Chawmin", nameBn: "মিক্স চাউমিন", price: "₹90–60", category: "noodles" },
  { id: 22, nameEn: "Cha A Chumuk Special Chawmin", nameBn: "চা এ চুমুক স্পেশাল চাউমিন", price: "₹100", category: "noodles" },

  // Biryani
  { id: 23, nameEn: "Alu Biryani", nameBn: "আলু বিরিয়ানি", price: "₹60", category: "biryani" },
  { id: 24, nameEn: "Egg Biryani", nameBn: "এগ বিরিয়ানি", price: "₹70", category: "biryani" },
  { id: 25, nameEn: "Chicken Biryani (with Egg)", nameBn: "চিকেন বিরিয়ানি (এগ সহ)", price: "₹100", category: "biryani" },

  // Rolls
  { id: 26, nameEn: "Egg Roll", nameBn: "এগ রোল", price: "₹35", category: "rolls" },
  { id: 27, nameEn: "Chicken Roll", nameBn: "চিকেন রোল", price: "₹50", category: "rolls" },
  { id: 28, nameEn: "Egg Chicken Roll", nameBn: "এগ চিকেন রোল", price: "₹60", category: "rolls" },
  { id: 29, nameEn: "Paneer Roll", nameBn: "পনির রোল", price: "₹50", category: "rolls" },
  { id: 30, nameEn: "Cha A Chumuk Special Roll", nameBn: "চা এ চুমুক স্পেশাল রোল", price: "₹90", category: "rolls" },
];
