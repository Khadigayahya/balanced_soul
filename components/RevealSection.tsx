"use client";
import { useReveal } from "./useReveal";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
}

// لِلف أقسام/كتل كاملة (وليس عناصر شبكة) بحركة ظهور عند التمرير.
export default function RevealSection({ children, className = "" }: RevealSectionProps) {
  const { ref, className: revealClass } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`${revealClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
