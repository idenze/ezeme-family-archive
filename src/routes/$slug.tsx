import { createFileRoute, notFound } from "@tanstack/react-router";
import { IdeReader } from "@/components/ide-reader";
import { IdeShell } from "@/components/ide-shell";
import { archiveMeta, loadArchivePage } from "@/lib/ide-content";

export const Route = createFileRoute('/$slug')({
  loader: async ({ params }) => {
    const slug = params.slug.replace(/\.html$/, '');
    if (slug === 'register') return { page: null, protected: true };
    const page = await loadArchivePage(slug);
    if (!page) throw notFound();
    return { page, protected: false };
  },
  head: ({ loaderData }) => archiveMeta(loaderData?.page?.title || 'Protected family register', loaderData?.page?.description || 'The protected Ide family register.'),
  component: ArchiveRoute,
});
function ArchiveRoute() {
  const data = Route.useLoaderData();
  if (!data.page) return <IdeShell><main className="site-width archive-section"><p className="eyebrow">RESTRICTED RECORD</p><h1 className="text-5xl mt-5">Family register</h1><p className="text-muted-foreground mt-6">The family register is withheld from this design preview.</p></main></IdeShell>;
  return <IdeReader page={data.page}/>;
}