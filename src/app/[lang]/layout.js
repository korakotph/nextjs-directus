// app/[lang]/layout.jsx
import { getSiteSettings } from "@/lib/site-settings";
import Navbar from "@/components/Navbar/Navbar.server";
import Footer from "@/components/Footer";

import { Noto_Sans_Thai, Inter } from 'next/font/google'

const notoThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-thai',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-en',
  display: 'swap',
})

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const settings = await getSiteSettings();

  return (
    <div
      data-lang={lang}
      className={`${notoThai.variable} ${inter.variable} ${settings.max_w}`}
      style={{
        '--primary': settings.primary_color,
        '--secondary': settings.secondary_color,
      }}
    >
      <Navbar settings={settings} lang={lang} />
      {children}
      <Footer settings={settings} lang={lang} />
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return {
    htmlAttributes: {
      lang,
    },
  };
}