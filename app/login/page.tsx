"use client";
import "./login.css";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type Mode = "login" | "signup" | "forgot";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showResend, setShowResend] = useState(false);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setSuccess("");
    setShowResend(false);
  };

  const resendConfirmation = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resend({ type: "signup", email: email.trim() });
    setLoading(false);
    if (error) setError(`تعذّر إرسال البريد: ${error.message}`);
    else {
      setError("");
      setSuccess("تم إرسال رابط التأكيد من جديد — تفقّدي بريدك الإلكتروني (وصندوق الرسائل غير المرغوبة).");
      setShowResend(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");
    const trimmedEmail = email.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) setError(`تعذّر إرسال رابط إعادة التعيين: ${error.message}`);
    else setSuccess("لو البريد مسجّل لدينا، وصلك رابط لإعادة تعيين كلمة المرور (تفقّدي صندوق الرسائل غير المرغوبة كمان).");
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setShowResend(false);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail || !trimmedPassword || (mode === "signup" && !trimmedName)) {
      setError("يرجى ملء جميع الحقول");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }
    if (trimmedPassword.length < 8) {
      setError("كلمة المرور يجب أن تكون ٨ أحرف على الأقل");
      return;
    }

    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
        options: { data: { name: trimmedName } },
      });
      if (error) setError(`تعذّر إنشاء الحساب: ${error.message}`);
      else setSuccess("تم إنشاء حسابك بنجاح! افتحي بريدك الإلكتروني (وصندوق الرسائل غير المرغوبة) واضغطي على رابط التأكيد لتفعيل الحساب.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password: trimmedPassword });
      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setError("بريدك الإلكتروني غير مؤكَّد بعد — تفقّدي رسالة التأكيد في بريدك.");
          setShowResend(true);
        } else {
          setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }
      } else {
        window.location.href = "/";
      }
    }

    setLoading(false);
  };

  return (
    <main>
      <Nav />

      <div className="login-page">
        <div className="login-card">
          <span className="section-label">
            {mode === "login" ? "مرحباً بعودتك" : mode === "signup" ? "انضم إلينا" : "استعادة كلمة المرور"}
          </span>
          <h1 className="section-title">
            {mode === "login" ? "تسجيل الدخول" : mode === "signup" ? "إنشاء حساب جديد" : "نسيت كلمة المرور؟"}
          </h1>

          {mode !== "forgot" && (
            <div className="login-tabs">
              <button
                className={`login-tab ${mode === "login" ? "tab-active" : ""}`}
                onClick={() => switchMode("login")}
              >
                دخول
              </button>
              <button
                className={`login-tab ${mode === "signup" ? "tab-active" : ""}`}
                onClick={() => switchMode("signup")}
              >
                حساب جديد
              </button>
            </div>
          )}

          {mode === "forgot" ? (
            <div className="login-form">
              <p className="login-hint">أدخلي بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.</p>
              <input
                className="login-input"
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleForgotPassword()}
                dir="ltr"
                autoComplete="email"
              />

              {error && <p className="login-error">{error}</p>}
              {success && <p className="login-success-msg">{success}</p>}

              <button
                className="btn-primary"
                onClick={handleForgotPassword}
                disabled={loading}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {loading ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين ←"}
              </button>

              <button className="login-back-link" onClick={() => switchMode("login")}>
                ← العودة لتسجيل الدخول
              </button>
            </div>
          ) : (
            <div className="login-form">
              {mode === "signup" && (
                <input
                  className="login-input"
                  type="text"
                  placeholder="الاسم"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  dir="rtl"
                  autoComplete="name"
                />
              )}
              <input
                className="login-input"
                type="email"
                placeholder="البريد الإلكتروني"
                value={email}
                onChange={e => setEmail(e.target.value)}
                dir="ltr"
                autoComplete="email"
              />
              <input
                className="login-input"
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                dir="ltr"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
              />

              {mode === "login" && (
                <button className="login-forgot-link" onClick={() => switchMode("forgot")}>
                  نسيت كلمة المرور؟
                </button>
              )}

              {error && <p className="login-error">{error}</p>}
              {showResend && (
                <button className="login-back-link" onClick={resendConfirmation} disabled={loading}>
                  إعادة إرسال بريد التأكيد
                </button>
              )}
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
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
