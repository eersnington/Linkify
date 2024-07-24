// layoutsAndThemes.ts

export type Layout = {
  name: string;
  isPremium: boolean;
  color: string;
};

export type Theme = {
  name: string;
  color: string;
};

export const templates: Layout[] = [
  { name: "Basic", isPremium: false, color: "bg-gray-200" },
  { name: "Modern", isPremium: true, color: "bg-blue-500" },
  { name: "Minimalist", isPremium: true, color: "bg-green-200" },
  { name: "Creative", isPremium: true, color: "bg-[#d4bc94]" },
  { name: "Professional", isPremium: true, color: "bg-red-200" },
];

export const themes: Theme[] = [
  { name: "Basic", color: "bg-red-500" },
  { name: "Neon Nights", color: "bg-purple-500" },
  { name: "Forest Serenity", color: "bg-green-500" },
  { name: "Ocean Breeze", color: "bg-blue-500" },
  { name: "Sunset Glow", color: "bg-orange-500" },
];
