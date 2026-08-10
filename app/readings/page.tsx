"use client";
import "./readings.css";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ReadingCard from "@/components/ReadingCard";
import BookCard from "@/components/BookCard";
import { ARTICLES, BOOKS, READING_CATEGORIES, type ReadingCategory, type Book } from "@/data/readings";

export default function ReadingsPage() {
  const [active, setActive] = useState<ReadingCategory>("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Book | null | "not-found">(null);
  const [suggestion, setSuggestion] = useState("");
  const [suggestionSent, setSuggestionSent] = useState(false);

  const filtered = active === "الكل" ? ARTICLES : ARTICLES.filter(a => a.category === active);

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const found = BOOKS.find(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
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
      <Nav />

      <div className="readings-header">
        <span className="section-label">المقروءات</span>
        <h1 className="section-title">تأمّل واقرأ</h1>
        <p className="section-subtitle">
          آيات وأحاديث ومقتطفات وتجارب — تُعينك على فهم نفسك وتثبيت قلبك.
        </p>
      </div>

      {/* FILTER */}
      <div className="readings-filter">
        {READING_CATEGORIES.map(cat => (
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
        {filtered.map((article, i) => (
          <ReadingCard key={article.id} article={article} delay={(i % 3) * 80} />
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
            <BookCard book={searchResult} highlight />
          </div>
        )}

        {/* BOOKS GRID */}
        <div className="books-grid">
          {BOOKS.map((book, i) => (
            <BookCard key={book.id} book={book} delay={(i % 3) * 80} />
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

      <Footer />
      <BackToTop />
    </main>
  );
}
