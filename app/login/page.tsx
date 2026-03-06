"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "signup";

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!email.trim() || !password.trim()) {
      setError("يرجى ملء جميع الحقول");
      return;
    }
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون ٦ أحرف على الأقل");
      return;
    }

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) setError("حدث خطأ في إنشاء الحساب — تأكد من البريد الإلكتروني");
      else setSuccess("تم إنشاء حسابك! تحقق من بريدك لتأكيد الحساب.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      else window.location.href = "/daily";
    }

    setLoading(false);
  };

  return (
    <main>
      <nav className="nav">
        <a href="/" className="nav-logo">صحح <span>بوصلة</span> قلبك</a>
      </nav>

      <div className="login-page">
        <div className="login-card">
          <span className="section-label">
            {mode === "login" ? "مرحباً بعودتك" : "انضم إلينا"}
          </span>
          <h1 className="section-title">
            {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h1>

          {/* TABS */}
          <div className="login-tabs">
            <button
              className={`login-tab ${mode === "login" ? "tab-active" : ""}`}
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
            >
              دخول
            </button>
            <button
              className={`login-tab ${mode === "signup" ? "tab-active" : ""}`}
              onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
            >
              حساب جديد
            </button>
          </div>

          <div className="login-form">
            {mode === "signup" && (
              <input
                className="login-input"
                type="text"
                placeholder="الاسم (اختياري)"
                value={name}
                onChange={e => setName(e.target.value)}
                dir="rtl"
              />
            )}
            <input
              className="login-input"
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={e => setEmail(e.target.value)}
              dir="ltr"
            />
            <input
              className="login-input"
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              dir="ltr"
            />

            {error && <p className="login-error">{error}</p>}
            {success && <p className="login-success-msg">{success}</p>}

            <button
              className="btn-primary"
              onClick={handleSubmit}
              disabled={loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "جاري التحميل..." : mode === "login" ? "دخول ←" : "إنشاء حساب ←"}
            </button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>
    </main>
  );
}