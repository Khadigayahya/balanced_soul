# صحح بوصلة قلبك

منصة ويب إسلامية عربية (Next.js / TypeScript) للتزكية والاتزان النفسي: مسموعات، مقروءات ومكتبة كتب، يوميات ومهام، أذكار وأدعية، واستشارة بمساعد ذكاء اصطناعي. مبنية بـ Next.js App Router، وتُنشر كـ PWA مع تذكيرات Push مجدولة.

## البنية

```
app/
  page.tsx            الصفحة الرئيسية (Landing)
  audio/               المسموعات (سلاسل صوتية ومرئية)
  readings/             المقروءات + مكتبة الكتب
  daily/                يومياتي: مهام، إنجازات، أذكار (متصل بـ Supabase)
  adhkar/               أذكاري: عدّاد تسبيح لكل قسم (محفوظ في localStorage)
  consultation/         استشارة: شات بوت (Gemini AI)
  login/                تسجيل الدخول / إنشاء حساب (Supabase Auth)
  api/
    chat/               تكامل Gemini AI
    subscribe/, notify/ Push notifications (اشتراك وإرسال فردي)
    suggest/            إرسال اقتراح كتاب عبر Resend
    cron/                5 مسارات تذكير مجدولة عبر Vercel Cron (انظر vercel.json)

components/            مكونات مشتركة: Nav, Footer, BackToTop, بطاقات كل صفحة، useReveal (حركة ظهور عند التمرير)
data/                  محتوى الموقع كملفات TypeScript منفصلة عن منطق العرض (انظر أدناه)
lib/supabase.ts        عميل Supabase المشترك
```

## تحديث المحتوى بدون لمس الكود

كل المحتوى الثابت منفصل في `data/*.ts` — لإضافة أو تعديل محتوى، عدّل الملف المناسب فقط:

| الملف | المحتوى |
|---|---|
| `data/quotes.ts` | عبارات "اقتباس اليوم" في الصفحة الرئيسية (تُختار تلقائياً حسب تاريخ اليوم) |
| `data/adhkar.ts` | الأذكار الكاملة (صفحة `/adhkar`) وقائمة أذكار `/daily` المختصرة |
| `data/readings.ts` | المقالات وكتب المكتبة |
| `data/audio.ts` | حلقات المسموعات لكل شيخ/مصدر |
| `data/notifications.ts` | نصوص إشعارات Push (الثابتة والدورية) — مصدر واحد يستخدمه `api/notify` وكل مسارات `api/cron/*` |

## متغيرات البيئة

يحتاج المشروع ملف `.env.local` (غير مرفوع على Git) بالمفاتيح التالية:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_EMAIL=
RESEND_API_KEY=
```

- Supabase: قاعدة البيانات والمصادقة (جداول: `tasks`, `achievements`, `conversations`, `suggestions`, `push_subscriptions`).
- Gemini: مساعد صفحة الاستشارة.
- VAPID: مفاتيح Web Push (يمكن توليدها عبر `npx web-push generate-vapid-keys`).
- Resend: إرسال بريد عند اقتراح كتاب جديد.

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

## البناء والنشر

```bash
npm run build
```

يُنشر المشروع على Vercel؛ جدولة التذكيرات معرّفة في `vercel.json` (Vercel Cron Jobs).
