import {
  Dancing_Script,
  DM_Serif_Display,
  Playfair_Display,
  Anton,
  Lato,
  Open_Sans,
} from 'next/font/google';

import { fontImpact } from '@/assets/fonts';

export const pf_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
});

export const dm_display = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const dancing_script = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
});

export const anton = Anton({ subsets: ['latin'], weight: '400' });

export const lato = Lato({ subsets: ['latin'], weight: '700' });

export const open_sans = Open_Sans({ subsets: ['latin'], weight: ['600'] });

export const impact = fontImpact;
