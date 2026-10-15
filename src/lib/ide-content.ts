export interface ArchivePage { slug: string; title: string; description: string; html: string }
const pages = import.meta.glob<{ default: ArchivePage }>("../content/*.json");
export async function loadArchivePage(slug: string) {
  const load = pages[`../content/${slug}.json`];
  if (!load || slug === "catalog" || slug === "dictionary-data") return null;
  return (await load()).default;
}
export function archiveMeta(title: string, description: string) {
  return { meta: [
    { title: `${title} — Ide · The House of Ezeme` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Ide` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex, nofollow, noarchive" },
  ] };
}