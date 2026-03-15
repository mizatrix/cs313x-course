/* ============================================================
   Student Experience — Tutorial, Quiz & Interaction Engine
   ============================================================ */

// ── Tutorial System ──────────────────────────────────
function showTutorial(config) {
  const key = 'tutorial_' + config.id;
  if (localStorage.getItem(key) === 'done') return;

  const overlay = document.createElement('div');
  overlay.className = 'tutorial-overlay';
  overlay.innerHTML = `
    <div class="tutorial-card">
      <div class="tutorial-icon">${config.icon || '📘'}</div>
      <h2>${config.title}</h2>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${config.subtitle || ''}</p>
      <div class="tutorial-steps">
        ${config.steps.map((s, i) => `
          <div class="tutorial-step">
            <div class="step-num">${i + 1}</div>
            <div class="step-text">${s}</div>
          </div>
        `).join('')}
      </div>
      <div class="tutorial-actions">
        <button class="btn-skip" onclick="this.closest('.tutorial-overlay').remove()">Skip</button>
        <button class="btn-start" onclick="localStorage.setItem('${key}','done');this.closest('.tutorial-overlay').remove()">Got it, let's go! 🚀</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// ── Quiz Engine ──────────────────────────────────────
class QuizEngine {
  constructor(containerId, questions) {
    this.container = document.getElementById(containerId);
    this.questions = questions;
    this.current = 0;
    this.score = 0;
    this.answered = new Array(questions.length).fill(null); // null, 'correct', 'wrong'
    this.render();
  }

  render() {
    const q = this.questions[this.current];
    const answered = this.answered[this.current] !== null;
    const letters = ['A', 'B', 'C', 'D'];

    this.container.innerHTML = `
      <div class="quiz-panel">
        <div class="quiz-header">
          <div class="quiz-icon">🧠</div>
          <h4>Test Your Understanding</h4>
        </div>
        <div class="quiz-question">${q.question}</div>
        <div class="quiz-options">
          ${q.options.map((opt, i) => {
            let cls = '';
            if (answered) {
              cls = 'disabled';
              if (i === q.correct) cls += ' correct';
              else if (this.answered[this.current] === i && i !== q.correct) cls += ' wrong';
            }
            return `<button class="quiz-option ${cls}" onclick="quiz.answer(${i})">
              <span class="opt-letter">${letters[i]}</span>
              ${opt}
            </button>`;
          }).join('')}
        </div>
        ${answered ? `
          <div class="quiz-feedback ${this.answered[this.current] === q.correct ? 'correct-feedback' : 'wrong-feedback'}">
            ${this.answered[this.current] === q.correct ? '✅ ' : '❌ '}${q.explanation}
          </div>
        ` : ''}
        <div class="quiz-progress">
          <div class="progress-dots">
            ${this.questions.map((_, i) => {
              let dotCls = '';
              if (i === this.current) dotCls = 'current';
              else if (this.answered[i] === this.questions[i].correct) dotCls = 'done';
              else if (this.answered[i] !== null) dotCls = 'wrong-dot';
              return `<div class="progress-dot ${dotCls}"></div>`;
            }).join('')}
          </div>
          <span>${this.score}/${this.questions.length} correct</span>
        </div>
        <div class="quiz-nav">
          ${this.current > 0 ? `<button class="btn btn-sm" onclick="quiz.prev()">← Previous</button>` : ''}
          ${answered && this.current < this.questions.length - 1
            ? `<button class="btn btn-primary btn-sm" onclick="quiz.next()">Next Question →</button>`
            : ''}
          ${answered && this.current === this.questions.length - 1
            ? `<button class="btn btn-teal btn-sm" onclick="quiz.showResults()">See Results 🎉</button>`
            : ''}
        </div>
      </div>
    `;
  }

  answer(idx) {
    if (this.answered[this.current] !== null) return;
    this.answered[this.current] = idx;
    if (idx === this.questions[this.current].correct) {
      this.score++;
      celebrate();
    }
    this.render();
  }

  next() {
    if (this.current < this.questions.length - 1) { this.current++; this.render(); }
  }

  prev() {
    if (this.current > 0) { this.current--; this.render(); }
  }

  showResults() {
    const pct = Math.round(this.score / this.questions.length * 100);
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 50 ? '👍' : '📚';
    this.container.innerHTML = `
      <div class="quiz-panel" style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">${emoji}</div>
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem;">
          ${pct === 100 ? 'Perfect Score!' : pct >= 70 ? 'Great Job!' : pct >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
        </h3>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          You scored <strong style="color: var(--accent-violet);">${this.score}/${this.questions.length}</strong> (${pct}%)
        </p>
        <button class="btn btn-primary" onclick="quiz.reset()">Try Again</button>
      </div>
    `;
    if (pct === 100) celebrateBig();
  }

  reset() {
    this.current = 0; this.score = 0;
    this.answered = new Array(this.questions.length).fill(null);
    this.render();
  }
}

// ── Celebration Effects ──────────────────────────────
function celebrate() {
  const container = document.createElement('div');
  container.className = 'celebration';
  document.body.appendChild(container);
  const colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#00b894'];
  for (let i = 0; i < 20; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (1 + Math.random()) + 's';
    container.appendChild(piece);
  }
  setTimeout(() => container.remove(), 2000);
}

function celebrateBig() {
  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => celebrate(), wave * 400);
  }
}

// ── Drag & Drop for Ranked Lists ─────────────────────
function initDragAndDrop(listId, onReorder) {
  const list = document.getElementById(listId);
  if (!list) return;
  let dragIdx = null;

  list.addEventListener('dragstart', (e) => {
    const item = e.target.closest('.rank-item');
    if (!item) return;
    dragIdx = [...list.children].indexOf(item);
    item.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  list.addEventListener('dragover', (e) => {
    e.preventDefault();
    const item = e.target.closest('.rank-item');
    if (item) {
      list.querySelectorAll('.rank-item').forEach(el => el.classList.remove('drag-over'));
      item.classList.add('drag-over');
    }
  });

  list.addEventListener('dragleave', (e) => {
    const item = e.target.closest('.rank-item');
    if (item) item.classList.remove('drag-over');
  });

  list.addEventListener('drop', (e) => {
    e.preventDefault();
    list.querySelectorAll('.rank-item').forEach(el => {
      el.classList.remove('drag-over');
      el.classList.remove('dragging');
    });
    const item = e.target.closest('.rank-item');
    if (!item || dragIdx === null) return;
    const dropIdx = [...list.children].indexOf(item);
    if (dragIdx !== dropIdx && onReorder) {
      onReorder(dragIdx, dropIdx);
    }
    dragIdx = null;
  });

  list.addEventListener('dragend', () => {
    list.querySelectorAll('.rank-item').forEach(el => {
      el.classList.remove('dragging');
      el.classList.remove('drag-over');
    });
    dragIdx = null;
  });
}

// ── Hint System ──────────────────────────────────────
function toggleHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('visible');
}

// ── Progress Tracking ────────────────────────────────
function markVisited(vizId) {
  const visited = JSON.parse(localStorage.getItem('ch6_visited') || '[]');
  if (!visited.includes(vizId)) {
    visited.push(vizId);
    localStorage.setItem('ch6_visited', JSON.stringify(visited));
  }
}

function getVisited() {
  return JSON.parse(localStorage.getItem('ch6_visited') || '[]');
}

// Auto-mark current page as visited
(function() {
  const path = window.location.pathname;
  const match = path.match(/(\d+)-/);
  if (match) markVisited(parseInt(match[1]));
})();
