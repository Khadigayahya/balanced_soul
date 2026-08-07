"use client";
import { useState } from "react";
import { useReveal } from "./useReveal";
import type { Article } from "@/data/readings";

export default function ReadingCard({ article, delay = 0 }: { article: Article; delay?: number }) {
  const { ref, className } = useReveal<HTMLDivElement>();
  const [expanded, setExpanded] = useState(false);

  return (
    <div id={`article-${article.id}`} ref={ref} className={`reading-card ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="reading-top">
        <span className="reading-category">{article.category}</span>
        <span className="reading-time">⏱ {article.readTime}</span>
      </div>
      <h2 className="reading-title">{article.title}</h2>
      <p className={`reading-body ${expanded ? "" : "reading-clamp"}`}>{article.body}</p>
      {article.source && <p className="reading-source">— {article.source}</p>}
      <button className="reading-toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? "إغلاق ↑" : "اقرأ أكثر ↓"}
      </button>
    </div>
  );
}
