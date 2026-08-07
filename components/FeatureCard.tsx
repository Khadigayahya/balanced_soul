"use client";
import { useReveal } from "./useReveal";

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  href: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, desc, href, delay = 0 }: FeatureCardProps) {
  const { ref, className } = useReveal<HTMLAnchorElement>();
  return (
    <a
      href={href}
      ref={ref}
      className={`feature-card ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="feature-icon">{icon}</span>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </a>
  );
}
