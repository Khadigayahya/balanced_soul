import "./home.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import RevealSection from "@/components/RevealSection";
import QuoteOfDay from "@/components/QuoteOfDay";
import SiteSearch from "@/components/SiteSearch";
import BackToTop from "@/components/BackToTop";

const FEATURES = [
  { icon: "🎧", title: "المسموعات", desc: "سلاسل مختارة في فقه النفس، حسن التوكل، سِيَر القدوات، وفهم القرآن.", href: "/audio" },
  { icon: "📖", title: "المقروءات", desc: "مقالات قصيرة وعملية، تجارب شخصية حقيقية، ومقتطفات مختارة.", href: "/readings" },
  { icon: "📅", title: "يومياتي", desc: "خطط يومك، سجّل إنجازاتك، واحتفل بكل خطوة بتوازن.", href: "/daily" },
  { icon: "", title: "أدعيتي وأذكاري", desc: "أذكار الصباح والمساء وأدعية للمواقف المختلفة.", href: "/adhkar" },
  { icon: "💬", title: "استشارة", desc: "مساحة آمنة للاستشارة بمنهج إسلامي أصيل.", href: "/consultation" },
];

const VISION_POINTS = [
  "فقه النفس — معرفة نفسك ومشاعرك معرفةً عميقة",
  "فن التواصل — مخالطة الناس بحكمةٍ وحُسن خُلق",
  "القدوات — التعلّم من أهل الثبات كيف واجهوا البلاء",
  "القرآن — البناء على أرسخ الأسس وأثبتها",
  "التوازن — دينٌ ودنيا، قوةٌ ورحمة، ثباتٌ ونماء",
];

export default function Home() {
  return (
    <main>
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <span className="hero-badge">✦ رحلة التزكية والاتزان</span>
          <h1 className="hero-title">
            صحح <span className="highlight">بوصلة</span> قلبك
          </h1>
          <p className="hero-desc">
            حين تصلح البوصلة، تستقيم الرحلة — هنا مَنصّةٌ تُعينكَ على فهم نفسك، وتجديد صلتك بربك، والنهوض بحياتك من موضع قوةٍ وثبات، فالمؤمن القوي خيرٌ وأحبُّ إلى الله من المؤمن الضعيف.
          </p>
          <div className="hero-pills">
            {FEATURES.map(item => (
              <a key={item.title} href={item.href} className="hero-pill">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.title}</span>
              </a>
            ))}
          </div>
          <SiteSearch />
        </div>

        <div className="hero-visual">
          <div className="heart-container">
            <img src="/heart.jpeg" alt="والرحلة من هنا تبدأ" className="hero-img" />
          </div>
          <QuoteOfDay />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <RevealSection className="features-header">
          <p className="section-label">ما ستجد هنا</p>
          <h2 className="section-title">كل ما تحتاجه<br />في مكان واحد</h2>
          <p className="section-subtitle">أدوات تبني الإنسان من الداخل، تجمع بين أصالة الوحي وفهم النفس.</p>
        </RevealSection>
        <div className="features-grid">
          {FEATURES.map((item, i) => (
            <FeatureCard key={item.title} {...item} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="vision-section-wrapper">
        <div className="vision-section">
          <RevealSection>
            <p className="section-label">رؤيتنا</p>
            <h2 className="section-title">الوصول إلى إنسانٍ<br />راسخٍ متوازن</h2>
            <p className="section-subtitle">
              غايتنا أن تكون قادراً على حُسن التصرف مع نفسك، ومع من حولك، وفيما يعترضك من أحوال الحياة.
            </p>
            <ul className="vision-list">
              {VISION_POINTS.map((item) => (
                <li key={item}><span className="bullet"></span><span>{item}</span></li>
              ))}
            </ul>
          </RevealSection>
          <RevealSection className="vision-card">
            <p className="vision-card-quote">
              «الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ»
            </p>
            <p className="vision-card-attr">صحيح مسلم</p>
            <div className="vision-card-accent"></div>
          </RevealSection>
        </div>
      </section>

      {/* HADITH */}
      <div className="hadith-section">
        <p className="hadith-text">«احْرِصْ عَلَى مَا <em>يَنْفَعُكَ</em>، وَاسْتَعِنْ بِاللَّهِ، وَلَا تَعْجَزْ»</p>
        <p className="hadith-source">صحيح مسلم</p>
      </div>

      {/* CTA */}
      <section className="cta-section">
        <RevealSection>
          <p className="section-label" style={{ textAlign: "center" }}>ابدأ اليوم</p>
          <h2 className="section-title">الرحلة من هنا تبدأ</h2>
          <p className="section-subtitle" style={{ margin: "0 auto 2.5rem", textAlign: "center" }}>
            كل خطوة صغيرة نحو نفسك تستحق. ابدأ برحلتك الان
          </p>
          <a href="/audio" className="btn-primary" style={{ fontSize: "1.1rem", padding: "1rem 2.8rem" }}>
            اكتشف المنصة ←
          </a>
        </RevealSection>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
