import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import words from "@/content/dictionary-data.json";

const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const decode = (value: string) => value.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/<[^>]+>/g, "");
export function IdeDictionary() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [letter, setLetter] = useState("");
  const [page, setPage] = useState(0);
  const topics = [...new Set(words.map(word => word.d).filter(Boolean))].sort();
  const filtered = useMemo(() => words.filter(word => (!query || normalize(`${word.i} ${decode(word.e)}`).includes(normalize(query))) && (!topic || word.d === topic) && (!letter || normalize(word.i).startsWith(letter.toLowerCase()))), [query, topic, letter]);
  const shown = filtered.slice(page * 40, page * 40 + 40);
  return <section className="dictionary-area site-width">
    <div className="dictionary-controls"><label className="search-field"><Search size={18}/><input type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(0); }} placeholder="Search Ide or English…" aria-label="Search Ide or English"/></label><select value={topic} onChange={event => { setTopic(event.target.value); setPage(0); }} aria-label="Filter by topic"><option value="">All topics</option>{topics.map(value => <option key={value}>{value}</option>)}</select></div>
    <div className="alphabet" aria-label="Filter by initial letter"><Button variant={!letter ? "secondary" : "ghost"} size="sm" onClick={() => { setLetter(""); setPage(0); }}>All</Button>{"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(value => <Button key={value} variant={letter === value ? "secondary" : "ghost"} size="sm" aria-pressed={letter === value} onClick={() => { setLetter(value); setPage(0); }}>{value}</Button>)}</div>
    <p className="dictionary-count">{filtered.length.toLocaleString()} entries{query && ` matching “${query}”`}</p>
    <table className="dictionary-table"><thead><tr><th>IDE</th><th>TYPE</th><th>ENGLISH</th><th>TOPIC</th></tr></thead><tbody>{shown.map((word, index) => <tr key={`${word.i}-${index}`}><td className="word-cell">{word.i}</td><td>{word.p === "-" ? "—" : word.p}</td><td>{decode(word.e)}</td><td>{word.d || "—"}</td></tr>)}</tbody></table>
    {!filtered.length && <p className="empty-state">No words match this search.</p>}
    <div className="dictionary-pager"><Button variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}><ArrowLeft/> Previous</Button><span className="text-muted-foreground text-xs">{filtered.length ? page + 1 : 0} / {Math.ceil(filtered.length / 40)}</span><Button variant="outline" disabled={(page + 1) * 40 >= filtered.length} onClick={() => { setPage(page + 1); window.scrollTo({ top: 250, behavior: "smooth" }); }}>Next <ArrowRight/></Button></div>
  </section>;
}