import { ARTICLES, BOOKS } from "./readings";
import { AUDIO_SCHOLARS } from "./audio";
import { ADHKAR } from "./adhkar";

export interface SearchItem {
  id: string;
  title: string;
  snippet: string;
  href: string;
  type: string;
}

const articleItems: SearchItem[] = ARTICLES.map(a => ({
  id: `article-${a.id}`,
  title: a.title,
  snippet: a.body,
  href: `/readings#article-${a.id}`,
  type: "مقروءة",
}));

const bookItems: SearchItem[] = BOOKS.map(b => ({
  id: `book-${b.id}`,
  title: b.title,
  snippet: `${b.author} — ${b.description}`,
  href: `/readings#book-${b.id}`,
  type: "كتاب",
}));

const dhikrItems: SearchItem[] = ADHKAR.map(d => ({
  id: `dhikr-${d.id}`,
  title: d.text.length > 40 ? `${d.text.slice(0, 40)}…` : d.text,
  snippet: d.text,
  href: `/adhkar#dhikr-${d.id}`,
  type: "ذكر",
}));

const episodeItems: SearchItem[] = AUDIO_SCHOLARS.flatMap((scholar, si) =>
  scholar.episodes.map((ep, ei) => ({
    id: `ep-${si}-${ei}`,
    title: ep.title,
    snippet: `${scholar.name} — ${ep.desc}`,
    href: `/audio#ep-${si}-${ei}`,
    type: "مسموع",
  }))
);

export const SEARCH_INDEX: SearchItem[] = [...articleItems, ...bookItems, ...dhikrItems, ...episodeItems];

export function search(query: string, limit = 6): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter(
    item => item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q)
  ).slice(0, limit);
}
