"use client";
import { useReveal } from "./useReveal";
import type { Dhikr } from "@/data/adhkar";

interface AdhkarCardProps {
  dhikr: Dhikr;
  count: number;
  onIncrement: () => void;
  onReset: () => void;
  delay?: number;
}

export default function AdhkarCard({ dhikr, count, onIncrement, onReset, delay = 0 }: AdhkarCardProps) {
  const { ref, className } = useReveal<HTMLDivElement>();
  const done = count >= dhikr.repeat;
  const progress = Math.min((count / dhikr.repeat) * 100, 100);

  return (
    <div
      id={`dhikr-${dhikr.id}`}
      ref={ref}
      className={`adhkar-page-card ${className} ${done ? "adhkar-page-done" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="adhkar-page-text">{dhikr.text}</p>
      {dhikr.source && <p className="adhkar-page-source">— {dhikr.source}</p>}

      <div className="adhkar-counter-row">
        <div className="adhkar-progress-wrap">
          <div className="adhkar-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="adhkar-count-label">
          {count} / {dhikr.repeat}
        </span>
      </div>

      <div className="adhkar-actions">
        {done ? (
          <span className="adhkar-done-badge">✓ مكتمل</span>
        ) : (
          <button className="adhkar-tap-btn" onClick={onIncrement}>اضغط للتسبيح</button>
        )}
        <button className="adhkar-reset-btn" onClick={onReset}>إعادة</button>
      </div>
    </div>
  );
}
