import Link from 'next/link';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import { chapters, chapterOrder } from './data/chapters';

export default function HomePage() {
  return (
    <>
      <ParticleCanvas />
      <Navbar brandLabel="Course Hub" />

      <div className="page-container">
        <header className="page-header">
          <div className="badge">CS313x — Information Retrieval</div>
          <h1>Interactive Course Materials</h1>
          <p>
            Explore every concept through hands-on interactive visualizations, step-by-step tutorials, and practice quizzes designed for deep understanding.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-num">4</div>
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

        <div className="hub-grid">
          {chapterOrder.map((id, idx) => {
            const ch = chapters[id];
            return (
              <Link
                key={id}
                href={`/chapters/${id}`}
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
                  <div className="stat">
                    <strong>{ch.visualizations.length}</strong> visualizations
                  </div>
                  <div className="stat">
                    <strong>{ch.categories.length - 1}</strong> topics
                  </div>
                </div>
                <div className="card-arrow">Explore Chapter →</div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
