"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "أشعر بضغط نفسي شديد",
  "كيف أنظم يومي بشكل أفضل؟",
  "أحتاج مساعدة في التوكل على الله",
  "أشعر بالحزن ولا أعرف السبب",
];

export default function ConsultationPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "السلام عليكم ورحمة الله 🤍\nأنا مساعدك في منصة صحح بوصلة قلبك — يمكنك مشاركتي ما يشغل بالك، وسأكون معك بإذن الله.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    // إضافة رسالة المستخدم للشاشة
    const newMessages: Message[] = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "حدث خطأ ما");
      }

      // إضافة رد البوت
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (err: any) {
      // إظهار رسالة الخطأ للمستخدم بشكل لطيف
      setMessages([...newMessages, { 
        role: "assistant", 
        content: `⚠️ ${err.message || "عذراً، واجهت مشكلة في الاتصال. حاول مرة أخرى."}` 
      }]);
    } finally {
      setLoading(false);
    }
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

      <div className="chat-page">
        <div className="chat-header">
          <span className="section-label">استشارة</span>
          <h1 className="section-title">مساحتك الآمنة</h1>
          <p className="section-subtitle">شارك ما يشغل بالك — بمنهج إسلامي أصيل ودعم حقيقي.</p>
        </div>

        {/* أظهر الاقتراحات فقط في بداية المحادثة */}
        {messages.length === 1 && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="suggestion-btn" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role === "user" ? "bubble-user" : "bubble-bot"}`}>
              {msg.role === "assistant" && <span className="bubble-avatar">🤍</span>}
              <p className="bubble-text" style={{ whiteSpace: "pre-line" }}>{msg.content}</p>
            </div>
          ))}
          
          {loading && (
            <div className="chat-bubble bubble-bot">
              <span className="bubble-avatar">🤍</span>
              <p className="bubble-text typing">يكتب الآن...</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="اكتب رسالتك هنا..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            disabled={loading}
          />
          <button className="chat-send-btn" onClick={() => send()} disabled={loading || !input.trim()}>
             {loading ? "..." : "إرسال ←"}
          </button>
        </div>

        <p className="chat-disclaimer">
          ⚠️ هذا المساعد لا يُغني عن استشارة متخصص في الحالات الصعبة.
        </p>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>
    </main>
  );
}