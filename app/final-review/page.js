'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import ParticleCanvas from '../components/ParticleCanvas';
import { finalReviewQuestions, finalReviewTopics } from '../data/finalReviewQuestions';

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const topicLabels = {
  foundations: 'Foundations (Wks 1–6)',
  link: 'Link Analysis & PageRank',
  crawling: 'Web Crawling',
  neural: 'Neural IR & RAG',
  recommenders: 'Recommender Systems',
  conversational: 'Conversational & Future',
};

export default function FinalReviewPage() {
  const [activeTopic, setActiveTopic] = useState('all');
  const [revealed, setRevealed] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selfAssess, setSelfAssess] = useState({});
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const [questions, setQuestions] = useState([]);
  const [mcqOpen, setMcqOpen] = useState(true);
  const [saOpen, setSaOpen] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(finalReviewQuestions));
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const filtered = useMemo(() => {
    if (activeTopic === 'all') return questions;
    return questions.filter((q) => q.topic === activeTopic);
  }, [activeTopic, questions]);

  const mcqs = filtered.filter((q) => q.type === 'mcq');
  const shortAnswers = filtered.filter((q) => q.type === 'short-answer');

  function handleMCQSelect(questionId, optionIdx) {
    if (selectedAnswers[questionId] !== undefined) return;
    const q = finalReviewQuestions.find((x) => x.id === questionId);
    const isCorrect = optionIdx === q.answer;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setRevealed((prev) => ({ ...prev, [questionId]: true }));
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      attempted: prev.attempted + 1,
    }));
  }

  function handleRevealToggle(questionId) {
    setRevealed((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    if (!revealed[questionId] && !selectedAnswers[questionId]) {
      setScore((prev) => ({ ...prev, attempted: prev.attempted + 1 }));
    }
  }

  function handleSelfAssess(questionId, gotIt) {
    if (selfAssess[questionId] !== undefined) return;
    setSelfAssess((prev) => ({ ...prev, [questionId]: gotIt }));
    setScore((prev) => ({
      correct: prev.correct + (gotIt ? 1 : 0),
      attempted: prev.attempted,
    }));
  }

  function handleReset() {
    setRevealed({});
    setSelectedAnswers({});
    setSelfAssess({});
    setScore({ correct: 0, attempted: 0 });
    setQuestions(shuffleArray(finalReviewQuestions));
  }

  const progressPct = filtered.length > 0 ? Math.round((score.attempted / filtered.length) * 100) : 0;

  return (
    <>
      <ParticleCanvas />
      <Navbar brandLabel="Course Hub" rightContent={<SearchBar />} />

      <div className="page-container">
        <header className="page-header">
          <div className="badge">CS313x — Information Retrieval</div>
          <h1>🏆 Final Exam Training Zone</h1>
          <p>
            Cumulative practice for the final — the whole semester (Weeks 1–12), with extra focus on
            link analysis, crawling, neural IR &amp; RAG, recommenders, and conversational AI. Multiple-choice
            and problem-solving questions with instant feedback and worked solutions, randomized on every visit.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-num">{filtered.length}</div>
              <div className="stat-label">Questions</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">{finalReviewTopics.length - 1}</div>
              <div className="stat-label">Topics</div>
            </div>
            <div className="hero-stat">
              <div className="stat-num">{score.correct}/{score.attempted}</div>
              <div className="stat-label">Score</div>
            </div>
          </div>
        </header>

        {/* Score bar */}
        <div className="review-score-bar glass-card no-hover">
          <div className="review-score-left">
            <span className="review-score-label">Progress</span>
            <span className="review-score-pct">{progressPct}%</span>
          </div>
          <div className="review-progress-track">
            <div className="review-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <button className="btn btn-sm" onClick={handleReset}>🔄 Reset &amp; Shuffle</button>
        </div>

        {/* Topic Filters */}
        <div className="learning-path" style={{ marginTop: '1.5rem' }}>
          <span className="path-label">Topic</span>
          {finalReviewTopics.map((t) => (
            <button
              key={t.id}
              className={`path-tag ${activeTopic === t.id ? 'active' : ''}`}
              onClick={() => setActiveTopic(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ═══ MCQ Section ═══ */}
        {mcqs.length > 0 && (
          <section className="review-section">
            <button className="review-section-toggle" onClick={() => setMcqOpen(p => !p)}>
              <h2 className="review-section-title">
                <span className="review-section-icon">📝</span>
                Multiple Choice Questions
                <span className="review-section-count">{mcqs.length}</span>
              </h2>
              <span className={`review-chevron ${mcqOpen ? 'open' : ''}`}>▼</span>
            </button>
            {mcqOpen && <div className="review-questions-grid">
              {mcqs.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCorrect = isAnswered && selectedAnswers[q.id] === q.answer;
                return (
                  <div
                    key={q.id}
                    className={`review-q-card glass-card no-hover ${isAnswered ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                  >
                    <div className="review-q-header">
                      <span className="review-q-num">Q{idx + 1}</span>
                      <span className={`difficulty-badge diff-${q.difficulty}`}>{q.difficulty}</span>
                      <span className="review-q-topic-tag">{topicLabels[q.topic]}</span>
                    </div>
                    <p className="review-q-text">{q.question}</p>
                    <div className="review-q-divider" />
                    <div className="review-mcq-options">
                      {q.options.map((opt, oi) => {
                        let cls = 'review-mcq-option';
                        if (isAnswered) {
                          if (oi === q.answer) cls += ' option-correct';
                          else if (oi === selectedAnswers[q.id]) cls += ' option-wrong';
                        }
                        return (
                          <button key={oi} className={cls} onClick={() => handleMCQSelect(q.id, oi)} disabled={isAnswered}>
                            <span className="option-letter">{String.fromCharCode(65 + oi)}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {isAnswered && (
                      <div className={`review-explanation ${isCorrect ? 'correct' : 'incorrect'}`}>
                        <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect.'}</strong>
                        <div className="review-why-section">
                          <div className="review-why-label">💡 Why?</div>
                          <p className="review-why-text">{q.explanation}</p>
                          {q.hint && (
                            <div className="review-study-hint">
                              {q.hint}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>}
          </section>
        )}

        {/* ═══ Short Answer Section ═══ */}
        {shortAnswers.length > 0 && (
          <section className="review-section">
            <button className="review-section-toggle" onClick={() => setSaOpen(p => !p)}>
              <h2 className="review-section-title">
                <span className="review-section-icon">✍️</span>
                Problem Solving & Short Answer
                <span className="review-section-count">{shortAnswers.length}</span>
              </h2>
              <span className={`review-chevron ${saOpen ? 'open' : ''}`}>▼</span>
            </button>
            {saOpen && <div className="review-questions-grid">
              {shortAnswers.map((q, idx) => (
                <div
                  key={q.id}
                  className={`review-q-card glass-card no-hover ${selfAssess[q.id] !== undefined ? (selfAssess[q.id] ? 'correct' : 'incorrect') : ''}`}
                >
                  <div className="review-q-header">
                    <span className="review-q-num">P{idx + 1}</span>
                    <span className={`difficulty-badge diff-${q.difficulty}`}>{q.difficulty}</span>
                    <span className="review-q-topic-tag">{topicLabels[q.topic]}</span>
                  </div>
                  <p className="review-q-text" style={{ whiteSpace: 'pre-line' }}>{q.question}</p>
                  {q.tableData && (
                    <div className="review-q-table-wrapper">
                      <table className="review-q-table">
                        <thead>
                          <tr>{q.tableData.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {q.tableData.rows.map((row, ri) => (
                            <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="review-q-divider" />

                  {/* Workspace */}
                  <div className="review-sa-workspace">
                    <div className="review-sa-prompt">💡 Work out your answer below, then check the solution</div>
                    <textarea
                      className="review-sa-textarea"
                      placeholder="Type your solution here... (this is your scratch space)"
                      rows={3}
                    />
                    <div className="review-sa-actions">
                      <button className="btn btn-sm btn-primary" onClick={() => handleRevealToggle(q.id)}>
                        {revealed[q.id] ? '🙈 Hide Solution' : '👀 Check Solution'}
                      </button>
                    </div>
                  </div>

                  {/* Answer reveal */}
                  {revealed[q.id] && (
                    <div className="review-sa-answer">
                      <div className="review-sa-answer-label">✅ Model Answer</div>
                      <div className="review-sa-answer-value">{q.answer}</div>
                      <div className="review-why-section">
                        <div className="review-why-label">💡 Why?</div>
                        <p className="review-why-text">{q.explanation}</p>
                        {q.hint && (
                          <div className="review-study-hint">
                            {q.hint}
                          </div>
                        )}
                      </div>
                      {selfAssess[q.id] === undefined && (
                        <div className="review-sa-self-assess">
                          <span>How did you do?</span>
                          <button className="btn btn-sm btn-correct" onClick={() => handleSelfAssess(q.id, true)}>
                            ✅ Got It
                          </button>
                          <button className="btn btn-sm btn-incorrect" onClick={() => handleSelfAssess(q.id, false)}>
                            ❌ Missed It
                          </button>
                        </div>
                      )}
                      {selfAssess[q.id] !== undefined && (
                        <div className="review-sa-self-assess">
                          <span style={{ color: selfAssess[q.id] ? 'var(--success)' : 'var(--error)', fontWeight: 700 }}>
                            {selfAssess[q.id] ? '✅ Marked as correct — great job!' : '❌ Marked for review — keep practicing!'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>}
          </section>
        )}

        <div style={{ textAlign: 'center', marginTop: '3rem', paddingBottom: '2rem' }}>
          <Link href="/" className="btn btn-primary">← Back to Course Hub</Link>
        </div>
      </div>

      {/* Scroll to Top FAB */}
      <button
        className={`scroll-to-top-fab ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>
    </>
  );
}
