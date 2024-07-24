import {
  Dancing_Script,
  DM_Serif_Display,
  Playfair_Display,
} from "next/font/google";

export const pf_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export const dm_display = DM_Serif_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const dancing_script = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
});
