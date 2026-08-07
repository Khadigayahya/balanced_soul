"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/#vision", label: "رؤيتنا" },
  { href: "/audio", label: "المسموعات" },
  { href: "/readings", label: "المقروءات" },
  { href: "/daily", label: "يومياتي" },
  { href: "/adhkar", label: "أذكاري" },
  { href: "/consultation", label: "استشارة" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <a href="/" className="nav-logo">صحح <span>بوصلة</span> قلبك</a>

      <ul className="nav-links">
        {LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href} className={pathname === link.href ? "nav-link-active" : ""}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        className={`nav-toggle ${open ? "nav-toggle-open" : ""}`}
        aria-label="فتح القائمة"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-mobile-menu ${open ? "nav-mobile-open" : ""}`}>
        <ul>
          {LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
