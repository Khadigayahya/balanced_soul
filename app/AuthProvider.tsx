"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

// التذكيرات اليومية (الصباح، المساء، قيام الليل، الابتسامة، التحفيز) تُرسَل عبر
// Vercel Cron الموضّحة في vercel.json — تعمل من السيرفر بمواعيد ثابتة بغضّ النظر
// عن حالة المتصفح. هذه الدالة مسؤولة فقط عن تسجيل الاشتراك ليصلها الإشعار.
async function registerPushNotifications(userId: string) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

  try {
    const reg = await navigator.serviceWorker.register("/sw.js");
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    });

    await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscription, userId }),
    });
  } catch (err) {
    console.error("Push registration failed:", err);
  }
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pushRegistered = useRef(false);

  useEffect(() => {
    if (pathname === "/login") return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = "/login";
        return;
      }
      if (!pushRegistered.current) {
        pushRegistered.current = true;
        registerPushNotifications(session.user.id);
      }
    });
  }, [pathname]);

  return <>{children}</>;
}