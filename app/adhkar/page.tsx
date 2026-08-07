"use client";
import "./adhkar.css";
import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import AdhkarCard from "@/components/AdhkarCard";
import { ADHKAR, ADHKAR_SECTIONS, ADHKAR_SECTION_ICONS, type AdhkarSection } from "@/data/adhkar";

export default function AdhkarPage() {
  const [activeSection, setActiveSection] = useState<AdhkarSection>("الصباح");
  const [counts, setCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("bawsala-adhkar-counts");
    if (saved) setCounts(JSON.parse(saved));
  }, []);

  // لو الرابط جاي من نتيجة بحث بصيغة #dhikr-<id>، افتح القسم الصحيح ثم مرّر لعنصره.
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#dhikr-(\d+)$/);
    if (!match) return;
    const target = ADHKAR.find(d => d.id === Number(match[1]));
    if (!target) return;
    setActiveSection(target.section);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);

  const increment = (id: number, max: number) => {
    const current = counts[id] || 0;
    if (current >= max) return;
    const updated = { ...counts, [id]: current + 1 };
    setCounts(updated);
    localStorage.setItem("bawsala-adhkar-counts", JSON.stringify(updated));
  };

  const reset = (id: number) => {
    const updated = { ...counts, [id]: 0 };
    setCounts(updated);
    localStorage.setItem("bawsala-adhkar-counts", JSON.stringify(updated));
  };

  const filtered = ADHKAR.filter(d => d.section === activeSection);

  return (
    <main>
      <Nav />

      <div className="adhkar-page-header">
        <span className="section-label">أذكاري وأدعيتي</span>
        <h1 className="section-title">حِصنُ المؤمن اليومي</h1>
        <p className="section-subtitle">
          «مَنْ قَالَ حِينَ يُصْبِحُ وَحِينَ يُمْسِي... كَانَ حَقًّا عَلَى اللَّهِ أَنْ يُرْضِيَهُ»
        </p>
      </div>

      {/* SECTIONS NAV */}
      <div className="adhkar-sections">
        {ADHKAR_SECTIONS.map(sec => (
          <button
            key={sec}
            className={`adhkar-section-btn ${activeSection === sec ? "adhkar-section-active" : ""}`}
            onClick={() => setActiveSection(sec)}
          >
            <span>{ADHKAR_SECTION_ICONS[sec]}</span>
            <span>{sec}</span>
          </button>
        ))}
      </div>

      {/* ADHKAR LIST */}
      <div className="adhkar-page-grid">
        {filtered.map((dhikr, i) => (
          <AdhkarCard
            key={dhikr.id}
            dhikr={dhikr}
            count={counts[dhikr.id] || 0}
            onIncrement={() => increment(dhikr.id, dhikr.repeat)}
            onReset={() => reset(dhikr.id)}
            delay={(i % 2) * 80}
          />
        ))}
      </div>

      <div className="hadith-section">
        <p className="hadith-text">«أَلَا أُنَبِّئُكُمْ بِخَيْرِ أَعْمَالِكُمْ وَأَزْكَاهَا عِنْدَ مَلِيكِكُمْ — <em>ذِكْرُ اللَّهِ</em>»</p>
        <p className="hadith-source">سنن ابن ماجه</p>
      </div>

      <Footer />
      <BackToTop />
    </main>
  );
}
