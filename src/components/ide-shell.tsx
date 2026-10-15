import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, LockKeyhole, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ide/logo.svg";
import catalog from "@/content/catalog.json";

const navigation = [["Overview", "/"], ["Culture", "/culture.html"], ["Gallery", "/gallery.html"], ["Dictionary", "/dictionary.html"], ["The dialect", "/dialect.html"], ["Spoken", "/spoken.html"], ["Words", "/words.html"], ["Odiana", "/odiana.html"], ["Library", "/library.html"]];
export function IdeShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: state => state.location.pathname });
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setMenu(false); setSearch(false); }, [path]);
  useEffect(() => {
    if (!search) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const handle = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearch(false);
      if (event.key === "Tab") {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>('a,button,input');
        if (!items?.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", handle);
    return () => { document.body.style.overflow = original; window.removeEventListener("keydown", handle); triggerRef.current?.focus(); };
  }, [search]);
  const results = catalog.filter(page => `${page.title} ${page.description}`.toLowerCase().includes(query.toLowerCase())).slice(0, 12);
  return <>
    <div className="identity-bar"><div className="site-width"><span>IDE · THE IDE DIALECT</span><span>PRIVATE · FAMILY ARCHIVE</span></div></div>
    <header className="site-header"><div className="site-width header-content">
      <Link to="/" className="brand" aria-label="Ezeme — overview"><img src={logo} alt="Ezeme" width="180" height="54" /></Link>
      <nav className={`primary-nav ${menu ? "menu-open" : ""}`} aria-label="Primary navigation">{navigation.map(([label, href]) => <a key={href} href={href} className={path === href ? "active" : ""} aria-current={path === href ? "page" : undefined}>{label}</a>)}</nav>
      <div className="nav-tools"><Button ref={triggerRef} variant="ghost" size="icon" aria-label="Search archive" title="Search archive" onClick={() => setSearch(true)}><Search size={17}/></Button><Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button></div>
    </div></header>
    {children}
    <footer className="site-footer"><div className="site-width footer-content"><div><strong>The House of Ezeme</strong><span>The Ide dialect. Our words, our people, our record.</span></div><span>Created by Idenze Ezeme</span><span className="footer-private"><LockKeyhole size={12}/> Private family archive</span></div></footer>
    {search && <div className="search-overlay" onClick={() => setSearch(false)}><div ref={dialogRef} className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="archive-search-title" onClick={event => event.stopPropagation()}><div className="search-heading"><h2 id="archive-search-title">Search the archive</h2><Button variant="ghost" size="icon" aria-label="Close search" onClick={() => setSearch(false)}><X/></Button></div><label className="search-field"><Search size={17}/><input ref={inputRef} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the family record…" aria-label="Search the family record"/></label><div className="search-results">{results.map(page => <a key={page.slug} href={page.slug === "index" ? "/" : `/${page.slug}.html`}>{page.title}<ArrowUpRight className="float-right" size={15}/><span>{page.description.slice(0, 120)}</span></a>)}{!results.length && <p className="empty-state">No matching pages.</p>}</div></div></div>}
  </>;
}