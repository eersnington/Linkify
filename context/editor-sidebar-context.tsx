"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

import { BasicTemplate } from "@/components/templates/basic";
import { CreativeTemplate } from "@/components/templates/creative";
import { MinimalistTemplate } from "@/components/templates/minimalist";
import { ModernTemplate } from "@/components/templates/modern";
import { ProfessionalTemplate } from "@/components/templates/professional";

// Import other templates here

export const templates = [
  {
    name: "Basic",
    component: BasicTemplate,
    isPremium: false,
    image: "/images/templates/Basic.png",
  },
  {
    name: "Creative",
    component: CreativeTemplate,
    isPremium: true,
    image: "/images/templates/Creative.png",
  },
  {
    name: "Modern",
    component: ModernTemplate,
    isPremium: true,
    image: "/images/templates/Modern.png",
  },
  {
    name: "Minimalist",
    component: MinimalistTemplate,
    isPremium: true,
    image: "/images/templates/Minimalist.png",
  },
  {
    name: "Professional",
    component: ProfessionalTemplate,
    isPremium: true,
    image: "/images/templates/Professional.png",
  },
  // Add other templates here
];

export const themes = [
  { name: "Basic", color: "bg-red-400" },
  { name: "Neon Nights", color: "bg-purple-500" },
  { name: "Forest Serenity", color: "bg-green-500" },
  { name: "Ocean Breeze", color: "bg-blue-400" },
  { name: "Sunset Glow", color: "bg-orange-400" },
];

interface ThemeTemplateContextProps {
  selectedTheme: number | null;
  setSelectedTheme: (index: number | 0) => void;
  selectedTemplate: number | 0;
  setSelectedTemplate: (index: number | 0) => void;
  templates: typeof templates;
  themes: typeof themes;
}

const ThemeTemplateContext = createContext<
  ThemeTemplateContextProps | undefined
>(undefined);

export const ThemeTemplateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | 0>(0);

  return (
    <ThemeTemplateContext.Provider
      value={{
        selectedTheme,
        setSelectedTheme,
        selectedTemplate,
        setSelectedTemplate,
        templates,
        themes,
      }}
    >
      {children}
    </ThemeTemplateContext.Provider>
  );
};

export const useThemeTemplate = () => {
  const context = useContext(ThemeTemplateContext);
  if (!context) {
    throw new Error(
      "useThemeTemplate must be used within a ThemeTemplateProvider",
    );
  }
  return context;
};
