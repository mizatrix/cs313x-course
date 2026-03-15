'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { chapters, chapterOrder } from '../data/chapters';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Build flat list of all visualizations
  const allViz = chapterOrder.flatMap(chId => {
    const ch = chapters[chId];
    return ch.visualizations.map(v => ({
      ...v,
      chapterId: chId,
      chapterTitle: ch.title,
      chapterWeek: ch.week,
      isSinglePage: ch.isSinglePage,
    }));
  });

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const matched = allViz.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.desc.toLowerCase().includes(q) ||
      v.aim.toLowerCase().includes(q) ||
      v.use.toLowerCase().includes(q) ||
      v.chapterTitle.toLowerCase().includes(q)
    ).slice(0, 8);
    setResults(matched);
  }, [query]);

  // Keyboard shortcut: Ctrl+K or /
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName))) {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const getVizHref = (v) => v.isSinglePage
    ? `/chapters/${v.chapterId}/fullpage`
    : `/chapters/${v.chapterId}/viz/${v.id}`;

  return (
    <>
      <button className="search-trigger" onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}>
        <span className="search-icon">🔍</span>
        <span className="search-placeholder">Search…</span>
        <kbd className="search-kbd">⌘K</kbd>
      </button>

      {isOpen && (
        <div className="search-overlay">
          <div className="search-modal" ref={containerRef}>
            <div className="search-input-wrap">
              <span className="search-input-icon">🔍</span>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Search visualizations, topics, concepts…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
              />
              <kbd className="search-esc" onClick={() => { setIsOpen(false); setQuery(''); }}>ESC</kbd>
            </div>
            {results.length > 0 && (
              <div className="search-results">
                {results.map(v => (
                  <Link
                    key={`${v.chapterId}-${v.id}`}
                    href={getVizHref(v)}
                    className="search-result-item"
                    onClick={() => { setIsOpen(false); setQuery(''); }}
                  >
                    <div className="search-result-chapter">Week {v.chapterWeek}</div>
                    <div className="search-result-title">{v.title}</div>
                    <div className="search-result-desc">{v.desc}</div>
                  </Link>
                ))}
              </div>
            )}
            {query.trim() && results.length === 0 && (
              <div className="search-no-results">No visualizations found for &quot;{query}&quot;</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
