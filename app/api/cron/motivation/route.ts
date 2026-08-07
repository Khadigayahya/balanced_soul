import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";
import { getRotatingMessage } from "@/data/notifications";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const { data } = await supabase.from("push_subscriptions").select("*");
  if (!data) return NextResponse.json({ success: false });

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const message = getRotatingMessage(dayOfYear);

  await Promise.all(
    data.map(row =>
      webpush.sendNotification(JSON.parse(row.subscription), JSON.stringify(message)).catch(() => {})
    )
  );

  return NextResponse.json({ success: true });
}