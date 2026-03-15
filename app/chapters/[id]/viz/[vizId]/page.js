'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
import SearchBar from '../../../../components/SearchBar';
import { chapters } from '../../../../data/chapters';

export default function VizPage() {
  const params = useParams();
  const { id: chapterId, vizId } = params;
  const chapter = chapters[chapterId];
  const viz = chapter?.visualizations?.find(v => v.id === Number(vizId));

  useEffect(() => {
    if (!chapter || !viz) return;
    // Mark this visualization as visited
    const storageKey = `${chapterId}_visited`;
    const visited = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!visited.includes(viz.id)) {
      visited.push(viz.id);
      localStorage.setItem(storageKey, JSON.stringify(visited));
    }

    // Save as last visited
    localStorage.setItem('cs313x_last_visited', JSON.stringify({
      href: `/chapters/${chapterId}/viz/${viz.id}`,
      title: viz.title,
      week: chapter.week,
      chapterTitle: chapter.title,
    }));
  }, [chapterId, chapter, viz]);

  // Keyboard navigation: left/right arrows for prev/next viz
  useEffect(() => {
    if (!chapter || !viz) return;
    const handler = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      const vizList = chapter.visualizations;
      const currentIdx = vizList.findIndex(v => v.id === viz.id);
      if (e.key === 'ArrowRight' && currentIdx < vizList.length - 1) {
        window.location.href = `/chapters/${chapterId}/viz/${vizList[currentIdx + 1].id}`;
      }
      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        window.location.href = `/chapters/${chapterId}/viz/${vizList[currentIdx - 1].id}`;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [chapterId, chapter, viz]);

  if (!chapter || !viz) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: '#e8e8f0' }}>
        <h1>Visualization not found</h1>
        <a href={`/chapters/${chapterId}`} style={{ color: '#6c5ce7' }}>← Back to chapter</a>
      </div>
    );
  }

  const vizList = chapter.visualizations;
  const currentIdx = vizList.findIndex(v => v.id === viz.id);
  const prevViz = currentIdx > 0 ? vizList[currentIdx - 1] : null;
  const nextViz = currentIdx < vizList.length - 1 ? vizList[currentIdx + 1] : null;

  return (
    <>
      <Navbar
        brandLabel={`Chapter ${chapter.week}`}
        backHref={`/chapters/${chapterId}`}
        backLabel="Back to Hub"
        rightContent={
          <div className="viz-nav-controls">
            <SearchBar />
            {prevViz && (
              <a href={`/chapters/${chapterId}/viz/${prevViz.id}`} className="nav-back" title={prevViz.title}>
                ← Prev
              </a>
            )}
            <span className="viz-counter">{currentIdx + 1}/{vizList.length}</span>
            {nextViz && (
              <a href={`/chapters/${chapterId}/viz/${nextViz.id}`} className="nav-back" title={nextViz.title}>
                Next →
              </a>
            )}
          </div>
        }
      />
      <div className="viz-iframe-container">
        <iframe
          src={viz.href}
          title={viz.title}
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </>
  );
}
