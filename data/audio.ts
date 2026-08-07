export interface Episode {
  icon: string;
  badge?: string;
  num?: string;
  title: string;
  desc: string;
  url: string;
  cta: string;
}

export interface ScholarBlock {
  name: string;
  desc: string;
  episodes: Episode[];
}

export const AUDIO_SCHOLARS: ScholarBlock[] = [
  {
    name: "د. هدى عبدالرحمن النمر",
    desc: "كاتبة وباحثة في العلوم الاجتماعية، تُعنى بعمران الذات المسلمة — محاضراتها تُصحح البوصلة وتُعيد ضبط مسار الحياة من منظور إسلامي أصيل.",
    episodes: [
      { icon: "▶️", badge: "يوتيوب", title: "من أين أبدأ تصحيح مساري", desc: "الخطوة الأولى في رحلة التصحيح — كيف تعرف أين أنت وإلى أين تتجه.", url: "https://youtu.be/VoO8EP_YQDA", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "كيف تتخذ القرارات في حياتك", desc: "منهج واضح لاتخاذ القرارات بثقة وبصيرة بعيداً عن التردد والضياع.", url: "https://youtu.be/ci5wR52kFKI", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "ركائز العزيمة بين ما نحب وما يجب", desc: "كيف توازن بين ما تحب وما يجب عليك — وتبني عزيمة لا تنكسر.", url: "https://youtu.be/_gjE3kSL4gs", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "لماذا نحن هنا — ضبط البوصلة وموازين الحياة", desc: "سؤال الوجود الأعمق — حين تعرف لماذا أنت هنا تتضح أمامك كل الموازين.", url: "https://youtu.be/fo1zU2rDHxI", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "الخواء الداخلي وهشاشة الشخصية", desc: "تشخيص دقيق للخواء الداخلي وكيف يُضعف الشخصية — ومسار العلاج.", url: "https://youtu.be/XXHFl81Gp7o", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "أزمة أوقات الفراغ", desc: "لماذا يُقلقنا الفراغ؟ وكيف نحوّله من أزمة إلى فرصة للنمو الحقيقي.", url: "https://youtu.be/ambicmUYhtM", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "كيف تختار المسار المهني", desc: "منهج إسلامي عملي لاختيار الكارير المناسب لك — بين الموهبة والرسالة.", url: "https://youtu.be/VBs4FagP-wA", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "لماذا تتحكم فينا وسائل التواصل والإعلام", desc: "كشف آليات التأثير الخفية — وكيف تستعيد سيادتك على عقلك وقلبك.", url: "https://youtu.be/5AIai_18MT8", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "النسوية وحرية المرأة بين الوهم والحقيقة", desc: "قراءة نقدية موضوعية للنسوية وحرية المرأة من منظور إسلامي واجتماعي رصين.", url: "https://youtu.be/OUp2sPp7ZiU", cta: "شاهد الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "اختيار القدوة وإيجاد المعلم المربي", desc: "كيف تختار قدوتك بوعي — ولماذا المعلم المربي ضرورة لا رفاهية في رحلة النمو.", url: "https://youtu.be/DqF9HTr55rA", cta: "شاهد الآن ←" },
    ],
  },
  {
    name: "الشيخ وجدان العلي",
    desc: "سلاسل في تجديد الإيمان وعصمة القرآن وبناء النفس",
    episodes: [
      { icon: "🎧", num: "٠١", title: "عصمة القرآن — لابد من تجديد الإيمان في القلوب", desc: "كيف يعصمك القرآن ويجدد إيمانك — للشيخ وجدان العلي", url: "https://on.soundcloud.com/rhVEwkUczUTmojBaBL", cta: "استمع الآن ←" },
      { icon: "🎧", num: "٠٢", title: "الافتقار إلى الله", desc: "حين يُدرك القلب فقره المطلق إلى الله — للشيخ وجدان العلي", url: "https://on.soundcloud.com/uPdcBzhqY7Vz7UVmKz", cta: "استمع الآن ←" },
      { icon: "🎧", num: "٠٣", title: "مقام الحب وأثره الفريد في السير إلى الله", desc: "حين يملأ حب الله القلب يصبح كل شيء سهلاً — للشيخ وجدان العلي", url: "https://on.soundcloud.com/bb0SjlDkytLCihauly", cta: "استمع الآن ←" },
      { icon: "🎧", num: "٠٤", title: "وقد يُقال لك ما أجمل عيبك", desc: "حين يكون عيبك نعمة لم تكتشفها بعد — للشيخ وجدان العلي", url: "https://on.soundcloud.com/pSkCARLh8FTVgrawDQ", cta: "استمع الآن ←" },
      { icon: "🎧", num: "٠٥", title: "لا تغادر الطريق إلى الله وإن أخطأت", desc: "الخطأ لا يعني النهاية — كيف تبقى على الطريق مهما تعثّرت.", url: "https://m.soundcloud.com/o_kaem/26f7uuxstr7b", cta: "استمع الآن ←" },
      { icon: "🎧", num: "٠٦", title: "مقطع هام عن الفتور", desc: "حين يتسلل الفتور إلى القلب — كيف تتعامل معه وتعود أقوى.", url: "https://on.soundcloud.com/TjCbULCQEmfLultVeJ", cta: "استمع الآن ←" },
    ],
  },
  {
    name: "مقاطع مختارة",
    desc: "مقاطع صوتية ومرئية تلامس القلب وتُعيد توجيه البوصلة",
    episodes: [
      { icon: "🎧", title: "وكيف أخاف", desc: "مقطع يُعيد للقلب الطمأنينة ويُذكّره بمن بيده كل شيء.", url: "https://on.soundcloud.com/43rGLqcmnunDPFWyW9", cta: "استمع الآن ←" },
      { icon: "🎧", title: "سبق المفردون", desc: "حين يصبح الذكر روحاً تسري في العروق ونوراً يملأ القلب — اكتشف سر من سبقوا الناس بلا سلاح إلا بذكر الله.", url: "https://on.soundcloud.com/l9bzNeNtXLtewC7ZUE", cta: "استمع الآن ←" },
      { icon: "🎧", title: "أهم عشر دقائق بعمرك كله", desc: "الشيخ سعيد الكملي — عشر دقائق قد تغير مسار حياتك كلها.", url: "https://on.soundcloud.com/KOyKb7ckxH2ZgNLnLs", cta: "استمع الآن ←" },
      { icon: "▶️", badge: "يوتيوب", title: "هل تشعر بالإرهاق النفسي؟", desc: "د. هيفاء يونس — رسالة لكل متعب نفسياً يبحث عن راحة القلب وتجديد الأمل بالله.", url: "https://youtu.be/9_pbx02hCcY", cta: "شاهد الآن ←" },
    ],
  },
  {
    name: "سلاسل مختارة",
    desc: "سلاسل في تزكية النفس وتحرير القلب من أمراضه",
    episodes: [
      { icon: "▶️", badge: "يوتيوب", title: "فقه النفس", desc: "تعرّف على نفسك بمنهج إسلامي أصيل — سلسلة تُعينك على فهم دواخلك وكيف تُصلح ما أفسده الغفلة.", url: "https://youtube.com/playlist?list=PLvGpI5t1gJ8RPD1JEMzntUvjyALlqaJo8", cta: "شاهد السلسلة ←" },
      { icon: "▶️", badge: "يوتيوب", title: "تذوق العبادات", desc: "كيف تتذوق حلاوة العبادة وتشعر بأثرها في قلبك — سلسلة تُعيد اكتشافك للعبادة من جديد.", url: "https://youtube.com/playlist?list=PLSFJcWy6euuDj6XSqBM-MmKhCyrXK_ywv", cta: "شاهد السلسلة ←" },
      { icon: "▶️", badge: "يوتيوب", title: "لازم تتحرر", desc: "تحرّر من كل ما يُثقل روحك — سلسلة تأخذك في رحلة التخلص من القيود الداخلية نحو حرية حقيقية.", url: "https://youtube.com/playlist?list=PLSFJcWy6euuAZPTasEUJRSrKEp85h6HPY", cta: "شاهد السلسلة ←" },
      { icon: "▶️", badge: "يوتيوب", title: "خبائث القلب", desc: "تعرّف على أمراض القلب الخفية من حسد وكبر ورياء — وكيف تُطهّر قلبك منها بمنهج أصيل.", url: "https://youtube.com/playlist?list=PLSFJcWy6euuBek1JZwJdqT_3rsUhXtmBv", cta: "شاهد السلسلة ←" },
    ],
  },
];
