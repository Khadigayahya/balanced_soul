"use client";
import { useState, useEffect } from "react";

type Section = "الصباح" | "المساء" | "النوم والاستيقاظ" | "بعد الصلاة" | "أدعية المواقف" | "حصن المسلم";

interface Dhikr {
  id: number;
  text: string;
  repeat: number;
  source?: string;
  section: Section;
}

const ADHKAR: Dhikr[] = [
  // أذكار الصباح
  { id: 1, section: "الصباح", text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", repeat: 1, source: "أبو داود" },
  { id: 2, section: "الصباح", text: "اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ", repeat: 1, source: "الترمذي" },
  { id: 3, section: "الصباح", text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", repeat: 100, source: "صحيح مسلم" },
  { id: 4, section: "الصباح", text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ", repeat: 1, source: "البخاري — سيد الاستغفار" },
  // أذكار المساء
  { id: 5, section: "المساء", text: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", repeat: 1, source: "أبو داود" },
  { id: 6, section: "المساء", text: "اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ", repeat: 1, source: "الترمذي" },
  { id: 7, section: "المساء", text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", repeat: 3, source: "صحيح مسلم" },
  // أذكار النوم والاستيقاظ
  { id: 8, section: "النوم والاستيقاظ", text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", repeat: 1, source: "البخاري" },
  { id: 9, section: "النوم والاستيقاظ", text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ", repeat: 3, source: "أبو داود" },
  { id: 10, section: "النوم والاستيقاظ", text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", repeat: 1, source: "البخاري — عند الاستيقاظ" },
  // أذكار بعد الصلاة
  { id: 11, section: "بعد الصلاة", text: "أَسْتَغْفِرُ اللَّهَ", repeat: 3, source: "صحيح مسلم" },
  { id: 12, section: "بعد الصلاة", text: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", repeat: 1, source: "صحيح مسلم" },
  { id: 13, section: "بعد الصلاة", text: "سُبْحَانَ اللَّهِ", repeat: 33, source: "صحيح مسلم" },
  { id: 14, section: "بعد الصلاة", text: "الْحَمْدُ لِلَّهِ", repeat: 33, source: "صحيح مسلم" },
  { id: 15, section: "بعد الصلاة", text: "اللَّهُ أَكْبَرُ", repeat: 33, source: "صحيح مسلم" },
  // أدعية المواقف
  { id: 16, section: "أدعية المواقف", text: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ — عند الهم والضيق", repeat: 1, source: "البخاري" },
  { id: 17, section: "أدعية المواقف", text: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا — عند الصعوبة", repeat: 1, source: "ابن حبان" },
  { id: 18, section: "أدعية المواقف", text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ — عند الحزن", repeat: 1, source: "البخاري" },
  // حصن المسلم
  { id: 19, section: "حصن المسلم", text: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", repeat: 3, source: "أبو داود — صباحاً ومساءً" },
  { id: 20, section: "حصن المسلم", text: "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا", repeat: 3, source: "أبو داود" },
];

const SECTIONS: Section[] = ["الصباح", "المساء", "النوم والاستيقاظ", "بعد الصلاة", "أدعية المواقف", "حصن المسلم"];

const SECTION_ICONS: Record<Section, string> = {
  "الصباح": "🌅",
  "المساء": "🌙",
  "النوم والاستيقاظ": "😴",
  "بعد الصلاة": "🤲",
  "أدعية المواقف": "💭",
  "حصن المسلم": "🛡️",
};

export default function AdhkarPage() {
  const [activeSection, setActiveSection] = useState<Section>("الصباح");
  const [counts, setCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem("bawsala-adhkar-counts");
    if (saved) setCounts(JSON.parse(saved));
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
      <nav className="nav">
        <a href="/" className="nav-logo">صحح <span>بوصلة</span> قلبك</a>
        <ul className="nav-links">
          <li><a href="/audio">المسموعات</a></li>
          <li><a href="/readings">المقروءات</a></li>
          <li><a href="/daily">يومياتي</a></li>
          <li><a href="/adhkar">أذكاري</a></li>
        </ul>
      </nav>

      <div className="adhkar-page-header">
        <span className="section-label">أذكاري وأدعيتي</span>
        <h1 className="section-title">حِصنُ المؤمن اليومي</h1>
        <p className="section-subtitle">
          «مَنْ قَالَ حِينَ يُصْبِحُ وَحِينَ يُمْسِي... كَانَ حَقًّا عَلَى اللَّهِ أَنْ يُرْضِيَهُ»
        </p>
      </div>

      {/* SECTIONS NAV */}
      <div className="adhkar-sections">
        {SECTIONS.map(sec => (
          <button
            key={sec}
            className={`adhkar-section-btn ${activeSection === sec ? "adhkar-section-active" : ""}`}
            onClick={() => setActiveSection(sec)}
          >
            <span>{SECTION_ICONS[sec]}</span>
            <span>{sec}</span>
          </button>
        ))}
      </div>

      {/* ADHKAR LIST */}
      <div className="adhkar-page-grid">
        {filtered.map(dhikr => {
          const count = counts[dhikr.id] || 0;
          const done = count >= dhikr.repeat;
          const progress = Math.min((count / dhikr.repeat) * 100, 100);

          return (
            <div key={dhikr.id} className={`adhkar-page-card ${done ? "adhkar-page-done" : ""}`}>
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
                  <button
                    className="adhkar-tap-btn"
                    onClick={() => increment(dhikr.id, dhikr.repeat)}
                  >
                    اضغط للتسبيح
                  </button>
                )}
                <button className="adhkar-reset-btn" onClick={() => reset(dhikr.id)}>إعادة</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hadith-section">
        <p className="hadith-text">«أَلَا أُنَبِّئُكُمْ بِخَيْرِ أَعْمَالِكُمْ وَأَزْكَاهَا عِنْدَ مَلِيكِكُمْ — <em>ذِكْرُ اللَّهِ</em>»</p>
        <p className="hadith-source">سنن ابن ماجه</p>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>
    </main>
  );
}