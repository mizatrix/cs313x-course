'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../components/Navbar';
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
  }, [chapterId, chapter, viz]);

  if (!chapter || !viz) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: '#e8e8f0' }}>
        <h1>Visualization not found</h1>
        <a href={`/chapters/${chapterId}`} style={{ color: '#6c5ce7' }}>← Back to chapter</a>
      </div>
    );
  }

  return (
    <>
      <Navbar
        brandLabel={`Chapter ${chapter.week}`}
        backHref={`/chapters/${chapterId}`}
        backLabel="Back to Hub"
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
