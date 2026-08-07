import "./audio.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RevealSection from "@/components/RevealSection";
import EpisodeCard from "@/components/EpisodeCard";
import { AUDIO_SCHOLARS } from "@/data/audio";

export default function AudioPage() {
  return (
    <main>
      <Nav />

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

        {AUDIO_SCHOLARS.map((scholar, si) => (
          <div className="scholar-block" key={scholar.name}>
            <RevealSection className="scholar-header">
              <div className="scholar-info">
                <h2 className="scholar-name">{scholar.name}</h2>
                <p className="scholar-desc">{scholar.desc}</p>
              </div>
            </RevealSection>

            <div className="episodes-grid">
              {scholar.episodes.map((episode, ei) => (
                <EpisodeCard key={episode.title} {...episode} anchorId={`ep-${si}-${ei}`} delay={(ei % 3) * 80} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
