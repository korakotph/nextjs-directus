import { redirect } from "next/navigation";

const ALLOWED_LANGS = ["th", "en"];

export default function LangPage({ params }) {
  const { lang } = params;

  // กัน lang แปลก ๆ เช่น /abc
  if (!ALLOWED_LANGS.includes(lang)) {
    redirect("/th/home");
  }

  // /th → /th/home
  redirect(`/${lang}/home`);
}
