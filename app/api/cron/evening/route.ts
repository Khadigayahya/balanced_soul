import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";
import { FIXED_MESSAGES } from "@/data/notifications";

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

  const message = FIXED_MESSAGES[1];

  await Promise.all(
    data.map(row =>
      webpush.sendNotification(JSON.parse(row.subscription), JSON.stringify(message)).catch(() => {})
    )
  );

  return NextResponse.json({ success: true });
}