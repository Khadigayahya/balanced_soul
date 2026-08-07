"use client";
import { useEffect, useRef, useState } from "react";

// هوك بسيط لحركة "ظهور عند التمرير": يُرجع ref يُربط بالعنصر، وclassName يُضاف لتفعيل الحركة عبر CSS.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, className: visible ? "reveal reveal-visible" : "reveal" };
}
