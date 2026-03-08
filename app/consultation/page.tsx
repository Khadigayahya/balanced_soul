"use client";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
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
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // جيب المحادثات السابقة
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      const uid = session.user.id;
      setUserId(uid);

      const { data } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: true });

      if (data && data.length > 0) {
        const loaded: Message[] = data.map((m: any) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        }));
        setMessages(loaded);
      }
    });
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveMessage = async (role: string, content: string) => {
    if (!userId) return;
    await supabase.from("conversations").insert({
      user_id: userId,
      role,
      content,
    });
  };

  const clearConversation = async () => {
    if (!userId) return;
    await supabase.from("conversations").delete().eq("user_id", userId);
    setMessages([{
      role: "assistant",
      content: "السلام عليكم ورحمة الله 🤍\nأنا مساعدك في منصة صحح بوصلة قلبك — يمكنك مشاركتي ما يشغل بالك، وسأكون معك بإذن الله.",
    }]);
  };

  const send = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText && !image || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userText || "أرسلت صورة", image: image || undefined },
    ];
    setMessages(newMessages);
    setInput("");
    setImage(null);
    setLoading(true);

    await saveMessage("user", userText || "أرسلت صورة");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply = data.reply;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      await saveMessage("assistant", reply);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "عذراً، حدث خطأ. حاول مرة أخرى." }]);
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

        <div className="chat-suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="suggestion-btn" onClick={() => send(s)}>{s}</button>
          ))}
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.role === "user" ? "bubble-user" : "bubble-bot"}`}>
              {msg.role === "assistant" && <span className="bubble-avatar">🤍</span>}
              <div className="bubble-content">
                {msg.image && (
                  <img src={msg.image} alt="صورة مرسلة" className="bubble-image" />
                )}
                <p className="bubble-text">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble bubble-bot">
              <span className="bubble-avatar">🤍</span>
              <p className="bubble-text typing">...</p>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {image && (
          <div className="image-preview">
            <img src={image} alt="preview" className="preview-img" />
            <button className="remove-image" onClick={() => setImage(null)}>× إزالة</button>
          </div>
        )}

        <div className="chat-input-row">
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <button className="image-upload-btn" onClick={() => fileRef.current?.click()}>
            📎
          </button>
          <input
            className="chat-input"
            placeholder="اكتب رسالتك هنا..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            disabled={loading}
          />
          <button className="chat-send-btn" onClick={() => send()} disabled={loading}>
            {loading ? "..." : "إرسال ←"}
          </button>
        </div>

        <div className="chat-footer-row">
          <p className="chat-disclaimer">
            ⚠️ هذا المساعد لا يُغني عن استشارة متخصص في الحالات الصعبة.
          </p>
          <button className="clear-chat-btn" onClick={clearConversation}>
            🗑️ مسح المحادثة
          </button>
        </div>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>
    </main>
  );
}