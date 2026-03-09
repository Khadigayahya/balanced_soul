import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { bookName } = await req.json();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: "khadigayahya606@gmail.com",
      subject: "📚 اقتراح كتاب جديد — صحح بوصلة قلبك",
      html: `
        <div dir="rtl" style="font-family: Arial; padding: 20px;">
          <h2>📚 اقتراح كتاب جديد</h2>
          <p>اقترح أحد المستخدمين إضافة الكتاب التالي:</p>
          <h3 style="color: #7c3aed;">${bookName}</h3>
          <p>يمكنك مراجعة الاقتراحات في لوحة Supabase.</p>
        </div>
      `,
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "فشل الإرسال" }, { status: 500 });
  return NextResponse.json({ success: true });
}