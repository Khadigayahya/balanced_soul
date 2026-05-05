"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

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

    // جدولة الإشعارات
    scheduleNotifications(userId);
  } catch (err) {
    console.error("Push registration failed:", err);
  }
}

function scheduleNotifications(userId: string) {
  const sendNotification = (messageIndex: number) => {
    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, messageIndex }),
    });
  };

  const now = new Date();

  // أذكار الصباح - 7 صباحاً
  const morning = new Date(now);
  morning.setHours(7, 0, 0, 0);
  if (morning <= now) morning.setDate(morning.getDate() + 1);
  setTimeout(() => sendNotification(0), morning.getTime() - now.getTime());

  // أذكار المساء - 5 مساءً
  const evening = new Date(now);
  evening.setHours(17, 0, 0, 0);
  if (evening <= now) evening.setDate(evening.getDate() + 1);
  setTimeout(() => sendNotification(1), evening.getTime() - now.getTime());

  // قيام الليل - 3 فجراً
  const tahajjud = new Date(now);
  tahajjud.setHours(3, 0, 0, 0);
  if (tahajjud <= now) tahajjud.setDate(tahajjud.getDate() + 1);
  setTimeout(() => sendNotification(5), tahajjud.getTime() - now.getTime());

  // تذكير الابتسامة - 12 ظهراً
  const smile = new Date(now);
  smile.setHours(12, 0, 0, 0);
  if (smile <= now) smile.setDate(smile.getDate() + 1);
  setTimeout(() => sendNotification(2), smile.getTime() - now.getTime());

  // عبارة تحفيزية - 9 صباحاً
  const motivation = new Date(now);
  motivation.setHours(9, 0, 0, 0);
  if (motivation <= now) motivation.setDate(motivation.getDate() + 1);
  setTimeout(() => sendNotification(6), motivation.getTime() - now.getTime());
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/login") return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        window.location.href = "/login";
        return;
      }
      registerPushNotifications(session.user.id);
    });
  }, [pathname]);

  return <>{children}</>;
}