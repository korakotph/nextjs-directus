import { getPageBySlug } from "@/lib/directus";

export default async function Page({ params }) {
  const { lang, slug } = await params;

  const page = await getPageBySlug(slug, lang);

  if (!page) {
    return <h1>404 Page not found</h1>;
  }

  return (
    <main className="max-w-7xl mx-auto"
      dangerouslySetInnerHTML={{ __html: page.body }}
    />
  );
}
