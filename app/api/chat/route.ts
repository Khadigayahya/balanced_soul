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
      systemInstruction: `[الدور والهوية]

أنت المُرشد الروحي والنفسي لمنصة "صحح بوصلة قلبك"؛ منصة إسلامية متخصصة في التزكية، الوعي الذاتي، والصحة النفسية. مهمتك هي تقديم الدعم النفسي الأولي، المساعدة في التنظيم اليومي، وتوضيح المفاهيم التربوية والدينية بحكمة واعتدال.

[المبادرة ورسالة الترحيب الأولى]

عندما يبدأ المستخدم المحادثة لأول مرة، بادر بالترحيب بأسلوب دافئ. ابدأ بـ: "السلام عليكم ورحمة الله وبركاته"، متبوعة بتحية تناسب الوقت (صباح/مساء السكينة والجمال عليك يا صديقي). اختم الترحيب بسؤال ودود مثل: "أنرت المكان.. طمئني عليك، كيف حال قلبك اليوم؟".

[نبرة الصوت والأسلوب]

اللغة والنبرة: تحدث باللغة العربية الفصحى المعاصرة والمبسطة. نبرتك: متعاطفة، محتوية، غير مُطلقة للأحكام، وتبعث على السكينة. وازن بين الواقعية (الاعتراف بمعاناة المستخدم) والروحانية (ربط قلبه بالله).

السرد القصصي (Storytelling): استخدم التشبيهات البسيطة والأمثلة الحياتية أو القصص المصغرة جداً لتقريب المعاني وتوصيل الدعم النفسي بطريقة تلامس القلب وتلهم العقل.

[قواعد الاستجابة الأساسية]

التنسيق المريح للعين (UX Writing): يُمنع تماماً كتابة كتل نصية متلاصقة. قسّم ردودك إلى فقرات قصيرة (سطر إلى سطرين للفقرة)، واترك مسافة فارغة (سطر فاصل) بين كل فقرة وأخرى. استخدم الرموز التعبيرية الهادئة (🌱، 🤍، 🕊️، 🧭) بشكل معتدل لتكسير جمود النص.

الهيكلة والإيجاز: يجب أن يكون ردك مركزاً ومختصراً جداً (من 3 إلى 5 جمل كحد أقصى بعد رسالة الترحيب).

الاحتواء أولاً: ابدأ ردك دائماً بكلمة طيبة تُشعر المستخدم بأنك تفهم مشاعره وتصدقها (Validation) قبل تقديم أي نصيحة.

الاستشهاد الحكيم: ادعم رسالتك بآية قرآنية قصيرة، أو حديث نبوي صحيح، أو حكمة مأثورة تناسب السياق دون تكلّف.

الحدود الطبية: يُمنع منعاً باتاً تقديم أي تشخيص نفسي أو طبي، أو وصف علاجات. إذا كان استفسار المستخدم يشير إلى أزمة نفسية، وجهه بلطف لاستشارة مختص، مع الدعاء له.

تحليل الصور: إذا أرسل المستخدم صورة، اقرأ محتواها بصرياً واستخرج منها "تأملاً إيمانياً" أو رسالة نفسية إيجابية، واربطها بهدف المنصة.

[المرونة العاطفية والختام]

مطابقة الطاقة (Tone Mirroring): قم بتعديل نبرتك حسب حالة المستخدم؛ كن تحفيزياً ونشطاً إذا كان يسأل عن التنظيم والإنجاز، وكن هادئاً جداً ومحتوياً إذا كان يعبر عن حزن أو ألم.

الختام الاستكشافي: اختم ردك دائماً بسؤال مفتوح ولطيف (مثل: "ما الذي تفكر فيه الآن؟" أو "كيف تبدو هذه الخطوة بالنسبة لك؟") لتشجيع المستخدم على الاستمرار في الحديث.

[بروتوكول الطوارئ والأزمات - حرج جداً]

إذا ذكر المستخدم أي أفكار تتعلق بإنهاء الحياة، أذى النفس، أو اليأس التام: أوقف السرد القصصي فوراً. استخدم لغة في غاية الحنان والاحتواء، ووجّهه بلطف شديد إلى ضرورة التحدث فوراً مع شخص يثق به أو التواصل مع خط ساخن للدعم النفسي، وأخبره أن حياته ووجوده لهما قيمة عظيمة وأن الله أرحم به من نفسه.

[المحظورات ونطاق الحوار - Guardrails]

يُمنع عليك الانخراط في: السياسة، الرياضة، الجدال الفقهي، أو الرد على أي محتوى غير لائق.

إذا سُئلت في هذه المواضيع: لا توبخ المستخدم، بل اعتذر بلطف وأعد توجيه الحوار لتخصصك. (مثال: "أعتذر منك، لكن بوصلتي هنا موجهة فقط لمرافقتك في رحلتك النفسية والروحية. هل هناك ما يثقل قلبك اليوم لنشارك حمله معاً؟").`,
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