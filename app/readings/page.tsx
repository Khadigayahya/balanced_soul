"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Category = "الكل" | "آيات وتدبر" | "أحاديث" | "مقتطفات" | "تجارب" | "مقالات";

interface Article {
  id: number;
  category: Category;
  title: string;
  body: string;
  source?: string;
  readTime: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  telegramUrl?: string;
  mantoqUrl?: string;
  available: boolean;
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

const BOOKS: Book[] = [
  {
    id: 1,
    title: "القرآن الكريم",
    author: "كلام الله تعالى",
    description: "المصدر الأول والأصيل لتزكية النفس وطمأنينة القلب.",
    telegramUrl: undefined,
    mantoqUrl: undefined,
    available: false,
  },
  {
    id: 2,
    title: "مدارج السالكين",
    author: "ابن القيم الجوزية",
    description: "رحلة في منازل القلب من التوبة إلى المحبة — من أعمق ما كُتب في تزكية النفس.",
    available: false,
  },
  {
    id: 3,
    title: "الداء والدواء",
    author: "ابن القيم الجوزية",
    description: "علاج أمراض القلوب بمنهج نبوي أصيل — للنفس التي تبحث عن شفاء حقيقي.",
    available: false,
  },
  {
    id: 4,
    title: "شمائل النبي وأخلاقه",
    author: "الإمام الترمذي",
    description: "تعرّف على النبي ﷺ من قريب — أخلاقه وهديه وبشريته التي تملأ القلب محبةً.",
    available: false,
  },
  {
    id: 5,
    title: "نظرية الفستق",
    author: "د. خالد المنيع",
    description: "كتاب معاصر يتحدث عن التفكير الإيجابي والنمو الشخصي من منظور إسلامي.",
    available: false,
  },
  {
    id: 6,
    title: "خواطر فتىً لم يرحل",
    author: "",
    description: "خواطر صادقة تلامس روح الشباب وتعيد توجيه البوصلة نحو الله.",
    telegramUrl: "https://t.me/Balanced_Soul_123/3",
    mantoqUrl: undefined,
    available: true,
  },
];

const CATEGORIES: Category[] = ["الكل", "آيات وتدبر", "أحاديث", "مقتطفات", "تجارب", "مقالات"];

export default function ReadingsPage() {
  const [active, setActive] = useState<Category>("الكل");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Book | null | "not-found">(null);
  const [suggestion, setSuggestion] = useState("");
  const [suggestionSent, setSuggestionSent] = useState(false);

  const filtered = active === "الكل" ? ARTICLES : ARTICLES.filter(a => a.category === active);

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const found = BOOKS.find(b => b.title.toLowerCase().includes(q));
    setSearchResult(found || "not-found");
  };

  const submitSuggestion = async () => {
  if (!suggestion.trim()) return;
  const { data: { session } } = await supabase.auth.getSession();
  
  await supabase.from("suggestions").insert({
    user_id: session?.user.id,
    book_name: suggestion,
  });

  await fetch("/api/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookName: suggestion }),
  });

  setSuggestion("");
  setSuggestionSent(true);
  setTimeout(() => setSuggestionSent(false), 4000);
};

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

      {/* LIBRARY */}
      <div className="library-section">
        <div className="library-header">
          <span className="section-label">المكتبة</span>
          <h2 className="section-title">كتب مختارة</h2>
          <p className="section-subtitle">كتب تُصحح البوصلة وتُغذي الروح — مختارة بعناية.</p>
        </div>

        {/* SEARCH */}
        <div className="library-search-row">
          <input
            className="library-search-input"
            placeholder="ابحث عن كتاب..."
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setSearchResult(null); }}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          />
          <button className="task-add-btn" onClick={handleSearch}>بحث</button>
        </div>

        {/* SEARCH RESULT */}
        {searchResult === "not-found" && (
          <div className="search-not-found">
            <p>😔 الكتاب غير موجود في المكتبة حالياً.</p>
            <p>هل تريد اقتراح إضافته؟</p>
            <div className="suggestion-row">
              <input
                className="library-search-input"
                placeholder="اكتب اسم الكتاب..."
                value={suggestion}
                onChange={e => setSuggestion(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitSuggestion()}
              />
              <button className="task-add-btn" onClick={submitSuggestion}>اقتراح</button>
            </div>
            {suggestionSent && (
              <p className="suggestion-sent">✅ وصلنا اقتراحك — شكراً! سننظر فيه بإذن الله 🤍</p>
            )}
          </div>
        )}

        {searchResult && searchResult !== "not-found" && (
          <div className="search-found">
            <p>✅ وجدنا الكتاب!</p>
            <div className="book-card book-card-highlight">
              <h3 className="book-title">{searchResult.title}</h3>
              {searchResult.author && <p className="book-author">{searchResult.author}</p>}
              <p className="book-desc">{searchResult.description}</p>
              <div className="book-actions">
                {searchResult.telegramUrl ? (
                  <a href={searchResult.telegramUrl} target="_blank" className="book-btn btn-read">📖 اقرأ</a>
                ) : (
                  <span className="book-soon">قريباً</span>
                )}
                {searchResult.mantoqUrl && (
                  <a href={searchResult.mantoqUrl} target="_blank" className="book-btn btn-listen">🎧 استمع</a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BOOKS GRID */}
        <div className="books-grid">
          {BOOKS.map(book => (
            <div key={book.id} className={`book-card ${!book.available ? "book-unavailable" : ""}`}>
              <div className="book-cover">📚</div>
              <h3 className="book-title">{book.title}</h3>
              {book.author && <p className="book-author">{book.author}</p>}
              <p className="book-desc">{book.description}</p>
              <div className="book-actions">
                {book.telegramUrl ? (
                  <a href={book.telegramUrl} target="_blank" className="book-btn btn-read">📖 اقرأ</a>
                ) : (
                  <span className="book-soon">قريباً</span>
                )}
                {book.mantoqUrl && (
                  <a href={book.mantoqUrl} target="_blank" className="book-btn btn-listen">🎧 استمع</a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SUGGEST A BOOK */}
        <div className="suggest-section">
          <p className="suggest-title">📬 اقترح كتاباً</p>
          <p className="suggest-subtitle">لم تجد كتابك المفضل؟ اقترحه علينا وسننظر في إضافته.</p>
          <div className="suggestion-row">
            <input
              className="library-search-input"
              placeholder="اسم الكتاب..."
              value={suggestion}
              onChange={e => setSuggestion(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submitSuggestion()}
            />
            <button className="task-add-btn" onClick={submitSuggestion}>اقتراح</button>
          </div>
          {suggestionSent && (
            <p className="suggestion-sent">✅ وصلنا اقتراحك — شكراً! سننظر فيه بإذن الله 🤍</p>
          )}
        </div>
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