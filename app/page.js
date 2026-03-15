import Link from 'next/link';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AnnouncementBar from './components/AnnouncementBar';
import CourseProgress from './components/CourseProgress';
import { chapters, chapterOrder } from './data/chapters';

export default function HomePage() {
  return (
    <>
      <ParticleCanvas />
      <AnnouncementBar />
      <Navbar
        brandLabel="Course Hub"
        rightContent={<SearchBar />}
      />

      <div className="page-container">
        <header className="page-header">
          <div className="badge">CS313x — Information Retrieval</div>
          <h1>Interactive Course Materials</h1>
          <p>
            Explore every concept through hands-on interactive visualizations, step-by-step tutorials, and practice quizzes designed for deep understanding.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-num">6</div>
              <div className="stat-label">Chapters</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">37</div>
              <div className="stat-label">Visualizations</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">100+</div>
              <div className="stat-label">Quiz Questions</div>
            </div>
          </div>
        </header>

        {/* Course Progress Dashboard + Last Visited */}
        <CourseProgress />

        {/* Chapter Cards */}
        <div className="hub-grid" style={{ marginTop: '2rem' }}>
          {chapterOrder.map((id, idx) => {
            const ch = chapters[id];
            const totalTime = ch.visualizations.reduce((sum, v) => sum + (v.time || 5), 0);
            const href = ch.isPdfOnly ? ch.pdf : `/chapters/${id}`;
            const target = ch.isPdfOnly ? '_blank' : undefined;
            return (
              <Link
                key={id}
                href={href}
                target={target}
                className="glass-card hub-card chapter-card animate-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="card-number">
                  {String(ch.week).padStart(2, '0')}
                </div>
                <div className="chapter-week">Week {ch.week}</div>
                <h3>{ch.title}</h3>
                <p>{ch.description}</p>
                <div className="chapter-stats">
                  {ch.isPdfOnly ? (
                    <div className="stat">📄 <strong>PDF</strong> Lecture Slides</div>
                  ) : (
                    <>
                      <div className="stat">
                        <strong>{ch.visualizations.length}</strong> visualizations
                      </div>
                      <div className="stat">
                        <strong>~{totalTime}</strong> min
                      </div>
                    </>
                  )}
                </div>
                <div className="card-arrow">{ch.isPdfOnly ? 'Download PDF →' : 'Explore Chapter →'}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
