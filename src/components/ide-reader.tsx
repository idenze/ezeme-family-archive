import { useEffect, useRef, useState } from "react";
import { ArrowUp, ChevronRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IdeShell } from "@/components/ide-shell";
import { IdeDictionary } from "@/components/ide-dictionary";
import type { ArchivePage } from "@/lib/ide-content";

export function IdeReader({ page }: { page: ArchivePage }) {
  const ref = useRef<HTMLDivElement>(null);
  const [chapters, setChapters] = useState<{id: string; text: string}[]>([]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    setChapters(Array.from(element.querySelectorAll('h2,h3')).map(heading => ({ id: heading.id, text: heading.textContent || "" })).slice(0, 70));
    element.querySelectorAll<HTMLElement>('[data-audio]').forEach(audio => {
      const note = document.createElement('p');
      note.className = 'recording-unavailable';
      note.textContent = `${audio.dataset.label || 'Recording'} · Audio not included in this design preview`;
      audio.replaceWith(note);
    });
    // Preserve the supplied spoken-word filter without executing the archive's scripts.
    const search = element.querySelector<HTMLInputElement>('input[type="search"]');
    const filter = () => {
      const query = (search?.value || '').toLowerCase();
      element.querySelectorAll<HTMLElement>('tbody tr').forEach(row => { row.hidden = !row.textContent?.toLowerCase().includes(query); });
    };
    search?.addEventListener('input', filter);
    return () => search?.removeEventListener('input', filter);
  }, [page]);
  return <IdeShell><main><div className="inner-heading"><div className="site-width"><div className="breadcrumb"><a href="/">Overview</a><ChevronRight size={12}/><span>{page.title}</span></div><p className="eyebrow">THE IDE FAMILY RECORD</p><h1>{page.title}</h1><p className="description">{page.description}</p></div></div>
    {page.slug === 'dictionary' ? <IdeDictionary/> : <div className="site-width reader-layout"><aside className="chapter-nav"><p className="eyebrow mb-4">IN THIS RECORD</p>{chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`}>{chapter.text}</a>)}<Button variant="ghost" size="sm" className="mt-4" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}><ArrowUp/> Back to top</Button>{page.slug === 'spoken' && <p className="text-xs text-muted-foreground mt-5"><Headphones size={14} className="mb-2"/>Recording files were not included in the supplied archive.</p>}</aside><div ref={ref} className="source-reader" dangerouslySetInnerHTML={{ __html: page.html }}/></div>}
  </main></IdeShell>;
}