"use client";
import { useState } from "react";

type Category = "الكل" | "آيات وتدبر" | "أحاديث" | "مقتطفات" | "تجارب" | "مقالات";

interface Article {
  id: number;
  category: Category;
  title: string;
  body: string;
  source?: string;
  readTime: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    category: "آيات وتدبر",
    title: "﴿وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا﴾",
    body: "التقوى ليست مجرد ترك المحرمات — هي حالة قلبية دائمة من المراقبة والحضور مع الله. ومن أدام هذه الحال وجد في كل ضيق مخرجاً لم يكن يحتسبه.",
    source: "سورة الطلاق — آية ٢",
    readTime: "دقيقتان",
  },
  {
    id: 2,
    category: "أحاديث",
    title: "«عجباً لأمر المؤمن»",
    body: "قال ﷺ: «عجباً لأمر المؤمن، إن أمره كله خير، وليس ذلك لأحد إلا للمؤمن؛ إن أصابته سرّاء شكر فكان خيراً له، وإن أصابته ضرّاء صبر فكان خيراً له». هذا الحديث يرسم لنا صورة الإنسان المتوازن الذي لا تهزّه الأحوال.",
    source: "صحيح مسلم",
    readTime: "٣ دقائق",
  },
  {
    id: 3,
    category: "مقتطفات",
    title: "الفرق بين الهم والحزن",
    body: "قال ابن القيم رحمه الله: الهمّ يتعلق بالمستقبل، والحزن يتعلق بالماضي، وكلاهما من تسلط الشيطان على القلب — فمن عاش في لحظته الحاضرة مع الله، أُغلقت عليه أبواب الهم والحزن.",
    source: "زاد المعاد — ابن القيم",
    readTime: "دقيقتان",
  },
  {
    id: 4,
    category: "تجارب",
    title: "حين توقفت عن مقاومة القدر",
    body: "كنت أقاوم كل ما لا يسير وفق خطتي، حتى أدركت أن المقاومة نفسها هي مصدر الألم لا الحدث ذاته. حين سلّمت أمري لله حقاً — لا قولاً — وجدت سكينة لم أعهدها من قبل.",
    readTime: "٤ دقائق",
  },
  {
    id: 5,
    category: "مقالات",
    title: "كيف تتعامل مع المزاج المتقلب؟",
    body: "المزاج المتقلب ليس عيباً في شخصيتك — هو إشارة من نفسك أنها تحتاج انتباهك. تعلّم أن تقرأ مزاجك كما تقرأ إشارات الطريق: لا تقاومها، بل افهم ما تريد أن تقوله لك.",
    readTime: "٥ دقائق",
  },
  {
    id: 6,
    category: "آيات وتدبر",
    title: "﴿أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾",
    body: "الطمأنينة ليست غياب المشكلات — هي حضور الله في قلبك وسط المشكلات. الذكر ليس مجرد ألفاظ تقولها بلسانك، بل هو استحضار عظمة الله في كل لحظة.",
    source: "سورة الرعد — آية ٢٨",
    readTime: "دقيقتان",
  },
];

const CATEGORIES: Category[] = ["الكل", "آيات وتدبر", "أحاديث", "مقتطفات", "تجارب", "مقالات"];

export default function ReadingsPage() {
  const [active, setActive] = useState<Category>("الكل");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = active === "الكل" ? ARTICLES : ARTICLES.filter(a => a.category === active);

  return (
    <main>
      <nav className="nav">
        <a href="/" className="nav-logo">صحح <span>بوصلة</span> قلبك</a>
        <ul className="nav-links">
          <li><a href="/#vision">رؤيتنا</a></li>
          <li><a href="/audio">المسموعات</a></li>
          <li><a href="/readings">المقروءات</a></li>
          <li><a href="/daily">يومياتي</a></li>
          <li><a href="/adhkar">أذكاري</a></li>
          <li><a href="/consultation">استشارة</a></li>
        </ul>
      </nav>

      <div className="readings-header">
        <span className="section-label">المقروءات</span>
        <h1 className="section-title">تأمّل واقرأ</h1>
        <p className="section-subtitle">
          آيات وأحاديث ومقتطفات وتجارب — تُعينك على فهم نفسك وتثبيت قلبك.
        </p>
      </div>

      {/* FILTER */}
      <div className="readings-filter">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${active === cat ? "filter-active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ARTICLES */}
      <div className="readings-grid">
        {filtered.map(article => (
          <div
            key={article.id}
            className={`reading-card ${expanded === article.id ? "reading-expanded" : ""}`}
          >
            <div className="reading-top">
              <span className="reading-category">{article.category}</span>
              <span className="reading-time">⏱ {article.readTime}</span>
            </div>
            <h2 className="reading-title">{article.title}</h2>
            <p className={`reading-body ${expanded === article.id ? "" : "reading-clamp"}`}>
              {article.body}
            </p>
            {article.source && (
              <p className="reading-source">— {article.source}</p>
            )}
            <button
              className="reading-toggle"
              onClick={() => setExpanded(expanded === article.id ? null : article.id)}
            >
              {expanded === article.id ? "إغلاق ↑" : "اقرأ أكثر ↓"}
            </button>
          </div>
        ))}
      </div>

      <div className="hadith-section">
        <p className="hadith-text">«اقْرَؤُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ <em>شَفِيعًا</em> لِأَصْحَابِهِ»</p>
        <p className="hadith-source">صحيح مسلم</p>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>
    </main>
  );
}