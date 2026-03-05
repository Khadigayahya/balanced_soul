export default function Home() {
  return (
    <main>
      {/* NAV */}
      <nav className="nav">
        <a href="/" className="nav-logo">صحح <span>بوصلة</span> قلبك</a>
        <ul className="nav-links">
          <li><a href="/#vision">رؤيتنا</a></li>
          <li><a href="/audio">المسموعات</a></li>
          <li><a href="/readings">المقروءات</a></li>
          <li><a href="/daily">يومياتي</a></li>
          <li><a href="/adhkar">أذكاري</a></li>
          <li><a href="/consultation">استشارة</a></li>
        </ul>
      </nav>

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
          <div className="hero-actions">
            <a href="/audio" className="btn-primary">ابدأ رحلتك ←</a>
            <a href="#vision" className="btn-secondary">تعرف علينا أكثر</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="heart-container">
            <img src="/heart.jpeg" alt="والرحلة من هنا تبدأ" className="hero-img"/>
          </div>
          <p className="quote-float">
            «ألا وإن في الجسد مضغة إذا صلحت صلح الجسد كله، وإذا فسدت فسد الجسد كله، ألا وهي القلب»
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="features-header">
          <p className="section-label">ما ستجد هنا</p>
          <h2 className="section-title">كل ما تحتاجه<br/>في مكان واحد</h2>
          <p className="section-subtitle">أدوات تبني الإنسان من الداخل، تجمع بين أصالة الوحي وفهم النفس.</p>
        </div>
        <div className="features-grid">
          {[
  { icon: "🎧", title: "المسموعات", desc: "سلاسل مختارة في فقه النفس، حسن التوكل، سِيَر القدوات، وفهم القرآن.", href: "/audio" },
  { icon: "📖", title: "المقروءات", desc: "مقالات قصيرة وعملية، تجارب شخصية حقيقية، ومقتطفات مختارة.", href: "/readings" },
  { icon: "📅", title: "يومياتي", desc: "خطط يومك، سجّل إنجازاتك، واحتفل بكل خطوة بتوازن.", href: "/daily" },
  { icon: "🤲", title: "أدعيتي وأذكاري", desc: "أذكار الصباح والمساء وأدعية للمواقف المختلفة.", href: "/adhkar" },
  { icon: "💬", title: "استشارة", desc: "مساحة آمنة للاستشارة بمنهج إسلامي أصيل.", href: "/consultation" },
].map((item) => (
            <a href={item.href} className="feature-card" key={item.title}>
              <span className="feature-icon">{item.icon}</span>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* VISION */}
<section id="vision" className="vision-section-wrapper">
  <div className="vision-section">
    <div>
      <p className="section-label">رؤيتنا</p>
      <h2 className="section-title">الوصول إلى إنسانٍ<br/>راسخٍ متوازن</h2>
      <p className="section-subtitle">
        غايتنا أن تكون قادراً على حُسن التصرف مع نفسك، ومع من حولك، وفيما يعترضك من أحوال الحياة.
      </p>
      <ul className="vision-list">
        {[
          "فقه النفس — معرفة نفسك ومشاعرك معرفةً عميقة",
          "فن التواصل — مخالطة الناس بحكمةٍ وحُسن خُلق",
          "القدوات — التعلّم من أهل الثبات كيف واجهوا البلاء",
          "القرآن — البناء على أرسخ الأسس وأثبتها",
          "التوازن — دينٌ ودنيا، قوةٌ ورحمة، ثباتٌ ونماء",
        ].map((item) => (
          <li key={item}><span className="bullet"></span><span>{item}</span></li>
        ))}
      </ul>
    </div>
    <div className="vision-card">
      <p className="vision-card-quote">
        «الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ، وَفِي كُلٍّ خَيْرٌ»
      </p>
      <p className="vision-card-attr">صحيح مسلم</p>
      <div className="vision-card-accent"></div>
    </div>
  </div>
</section>

      {/* HADITH */}
      <div className="hadith-section">
        <p className="hadith-text">«احْرِصْ عَلَى مَا <em>يَنْفَعُكَ</em>، وَاسْتَعِنْ بِاللَّهِ، وَلَا تَعْجَزْ»</p>
        <p className="hadith-source">صحيح مسلم</p>
      </div>

      {/* CTA */}
      <section className="cta-section">
        <p className="section-label" style={{textAlign:"center"}}>ابدأ اليوم</p>
        <h2 className="section-title">الرحلة من هنا تبدأ</h2>
        <p className="section-subtitle" style={{margin:"0 auto 2.5rem", textAlign:"center"}}>
          كل خطوة صغيرة نحو نفسك تستحق. ابدأ برحلتك الان
        </p>
        <a href="/audio" className="btn-primary" style={{fontSize:"1.1rem", padding:"1rem 2.8rem"}}>
          اكتشف المنصة ←
        </a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>
    </main>
  );
}