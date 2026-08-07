"use client";
import "../login/login.css";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        readyRef.current = true;
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        readyRef.current = true;
        setReady(true);
      }
    });

    const timeout = setTimeout(() => {
      if (!readyRef.current) setInvalid(true);
    }, 4000);

    return () => {
      listener.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async () => {
    setError("");
    const trimmed = password.trim();
    if (trimmed.length < 8) {
      setError("كلمة المرور يجب أن تكون ٨ أحرف على الأقل");
      return;
    }
    if (trimmed !== confirmPassword.trim()) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: trimmed });
    setLoading(false);

    if (error) {
      setError("تعذّر تحديث كلمة المرور، حاول مرة أخرى.");
      return;
    }
    setDone(true);
    setTimeout(() => { window.location.href = "/"; }, 1500);
  };

  return (
    <main>
      <Nav />

      <div className="login-page">
        <div className="login-card">
          <span className="section-label">أمان الحساب</span>
          <h1 className="section-title">تعيين كلمة مرور جديدة</h1>

          {invalid ? (
            <div className="login-form">
              <p className="login-hint">الرابط غير صالح أو منتهي الصلاحية. اطلبي رابطاً جديداً من صفحة تسجيل الدخول.</p>
              <a href="/login" className="btn-primary" style={{ justifyContent: "center" }}>العودة لتسجيل الدخول ←</a>
            </div>
          ) : !ready ? (
            <p className="login-hint" style={{ marginTop: "2rem" }}>جاري التحقق من الرابط...</p>
          ) : done ? (
            <p className="login-success-msg" style={{ marginTop: "2rem" }}>تم تحديث كلمة المرور بنجاح، جاري تحويلك...</p>
          ) : (
            <div className="login-form">
              <input
                className="login-input"
                type="password"
                placeholder="كلمة المرور الجديدة"
                value={password}
                onChange={e => setPassword(e.target.value)}
                dir="ltr"
                autoComplete="new-password"
              />
              <input
                className="login-input"
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                dir="ltr"
                autoComplete="new-password"
              />

              {error && <p className="login-error">{error}</p>}

              <button
                className="btn-primary"
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {loading ? "جاري الحفظ..." : "حفظ كلمة المرور ←"}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
