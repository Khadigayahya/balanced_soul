import { NextResponse } from "next/server";
import webpush from "web-push";
import { supabase } from "@/lib/supabase";

webpush.setVapidDetails(
  process.env.VAPID_EMAIL!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

const MESSAGES = [
  { title: "🌅 أذكار الصباح", body: "ابدأ يومك بذكر الله — «مَنْ قَالَ سُبْحَانَ اللَّهِ وَبِحَمْدِهِ فِي يَوْمٍ مِائَةَ مَرَّةٍ، حُطَّتْ خَطَايَاهُ وَإِنْ كَانَتْ مِثْلَ زَبَدِ الْبَحْرِ» 🤍" },
  { title: "🌆 أذكار المساء", body: "لا تنسَ أذكار المساء — حصنٌ لك حتى الصباح 🤍" },
  { title: "😊 تذكير بالابتسامة", body: "تبسّمك في وجه أخيك صدقة — أضِئ يومك بابتسامة 🌟" },
  { title: "🕌 وقت الصلاة", body: "حيّ على الصلاة — حيّ على الفلاح 🕌" },
  { title: "🌙 قيام الليل", body: "الليل هدوء والقلب يشتاق — قُم وناجِ ربك 🤍" },
  { title: "✨ تفاؤل", body: "أنت أقوى مما تظن — والله معك في كل خطوة 💜" },
  { title: "🌿 تذكير", body: "خذ نفسًا عميقًا — وتذكر أن الله يُدبّر أمرك بحكمة 🤍" },
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
  { title: "💬 عبارة اليوم", body: "«إن مع العسر يسرا🤍" },
  { title: "💬 عبارة اليوم", body: "تُهدينا الحياة أضواء في آخر النفق — تدعونا كي ننسى ألماً عشناه 🌅" },
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