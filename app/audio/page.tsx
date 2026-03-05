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
              
               <a href="https://on.soundcloud.com/rhVEwkUczUTmojBaBL"
                target="_blank"
                rel="noopener noreferrer"
                className="episode-btn"
              >
                استمع الآن ←
              </a>
            </div>

            {[2, 3, 4].map((n) => (
              <div className="episode-card episode-soon" key={n}>
                <div className="episode-top">
                  <span className="episode-icon">🎧</span>
                  <span className="episode-num">٠{n}</span>
                </div>
                <h3 className="episode-title">قريباً...</h3>
                <p className="episode-desc">سيتم إضافة المزيد من السلاسل قريباً بإذن الله</p>
                <span className="episode-soon-tag">قريباً</span>
              </div>
            ))}

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