// components/Navbar/Navbar.server.jsx
import NavbarClient from "./Navbar.client";
import { getPages } from "@/lib/directus";

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

async function getLanguages() {
  const res = await fetch(
    `${DIRECTUS_URL}/items/languages`,
    { cache: "no-cache" }
  );

  const json = await res.json();
  return json.data || [];
}

function buildTree(items) {
  const map = {}
  const roots = []

  items.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })

  items.forEach(item => {
    if (item.parent) {
      map[item.parent]?.children.push(map[item.id])
    } else {
      roots.push(map[item.id])
    }
  })

  return roots
}

export default async function Navbar({ settings, lang, slug }) {
  const [menu, languages] = await Promise.all([
    getPages(lang),
    getLanguages(),
  ]);

  return (
    <NavbarClient
      settings={settings}
      menu={menu}
      languages={languages}
      lang={lang}
      slug={slug}
    />
  );
}
