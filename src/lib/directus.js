const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

/**
 * ดึง page ตาม slug + language
 */
export async function getPageBySlug(slug, lang = "en") {
  const params = new URLSearchParams({
    "filter[slug][_eq]": slug,
    "filter[status][_eq]": "published",
    "deep[translations][filter][languages_code][code][_eq]": lang,
    "deep[blocks][sort]": "sort",
  });

  const url = `${DIRECTUS_URL}/items/pages?${params.toString()}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    console.error("Directus error:", await res.text());
    return null;
  }

  const json = await res.json();
  return json.data?.[0] || null;
}

/**
 * ดึงทุก page (ใช้ทำ menu / sitemap)
 */
export async function getPages() {
  const res = await fetch(
    `${DIRECTUS_URL}/items/pages?filter[status][_eq]=published`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pages");
  }

  const json = await res.json();
  return json.data;
}
