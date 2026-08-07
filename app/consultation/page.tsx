"use client";
import "./consultation.css";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface ConversationRow {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  created_at: string;
}

const SUGGESTIONS = [
  "أشعر بضغط نفسي شديد",
  "كيف أنظم يومي بشكل أفضل؟",
  "أحتاج مساعدة في التوكل على الله",
  "أشعر بالحزن ولا أعرف السبب",
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 12) return "صباح الخير ☀️";
  if (hour >= 12 && hour < 18) return "طاب يومك 🌤️";
  return "مساء الخير 🌙";
}

function deriveTitle(text: string) {
  const trimmed = text.trim();
  return trimmed.length > 40 ? `${trimmed.slice(0, 40)}…` : trimmed || "محادثة جديدة";
}

export default function ConsultationPage() {
  const [greeting, setGreeting] = useState("أهلاً بك");
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      setUserId(session.user.id);
      await loadSessions(session.user.id);
    });
  }, []);

  const loadSessions = async (uid: string) => {
    const { data } = await supabase
      .from("chat_sessions")
      .select("id, title, created_at")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (data) setSessions(data);
  };

  const selectSession = async (id: string) => {
    setSidebarOpen(false);
    setActiveSessionId(id);
    const { data } = await supabase
      .from("conversations")
      .select("role, content")
      .eq("session_id", id)
      .order("created_at", { ascending: true });
    if (data) setMessages((data as ConversationRow[]).map(m => ({ role: m.role, content: m.content })));
  };

  const newChat = () => {
    setSidebarOpen(false);
    setActiveSessionId(null);
    setMessages([]);
  };

  const deleteSession = async (id: string) => {
    await supabase.from("chat_sessions").delete().eq("id", id);
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) newChat();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveMessage = async (sessionId: string, role: string, content: string) => {
    if (!userId) return;
    await supabase.from("conversations").insert({ user_id: userId, session_id: sessionId, role, content });
  };

  const send = async (text?: string) => {
    const userText = text || input.trim();
    if ((!userText && !image) || loading || !userId) return;

    let sessionId = activeSessionId;
    if (!sessionId) {
      const { data } = await supabase
        .from("chat_sessions")
        .insert({ user_id: userId, title: deriveTitle(userText) })
        .select()
        .single();
      if (!data) return;
      sessionId = data.id;
      setActiveSessionId(sessionId);
      setSessions(prev => [data, ...prev]);
    }
    if (!sessionId) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userText || "أرسلت صورة", image: image || undefined },
    ];
    setMessages(newMessages);
    setInput("");
    setImage(null);
    setLoading(true);

    await saveMessage(sessionId, "user", userText || "أرسلت صورة");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      const reply = data.reply;
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      await saveMessage(sessionId, "assistant", reply);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "عذراً، حدث خطأ. حاول مرة أخرى." }]);
    } finally {
      setLoading(false);
    }
  };

  const isEmptyState = !activeSessionId;

  const composer = (
    <div className={`chat-composer ${isEmptyState ? "chat-composer-big" : ""}`}>
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        style={{ display: "none" }}
        onChange={handleImage}
      />
      <button className="image-upload-btn" onClick={() => fileRef.current?.click()}>📎</button>
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
  );

  return (
    <main>
      <Nav />

      <div className="chat-layout">
        <button className="chat-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰ المحادثات
        </button>

        <aside className={`chat-sidebar ${sidebarOpen ? "chat-sidebar-open" : ""}`}>
          <button className="chat-new-btn" onClick={newChat}>+ محادثة جديدة</button>
          <div className="chat-sessions-list">
            {sessions.length === 0 && <p className="chat-sessions-empty">لا توجد محادثات سابقة بعد</p>}
            {sessions.map(s => (
              <div key={s.id} className={`chat-session-item ${activeSessionId === s.id ? "chat-session-active" : ""}`}>
                <button className="chat-session-title" onClick={() => selectSession(s.id)}>{s.title}</button>
                <button className="chat-session-delete" onClick={() => deleteSession(s.id)} aria-label="حذف المحادثة">×</button>
              </div>
            ))}
          </div>
        </aside>

        <div className="chat-main">
          {isEmptyState ? (
            <div className="chat-empty-state">
              <h1 className="chat-greeting">{greeting}</h1>
              <p className="chat-greeting-sub">شارك ما يشغل بالك — بمنهج إسلامي أصيل ودعم حقيقي.</p>
              {composer}
              <div className="chat-suggestions">
                {SUGGESTIONS.map(s => (
                  <button key={s} className="suggestion-btn" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.role === "user" ? "bubble-user" : "bubble-bot"}`}>
                    {msg.role === "assistant" && <span className="bubble-avatar">🤍</span>}
                    <div className="bubble-content">
                      {msg.image && <img src={msg.image} alt="صورة مرسلة" className="bubble-image" />}
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

              {composer}

              <p className="chat-disclaimer">
                ⚠️ هذا المساعد لا يُغني عن استشارة متخصص في الحالات الصعبة.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
