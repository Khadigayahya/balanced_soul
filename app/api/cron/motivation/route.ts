import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const MESSAGES = [
  { title: "💬 عبارة اليوم", body: "فتىً يخوض غِمار الحرب مبتسماً — وينثني وسِنانُ الرُّمحِ مُختَضِبُ 🤍" },
  { title: "💬 عبارة اليوم", body: "حُلمنا نهار.. ونهارنا عمل — نملك الخيار.. وخيارنا الأمل 🌅" },
  { title: "💬 عبارة اليوم", body: "وثق أن كل غِراسك إن هو إلا إعمار لأمتك — قبل أن يكون سبباً في رفعتك 🌱" },
  { title: "💬 عبارة اليوم", body: "العزلة أيضاً حب 🤍" },
  { title: "💬 عبارة اليوم", body: "حتى إذا أعياه التعب تذكّر أن الثمن جناتُ عدن.. فوثب 🌿" },
  { title: "💬 عبارة اليوم", body: "فقم بعلم ولا تطلب به بدلا — فالناس موتى وأهل العلم أحياء ✨" },
  { title: "💬 عبارة اليوم", body: "عابرون والدنيا ليست لنا — لأجل الغاية يهون التعب 💜" },
  { title: "💬 عبارة اليوم", body: "وإني أرجو أن أطأ الجنة بعرجة قلبي 🤍" },
  { title: "💬 عبارة اليوم", body: "آمن بنبض القلب إن غصت بك الطرقات — واتبع خفقتك 💜" },
  { title: "💬 عبارة اليوم", body: "إذا كنت ترجو كِبار الأمور — فأعدد لها همة أكبرا ✨" },
  { title: "💬 عبارة اليوم", body: "إن لي نفساً تواقة! 🌟" },
  { title: "💬 عبارة اليوم", body: "«إن مع العسر يسرا»🤍" },
  { title: "💬 عبارة اليوم", body: "تُهدينا الحياة أضواء في آخر النفق — تدعونا كي ننسى ألماً عشناه 🌅" },
  { title: "💬 عبارة اليوم", body: "أنت أقوى مما تظن — والله معك في كل خطوة 💜" },
];

export async function GET() {
  const { data } = await supabase.from("push_subscriptions").select("*");
  if (!data) return NextResponse.json({ success: false });

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const message = MESSAGES[dayOfYear % MESSAGES.length];

  await Promise.all(
    data.map(row =>
      webpush.sendNotification(JSON.parse(row.subscription), JSON.stringify(message)).catch(() => {})
    )
  );

  return NextResponse.json({ success: true });
}