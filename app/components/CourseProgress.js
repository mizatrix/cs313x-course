'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { chapters, chapterOrder } from '../data/chapters';

export default function CourseProgress() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const p = {};
    chapterOrder.forEach(chId => {
      const stored = JSON.parse(localStorage.getItem(`${chId}_visited`) || '[]');
      p[chId] = stored;
    });
    setProgress(p);
  }, []);

  const totalViz = chapterOrder.reduce((sum, id) => sum + chapters[id].visualizations.length, 0);
  const totalVisited = Object.values(progress).reduce((sum, arr) => sum + arr.length, 0);
  const overallPct = totalViz > 0 ? Math.round((totalVisited / totalViz) * 100) : 0;

  // Get last visited visualization
  const lastVisitedKey = 'cs313x_last_visited';
  const [lastVisited, setLastVisited] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem(lastVisitedKey);
    if (stored) {
      try { setLastVisited(JSON.parse(stored)); } catch {}
    }
  }, []);

  return (
    <div className="course-progress-section">
      {/* Overall Progress */}
      <div className="glass-card no-hover course-progress-card">
        <div className="progress-header">
          <div>
            <h3>📊 Overall Course Progress</h3>
            <p className="progress-subtitle">{totalVisited} of {totalViz} visualizations completed</p>
          </div>
          <div className="progress-pct">{overallPct}%</div>
        </div>
        <div className="overall-progress" style={{ marginTop: '1rem', height: '8px' }}>
          <div className="fill" style={{ width: `${overallPct}%` }} />
        </div>
        <div className="chapter-progress-bars">
          {chapterOrder.map(chId => {
            const ch = chapters[chId];
            const visited = progress[chId]?.length || 0;
            const total = ch.visualizations.length;
            const pct = total > 0 ? Math.round((visited / total) * 100) : 0;
            const isComplete = visited === total;
            return (
              <div key={chId} className="chapter-progress-item">
                <div className="chapter-progress-label">
                  <span>Week {ch.week}: {ch.title}</span>
                  <span className={`chapter-progress-count ${isComplete ? 'complete' : ''}`}>
                    {isComplete ? '✅' : `${visited}/${total}`}
                  </span>
                </div>
                <div className="overall-progress" style={{ height: '4px' }}>
                  <div className="fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Last Visited */}
      {lastVisited && (
        <Link href={lastVisited.href} className="glass-card last-visited-card">
          <div className="last-visited-label">🕐 Continue where you left off</div>
          <div className="last-visited-title">{lastVisited.title}</div>
          <div className="last-visited-chapter">Week {lastVisited.week} · {lastVisited.chapterTitle}</div>
          <div className="card-arrow">Resume →</div>
        </Link>
      )}
    </div>
  );
}
