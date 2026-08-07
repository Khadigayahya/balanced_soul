import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "لا توجد رسائل" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const lastMessageContent = lastMessage?.content?.trim();

    if (!lastMessageContent && !lastMessage?.image) {
      return NextResponse.json({ error: "الرسالة فارغة" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: `أنت مساعد متخصص في منصة "صحح بوصلة قلبك" — منصة إسلامية للصحة النفسية والتزكية.
مهمتك: تقديم الدعم النفسي بأسلوب إسلامي دافئ، المساعدة في التنظيم اليومي، الإجابة على الأسئلة الدينية والتربوية، والتحفيز بالآيات والأحاديث.
إذا أرسل المستخدم صورة، حللها وقدم تعليقاً مفيداً عليها بأسلوب إسلامي.
قواعد: تكلم بالعربية الفصحى، كن متعاطفاً، لا تقدم تشخيصاً طبياً، وردودك مختصرة (3-5 جمل).`,
    });

    let chatHistory = messages
      .slice(0, -1)
      .filter((m: any) => m.content && m.content.trim() !== "")
      .map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

    while (chatHistory.length > 0 && chatHistory[0].role === "model") {
      chatHistory.shift();
    }

    const chat = model.startChat({ history: chatHistory });

    // لو في صورة
    if (lastMessage.image) {
      const base64 = lastMessage.image.split(",")[1];
      const mimeType = lastMessage.image.split(";")[0].split(":")[1];
      const result = await chat.sendMessage([
        { text: lastMessageContent || "ما رأيك في هذه الصورة؟" },
        { inlineData: { mimeType, data: base64 } },
      ]);
      return NextResponse.json({ reply: result.response.text() });
    }

    const result = await chat.sendMessage(lastMessageContent);
    const text = result.response.text();
    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Gemini Error:", error);

    if (error.status === 429 || error.message?.includes("429")) {
      return NextResponse.json(
        { error: "نعتذر، انتهت الحصة المجانية حالياً. يرجى المحاولة بعد دقيقة." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "حدث خطأ غير متوقع في الخادم." },
      { status: 500 }
    );
  }
}