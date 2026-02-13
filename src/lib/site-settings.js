const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;

export async function getSiteSettings() {
  const res = await fetch(
    `${DIRECTUS_URL}/items/site_settings`,
    { cache: "no-store", next: { tags: ["site-settings"] } }
  );

  const json = await res.json();
  return json.data;
}
