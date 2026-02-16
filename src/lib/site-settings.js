'use strict';

const isServer = typeof window === "undefined"

console.log("isServer:", isServer);

const BASE_URL = isServer
  ? process.env.DIRECTUS_INTERNAL_URL
  : process.env.NEXT_PUBLIC_DIRECTUS_URL

  console.log("BASE_URL:", BASE_URL);

export async function getSiteSettings() {
  const res = await fetch(
    `${BASE_URL}/items/site_settings`,
    { cache: "no-store", next: { tags: ["site-settings"] } }
  );


  const json = await res.json();
  return json.data;
}
