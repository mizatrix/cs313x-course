'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import { chapters } from '../../../data/chapters';

export default function FullPage() {
  const params = useParams();
  const { id: chapterId } = params;
  const chapter = chapters[chapterId];

  useEffect(() => {
    if (!chapter) return;
    // Mark all visualizations as visited for single-page chapters
    const storageKey = `${chapterId}_visited`;
    const allIds = chapter.visualizations.map(v => v.id);
    localStorage.setItem(storageKey, JSON.stringify(allIds));
  }, [chapterId, chapter]);

  if (!chapter || !chapter.isSinglePage) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: '#e8e8f0' }}>
        <h1>Page not found</h1>
        <a href="/" style={{ color: '#6c5ce7' }}>← Back to Home</a>
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
          src={chapter.singlePageHref}
          title={chapter.title}
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </>
  );
}
