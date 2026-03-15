'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function ChapterHub({ chapterId, chapter }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visited, setVisited] = useState([]);

  const storageKey = `${chapterId}_visited`;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setVisited(stored);
  }, [storageKey]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(storageKey);
    setVisited([]);
  }, [storageKey]);

  const filtered = activeFilter === 'all'
    ? chapter.visualizations
    : chapter.visualizations.filter(v => v.cat === activeFilter);

  const totalViz = chapter.visualizations.length;
  const visitedCount = visited.length;
  const progressPct = totalViz > 0 ? (visitedCount / totalViz) * 100 : 0;

  return (
    <>
      {/* Welcome & Progress */}
      <div className="welcome-bar">
        <div className="welcome-icon">🎓</div>
        <div className="welcome-text">
          <h3>Your Learning Journey</h3>
          <p>Work through each visualization in order, or jump to any topic. Each includes a guided tutorial and practice quiz!</p>
          <div className="overall-progress">
            <div className="fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
        <div className="progress-info">
          <div className="progress-count">{visitedCount}/{totalViz}</div>
          <div className="progress-label">Explored</div>
        </div>
      </div>

      {/* Filter */}
      <div className="learning-path">
        <span className="path-label">Filter:</span>
        {chapter.categories.map(cat => (
          <button
            key={cat.id}
            className={`path-tag ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* PDF Download */}
      {chapter.pdf && (
        <div style={{ marginBottom: '1.5rem' }}>
          <a href={chapter.pdf} target="_blank" rel="noopener noreferrer" className="pdf-download">
            📄 Download Lecture Slides (PDF)
          </a>
          <button className="btn btn-sm" onClick={resetProgress} style={{ marginLeft: '0.75rem', fontSize: '0.72rem' }}>
            Reset Progress
          </button>
        </div>
      )}

      {/* Cards Grid */}
      <div className="hub-grid">
        {filtered.map((viz, idx) => {
          const done = visited.includes(viz.id);
          const isNext = !done && (idx === 0 || visited.includes(filtered[Math.max(0, idx - 1)]?.id));

          // For chapter04 single-page, link directly to the anchor
          const vizHref = chapter.isSinglePage
            ? `/chapters/${chapterId}/fullpage`
            : `/chapters/${chapterId}/viz/${viz.id}`;

          return (
            <Link
              href={vizHref}
              key={viz.id}
              className={`glass-card hub-card ${done ? 'visited' : ''}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {isNext && !done && <div className="recommended-tag">START HERE</div>}
              <div className={`card-check ${done ? 'done' : 'pending'}`}>
                {done ? '✓' : ''}
              </div>
              <div className="card-number">{String(viz.id).padStart(2, '0')}</div>
              <h3>{viz.title}</h3>
              <div className="card-aim">🎯 {viz.aim}</div>
              <div className="card-use">🔧 <strong>When to use:</strong> {viz.use}</div>
              <p>{viz.desc}</p>
              <div className="difficulty-badge" data-diff={viz.diff}>
                <span className={`difficulty-badge diff-${viz.diff}`}>{viz.diff}</span>
              </div>
              <div className="card-arrow">{done ? 'Review →' : 'Explore →'}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
