import { NextResponse } from "next/server";
import webpush from "web-push";
import { supabase } from "@/lib/supabase";
import { FIXED_MESSAGES } from "@/data/notifications";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  const { userId, messageIndex } = await req.json();

  if (typeof userId !== "string" || typeof messageIndex !== "number") {
    return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
  }

  const { data } = await supabase
    .from("push_subscriptions")
    .select("subscription")
    .eq("user_id", userId)
    .single();

  if (!data) return NextResponse.json({ error: "لا يوجد اشتراك" }, { status: 404 });

  const subscription = JSON.parse(data.subscription);
  const message = FIXED_MESSAGES[messageIndex % FIXED_MESSAGES.length];

  await webpush.sendNotification(subscription, JSON.stringify(message));

  return NextResponse.json({ success: true });
}