"use client";
import { useReveal } from "./useReveal";
import type { Book } from "@/data/readings";

export default function BookCard({ book, delay = 0, highlight = false }: { book: Book; delay?: number; highlight?: boolean }) {
  const { ref, className } = useReveal<HTMLDivElement>();
  return (
    <div
      id={`book-${book.id}`}
      ref={ref}
      className={`book-card ${className} ${!book.available ? "book-unavailable" : ""} ${highlight ? "book-card-highlight" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="book-cover">📚</div>
      <h3 className="book-title">{book.title}</h3>
      {book.author && <p className="book-author">{book.author}</p>}
      <p className="book-desc">{book.description}</p>
      <div className="book-actions">
        {book.telegramUrl ? (
          <a href={book.telegramUrl} target="_blank" rel="noopener noreferrer" className="book-btn btn-read">📖 اقرأ</a>
        ) : (
          <span className="book-soon">قريباً</span>
        )}
        {book.mantoqUrl && (
          <a href={book.mantoqUrl} target="_blank" rel="noopener noreferrer" className="book-btn btn-listen">🎧 استمع</a>
        )}
      </div>
    </div>
  );
}
