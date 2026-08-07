"use client";
import { useReveal } from "./useReveal";
import type { Episode } from "@/data/audio";

export default function EpisodeCard({ icon, badge, num, title, desc, url, cta, delay = 0, anchorId }: Episode & { delay?: number; anchorId?: string }) {
  const { ref, className } = useReveal<HTMLDivElement>();
  return (
    <div id={anchorId} ref={ref} className={`episode-card ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="episode-top">
        <span className="episode-icon">{icon}</span>
        {badge && <span className="episode-badge">{badge}</span>}
        {num && <span className="episode-num">{num}</span>}
      </div>
      <h3 className="episode-title">{title}</h3>
      <p className="episode-desc">{desc}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="episode-btn">{cta}</a>
    </div>
  );
}
