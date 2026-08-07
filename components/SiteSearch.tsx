"use client";
import { useEffect, useRef, useState } from "react";
import { search, type SearchItem } from "@/data/searchIndex";

export default function SiteSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(search(query));
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    window.location.href = href;
  };

  const handleSubmit = () => {
    if (results.length > 0) go(results[0].href);
  };

  return (
    <div className="hero-search-wrap" ref={wrapRef}>
      <div className="hero-search">
        <input
          className="hero-search-input"
          placeholder="ابحث في المسموعات، المقروءات، الأذكار..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />
        <button className="hero-search-btn" onClick={handleSubmit} aria-label="بحث">
          🔍
        </button>
      </div>

      {open && query.trim() && (
        <div className="hero-search-results">
          {results.length === 0 ? (
            <p className="hero-search-empty">لا توجد نتائج مطابقة</p>
          ) : (
            results.map(item => (
              <button key={item.id} className="hero-search-result" onClick={() => go(item.href)}>
                <span className="hero-search-result-type">{item.type}</span>
                <span className="hero-search-result-title">{item.title}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
