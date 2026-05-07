export default function AudioPage() {
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

      {/* QURAN INTRO */}
      <section className="quran-intro">
        <div className="quran-intro-inner">
          <span className="section-label">مدخل</span>
          <p className="quran-text">
            في سفر الحياة لا حراك لك إلا بالحياة، ولن تبصر دربك إلا بالنور، ولن تصل إلى منزلك إلا بالهداية،
            وليس هذا كله إلا في القرآن المجيد الذي جعله الله رب العالمين روحاً ونوراً وهداية وحياة.
          </p>
          <p className="quran-text">
            كل الناس يغدو فبائع نفسه فمعتقها أو موبقها، والقرآن حجةٌ لك أو عليك.
          </p>
          <p className="quran-tag">القرآن نور. ✦</p>
        </div>
      </section>

      {/* AUDIO SECTION */}
      <section className="audio-section">

        <div className="audio-header">
          <span className="section-label">السلاسل الصوتية</span>
          <h1 className="section-title">مسموعات مختارة</h1>
          <p className="section-subtitle">
            سلاسل تُعينك على بناء نفسك من الداخل — اختر ما يناسب حالك اليوم.
          </p>
        </div>

        {/* د. هدى عبدالرحمن النمر */}
        <div className="scholar-block">
          <div className="scholar-header">
            <div className="scholar-info">
              <h2 className="scholar-name">د. هدى عبدالرحمن النمر</h2>
              <p className="scholar-desc">كاتبة وباحثة في العلوم الاجتماعية، تُعنى بعمران الذات المسلمة — محاضراتها تُصحح البوصلة وتُعيد ضبط مسار الحياة من منظور إسلامي أصيل.</p>
            </div>
          </div>

          <div className="episodes-grid">

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">من أين أبدأ تصحيح مساري</h3>
              <p className="episode-desc">الخطوة الأولى في رحلة التصحيح — كيف تعرف أين أنت وإلى أين تتجه.</p>
              <a href="https://youtu.be/VoO8EP_YQDA" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">كيف تتخذ القرارات في حياتك</h3>
              <p className="episode-desc">منهج واضح لاتخاذ القرارات بثقة وبصيرة بعيداً عن التردد والضياع.</p>
              <a href="https://youtu.be/ci5wR52kFKI" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">ركائز العزيمة بين ما نحب وما يجب</h3>
              <p className="episode-desc">كيف توازن بين ما تحب وما يجب عليك — وتبني عزيمة لا تنكسر.</p>
              <a href="https://youtu.be/_gjE3kSL4gs" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">لماذا نحن هنا — ضبط البوصلة وموازين الحياة</h3>
              <p className="episode-desc">سؤال الوجود الأعمق — حين تعرف لماذا أنت هنا تتضح أمامك كل الموازين.</p>
              <a href="https://youtu.be/fo1zU2rDHxI" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">الخواء الداخلي وهشاشة الشخصية</h3>
              <p className="episode-desc">تشخيص دقيق للخواء الداخلي وكيف يُضعف الشخصية — ومسار العلاج.</p>
              <a href="https://youtu.be/XXHFl81Gp7o" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">أزمة أوقات الفراغ</h3>
              <p className="episode-desc">لماذا يُقلقنا الفراغ؟ وكيف نحوّله من أزمة إلى فرصة للنمو الحقيقي.</p>
              <a href="https://youtu.be/ambicmUYhtM" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">كيف تختار المسار المهني</h3>
              <p className="episode-desc">منهج إسلامي عملي لاختيار الكارير المناسب لك — بين الموهبة والرسالة.</p>
              <a href="https://youtu.be/VBs4FagP-wA" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">لماذا تتحكم فينا وسائل التواصل والإعلام</h3>
              <p className="episode-desc">كشف آليات التأثير الخفية — وكيف تستعيد سيادتك على عقلك وقلبك.</p>
              <a href="https://youtu.be/5AIai_18MT8" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">النسوية وحرية المرأة بين الوهم والحقيقة</h3>
              <p className="episode-desc">قراءة نقدية موضوعية للنسوية وحرية المرأة من منظور إسلامي واجتماعي رصين.</p>
              <a href="https://youtu.be/OUp2sPp7ZiU" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">اختيار القدوة وإيجاد المعلم المربي</h3>
              <p className="episode-desc">كيف تختار قدوتك بوعي — ولماذا المعلم المربي ضرورة لا رفاهية في رحلة النمو.</p>
              <a href="https://youtu.be/DqF9HTr55rA" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

          </div>
        </div>

        {/* الشيخ وجدان العلي */}
        <div className="scholar-block">
          <div className="scholar-header">
            <div className="scholar-info">
              <h2 className="scholar-name">الشيخ وجدان العلي</h2>
              <p className="scholar-desc">سلاسل في تجديد الإيمان وعصمة القرآن وبناء النفس</p>
            </div>
          </div>

          <div className="episodes-grid">

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
                <span className="episode-num">٠١</span>
              </div>
              <h3 className="episode-title">عصمة القرآن — لابد من تجديد الإيمان في القلوب</h3>
              <p className="episode-desc">كيف يعصمك القرآن ويجدد إيمانك — للشيخ وجدان العلي</p>
              <a href="https://on.soundcloud.com/rhVEwkUczUTmojBaBL" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
                <span className="episode-num">٠٢</span>
              </div>
              <h3 className="episode-title">الافتقار إلى الله</h3>
              <p className="episode-desc">حين يُدرك القلب فقره المطلق إلى الله — للشيخ وجدان العلي</p>
              <a href="https://on.soundcloud.com/uPdcBzhqY7Vz7UVmKz" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
                <span className="episode-num">٠٣</span>
              </div>
              <h3 className="episode-title">مقام الحب وأثره الفريد في السير إلى الله</h3>
              <p className="episode-desc">حين يملأ حب الله القلب يصبح كل شيء سهلاً — للشيخ وجدان العلي</p>
              <a href="https://on.soundcloud.com/bb0SjlDkytLCihauly" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
                <span className="episode-num">٠٤</span>
              </div>
              <h3 className="episode-title">وقد يُقال لك ما أجمل عيبك</h3>
              <p className="episode-desc">حين يكون عيبك نعمة لم تكتشفها بعد — للشيخ وجدان العلي</p>
              <a href="https://on.soundcloud.com/pSkCARLh8FTVgrawDQ" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
                <span className="episode-num">٠٥</span>
              </div>
              <h3 className="episode-title">لا تغادر الطريق إلى الله وإن أخطأت</h3>
              <p className="episode-desc">الخطأ لا يعني النهاية — كيف تبقى على الطريق مهما تعثّرت.</p>
              <a href="https://m.soundcloud.com/o_kaem/26f7uuxstr7b" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
                <span className="episode-num">٠٦</span>
              </div>
              <h3 className="episode-title">مقطع هام عن الفتور</h3>
              <p className="episode-desc">حين يتسلل الفتور إلى القلب — كيف تتعامل معه وتعود أقوى.</p>
              <a href="https://on.soundcloud.com/TjCbULCQEmfLultVeJ" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

          </div>
        </div>

        {/* مقاطع مختارة */}
        <div className="scholar-block">
          <div className="scholar-header">
            <div className="scholar-info">
              <h2 className="scholar-name">مقاطع مختارة</h2>
              <p className="scholar-desc">مقاطع صوتية ومرئية تلامس القلب وتُعيد توجيه البوصلة</p>
            </div>
          </div>

          <div className="episodes-grid">

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
              </div>
              <h3 className="episode-title">وكيف أخاف</h3>
              <p className="episode-desc">مقطع يُعيد للقلب الطمأنينة ويُذكّره بمن بيده كل شيء.</p>
              <a href="https://on.soundcloud.com/43rGLqcmnunDPFWyW9" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
              </div>
              <h3 className="episode-title">سبق المفردون</h3>
              <p className="episode-desc">حين يصبح الذكر روحاً تسري في العروق ونوراً يملأ القلب — اكتشف سر من سبقوا الناس بلا سلاح إلا بذكر الله.</p>
              <a href="https://on.soundcloud.com/l9bzNeNtXLtewC7ZUE" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">🎧</span>
              </div>
              <h3 className="episode-title">أهم عشر دقائق بعمرك كله</h3>
              <p className="episode-desc">الشيخ سعيد الكملي — عشر دقائق قد تغير مسار حياتك كلها.</p>
              <a href="https://on.soundcloud.com/KOyKb7ckxH2ZgNLnLs" target="_blank" rel="noopener noreferrer" className="episode-btn">استمع الآن ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">هل تشعر بالإرهاق النفسي؟</h3>
              <p className="episode-desc">د. هيفاء يونس — رسالة لكل متعب نفسياً يبحث عن راحة القلب وتجديد الأمل بالله.</p>
              <a href="https://youtu.be/9_pbx02hCcY" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد الآن ←</a>
            </div>

          </div>
        </div>

        {/* سلاسل مختارة */}
        <div className="scholar-block">
          <div className="scholar-header">
            <div className="scholar-info">
              <h2 className="scholar-name">سلاسل مختارة</h2>
              <p className="scholar-desc">سلاسل في تزكية النفس وتحرير القلب من أمراضه</p>
            </div>
          </div>

          <div className="episodes-grid">

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">فقه النفس</h3>
              <p className="episode-desc">تعرّف على نفسك بمنهج إسلامي أصيل — سلسلة تُعينك على فهم دواخلك وكيف تُصلح ما أفسده الغفلة.</p>
              <a href="https://youtube.com/playlist?list=PLvGpI5t1gJ8RPD1JEMzntUvjyALlqaJo8" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد السلسلة ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">تذوق العبادات</h3>
              <p className="episode-desc">كيف تتذوق حلاوة العبادة وتشعر بأثرها في قلبك — سلسلة تُعيد اكتشافك للعبادة من جديد.</p>
              <a href="https://youtube.com/playlist?list=PLSFJcWy6euuDj6XSqBM-MmKhCyrXK_ywv" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد السلسلة ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">لازم تتحرر</h3>
              <p className="episode-desc">تحرّر من كل ما يُثقل روحك — سلسلة تأخذك في رحلة التخلص من القيود الداخلية نحو حرية حقيقية.</p>
              <a href="https://youtube.com/playlist?list=PLSFJcWy6euuAZPTasEUJRSrKEp85h6HPY" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد السلسلة ←</a>
            </div>

            <div className="episode-card">
              <div className="episode-top">
                <span className="episode-icon">▶️</span>
                <span className="episode-badge">يوتيوب</span>
              </div>
              <h3 className="episode-title">خبائث القلب</h3>
              <p className="episode-desc">تعرّف على أمراض القلب الخفية من حسد وكبر ورياء — وكيف تُطهّر قلبك منها بمنهج أصيل.</p>
              <a href="https://youtube.com/playlist?list=PLSFJcWy6euuBek1JZwJdqT_3rsUhXtmBv" target="_blank" rel="noopener noreferrer" className="episode-btn">شاهد السلسلة ←</a>
            </div>

          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        <a href="/" className="footer-logo">صحح <span>بوصلة</span> قلبك</a>
        <p>رحلة التزكية والاتزان · ٢٠٢٦</p>
      </footer>

    </main>
  );
}