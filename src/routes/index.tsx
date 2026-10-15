import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IdeShell } from "@/components/ide-shell";
import { archiveMeta } from "@/lib/ide-content";

export const Route = createFileRoute("/")({
  head: () => archiveMeta("Ide — Our family record", "The Ide dialect, culture, and written record. A private archive of the House of Ezeme."),
  component: Index,
});
const collections = [
  { title: "Culture", label: "THE PEOPLE", image: "/ide-media/culture/uno-igbo-sahelian-compound.webp", alt: "Ide courtyard and family compound", href: "/culture.html", number: "01", description: "The house, the age grades, the clans. What is held, what is made, and what is eaten." },
  { title: "The Ide dialect", label: "THE VOICE", image: "/ide-media/culture/ngele-ngele.webp", alt: "The Ngele musical instrument", href: "/dialect.html", number: "02", description: "One Igbo dialect. Its base, its sound, and the words that carry our way of seeing." },
  { title: "The written record", label: "THE MEMORY", image: "/ide-media/culture/uno-ndose-main-temple.webp", alt: "Ndose temple architectural reference", href: "/library.html", number: "03", description: "The documents, the traditions, and the stories. Kept in full, for those who come after." },
];
const contents = [
  ["I", "The dialect", "The voice, its sound, and its origins.", "/dialect.html"],
  ["II", "The people", "The house and the whole of our culture.", "/culture.html"],
  ["III", "The polity", "The councils, the clans, and the titles.", "/culture-polity.html"],
  ["IV", "The dictionary", "The vocabulary of record, A to Z.", "/dictionary.html"],
  ["V", "The written record", "Our documents, readable in full.", "/library.html"],
  ["VI", "Odiana", "The religion of the Igbo, read in Ide.", "/odiana.html"],
  ["VII", "The objects", "The instruments, dress, and architecture.", "/gallery.html"],
];
function Index() {
  return <IdeShell><main>
    <section className="ide-hero"><img src="/ide-media/culture/uno-igbo-sahelian-compound.webp" alt="The Ide family compound, with patterned balconies around a courtyard"/><div className="hero-shade"/><div className="site-width hero-content"><p className="eyebrow">THE HOUSE OF EZEME</p><h1>Ide</h1><p className="hero-subtitle">Our voice. Our people. Our record.</p><p className="hero-description">One Igbo dialect, rooted in the speech of Ọmambala and Idemmili. A living record of the words, traditions, and culture we hold as our own.</p><div className="hero-actions"><Button asChild className="hero-action"><a href="/dialect.html">Explore the dialect <ArrowUpRight/></a></Button><Button asChild variant="outline" className="hero-action hero-action-outline"><a href="#contents">Browse the archive <ArrowDown/></a></Button></div><span className="hero-caption"><Image size={12}/> The house · Ide architecture</span></div></section>
    <section className="stats-band" aria-label="The archive at a glance"><div className="site-width stats-grid">{[["7,173", "Words of record"], ["2,786", "Dialect concepts"], ["398", "Borrowed words"], ["311", "Words with recordings"], ["650", "Family names"]].map(([value,label]) => <div className="stat" key={label}><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>)}</div></section>
    <section className="archive-section site-width"><div className="section-top"><div><p className="eyebrow">A RECORD IN SEVEN PARTS</p><h2>Within the archive</h2></div><p>Our inheritance, kept in words and objects.</p></div><div className="collection-grid">{collections.map(item => <a className="collection" href={item.href} key={item.title}><div className="collection-image"><img src={item.image} alt={item.alt} loading="lazy"/><span>{item.number} / THE ARCHIVE</span></div><p className="eyebrow">{item.label}</p><div className="collection-title"><h3>{item.title}</h3><ArrowUpRight size={18}/></div><p>{item.description}</p></a>)}</div></section>
    <section id="contents" className="contents-section"><div className="site-width"><div className="section-top"><div><p className="eyebrow">THE COMPLETE RECORD</p><h2>Seven parts. One story.</h2></div><Button asChild variant="link"><a href="/words.html">Find a word <ArrowRight/></a></Button></div><div className="contents-list">{contents.map(([number,title,description,href]) => <a key={number} href={href} className="contents-item"><span className="contents-number">{number}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={17}/></a>)}</div></div></section>
  </main></IdeShell>;
}
