import { NextResponse } from "next/server";
import webpush from "web-push";
import { supabase } from "@/lib/supabase";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const MESSAGES = [
  { title: "🌅 أذكار الصباح", body: "ابدأ يومك بذكر الله — «من قال حين يصبح: سبحان الله وبحمده، مائة مرة»" },
  { title: "🌆 أذكار المساء", body: "لا تنسَ أذكار المساء — حصنٌ لك حتى الصباح 🤍" },
  { title: "😊 تذكير بالابتسامة", body: "تبسّمك في وجه أخيك صدقة — أضِئ يومك بابتسامة 🌟" },
  { title: "💬 عبارة اليوم", body: "«إن مع العسر يسرا» — لا يأس مع الإيمان 🤍" },
  { title: "🕌 وقت الصلاة", body: "حيّ على الصلاة — حيّ على الفلاح 🕌" },
  { title: "🌙 قيام الليل", body: "الليل هدوء والقلب يشتاق — قُم وناجِ ربك 🤍" },
  { title: "✨ تفاؤل", body: "أنت أقوى مما تظن — والله معك في كل خطوة 💜" },
  { title: "🌿 تذكير", body: "خذ نفسًا عميقًا — وتذكر أن الله يُدبّر أمرك بحكمة 🤍" },
];

export async function POST(req: Request) {
  const { userId, messageIndex } = await req.json();
  
  const { data } = await supabase
    .from("push_subscriptions")
    .select("subscription")
    .eq("user_id", userId)
    .single();

  if (!data) return NextResponse.json({ error: "لا يوجد اشتراك" }, { status: 404 });

  const subscription = JSON.parse(data.subscription);
  const message = MESSAGES[messageIndex % MESSAGES.length];

  await webpush.sendNotification(subscription, JSON.stringify(message));

  return NextResponse.json({ success: true });
}