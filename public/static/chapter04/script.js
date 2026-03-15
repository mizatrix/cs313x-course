/* ═══════════════════════════════════════════════════
   CS313x Chapter 4 — Interactive Demos & Quiz
   ═══════════════════════════════════════════════════ */

// Initialize Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#1e293b',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#60a5fa',
    lineColor: '#60a5fa',
    secondaryColor: '#0f766e',
    tertiaryColor: '#7c2d12',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px'
  }
});

// ═══════════════════════════════════════════════════
//  GAP ENCODING DEMO
// ═══════════════════════════════════════════════════
function runGapDemo() {
  const input = document.getElementById('gapInput').value;
  const out = document.getElementById('gapOutput');
  const ids = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

  if (ids.length < 2) { out.innerHTML = '<span style="color:#f87171">Enter at least 2 sorted DocIDs</span>'; return; }

  let html = '<span style="color:#60a5fa;font-weight:600">Step 1: Raw DocIDs (sorted)</span>\n';
  html += `  ${ids.join(', ')}\n\n`;
  html += '<span style="color:#f59e0b;font-weight:600">Step 2: Compute Gaps</span>\n';

  const gaps = [ids[0]];
  html += `  First: ${ids[0]} (stored as-is)\n`;
  for (let i = 1; i < ids.length; i++) {
    const gap = ids[i] - ids[i - 1];
    gaps.push(gap);
    html += `  ${ids[i]} - ${ids[i - 1]} = <span style="color:#f59e0b;font-weight:700">${gap}</span>\n`;
  }

  html += `\n<span style="color:#34d399;font-weight:600">Gap-encoded list:</span> [${gaps.join(', ')}]\n\n`;

  const avgRaw = (ids.reduce((a, b) => a + b, 0) / ids.length).toFixed(1);
  const avgGap = (gaps.reduce((a, b) => a + b, 0) / gaps.length).toFixed(1);
  html += `<span style="color:#94a3b8">Average raw ID: ${avgRaw} → Average gap: ${avgGap}</span>\n`;
  html += `<span style="color:#34d399">✅ Smaller values = fewer bits to store!</span>`;
  out.innerHTML = html;
}

// ═══════════════════════════════════════════════════
//  VARIABLE BYTE ENCODING DEMO
// ═══════════════════════════════════════════════════
function vbEncode(n) {
  const bytes = [];
  bytes.push((n % 128) + 128);
  n = Math.floor(n / 128);
  while (n > 0) {
    bytes.unshift(n % 128);
    n = Math.floor(n / 128);
  }
  return bytes;
}

function runVBDemo() {
  const num = parseInt(document.getElementById('vbInput').value);
  const out = document.getElementById('vbOutput');
  if (isNaN(num) || num < 1) { out.innerHTML = '<span style="color:#f87171">Enter a positive integer</span>'; return; }

  const binary = num.toString(2);
  let html = `<span style="color:#60a5fa;font-weight:600">Encoding: ${num}</span>\n`;
  html += `Binary: ${binary}\n\n`;

  let n = num;
  const bytes = [];
  let step = 1;

  // Last byte (C-bit = 1)
  const payload0 = n % 128;
  const byte0 = payload0 + 128;
  html += `<span style="color:#f59e0b">Step ${step}:</span> ${n} % 128 = ${payload0}\n`;
  html += `  Payload: ${payload0.toString(2).padStart(7, '0')}\n`;
  html += `  Add C-bit=1 → <span style="color:#34d399">${byte0.toString(2).padStart(8, '0')}</span> (0x${byte0.toString(16).toUpperCase().padStart(2, '0')}) ← LAST byte\n`;
  bytes.push(byte0);
  n = Math.floor(n / 128);
  step++;

  while (n > 0) {
    const payload = n % 128;
    const byteVal = payload;
    html += `<span style="color:#f59e0b">Step ${step}:</span> ${n} % 128 = ${payload}\n`;
    html += `  Payload: ${payload.toString(2).padStart(7, '0')}\n`;
    html += `  C-bit=0 → <span style="color:#f59e0b">${byteVal.toString(2).padStart(8, '0')}</span> (0x${byteVal.toString(16).toUpperCase().padStart(2, '0')}) ← MORE bytes\n`;
    bytes.unshift(byteVal);
    n = Math.floor(n / 128);
    step++;
  }

  const hexStr = bytes.map(b => '0x' + b.toString(16).toUpperCase().padStart(2, '0')).join(', ');
  const binStr = bytes.map(b => b.toString(2).padStart(8, '0')).join(' | ');

  html += `\n<span style="color:#34d399;font-weight:600">Result: [${hexStr}]</span>\n`;
  html += `Binary: ${binStr}\n`;
  html += `Bytes used: ${bytes.length} (vs 4 for raw int32) → <span style="color:#34d399">${((1 - bytes.length / 4) * 100).toFixed(0)}% savings</span>`;
  out.innerHTML = html;
}

// ═══════════════════════════════════════════════════
//  GAMMA ENCODING DEMO
// ═══════════════════════════════════════════════════
function runGammaDemo() {
  const num = parseInt(document.getElementById('gammaInput').value);
  const out = document.getElementById('gammaOutput');
  if (isNaN(num) || num < 1) { out.innerHTML = '<span style="color:#f87171">Enter a positive integer ≥ 1</span>'; return; }

  const binary = num.toString(2);
  const offset = binary.slice(1);
  const length = offset.length;
  const unary = '1'.repeat(length) + '0';
  const gamma = unary + offset;

  let html = `<span style="color:#60a5fa;font-weight:600">Encoding: ${num}</span>\n\n`;
  html += `<span style="color:#f59e0b">Step 1:</span> Binary of ${num} = <span style="color:#f59e0b">${binary}</span>\n`;
  html += `<span style="color:#f59e0b">Step 2:</span> Remove leading 1 = <span style="color:#a78bfa">${offset || '(empty)'}</span>  (offset)\n`;
  html += `<span style="color:#f59e0b">Step 3:</span> Offset length = ${length}\n`;
  html += `<span style="color:#f59e0b">Step 4:</span> Unary(${length}) = <span style="color:#f472b6">${unary}</span>\n`;
  html += `<span style="color:#f59e0b">Step 5:</span> Gamma code = <span style="color:#f472b6">${unary}</span><span style="color:#a78bfa">${offset}</span>\n\n`;
  html += `<span style="color:#34d399;font-weight:600">Final: ${gamma}  (${gamma.length} bits)</span>\n`;
  html += `<span style="color:#94a3b8">Raw int32 would need 32 bits → ${((1 - gamma.length / 32) * 100).toFixed(0)}% savings</span>`;
  out.innerHTML = html;
}

// ═══════════════════════════════════════════════════
//  EDIT DISTANCE DEMO
// ═══════════════════════════════════════════════════
function runEditDistance() {
  const s1 = document.getElementById('ed1').value.toLowerCase();
  const s2 = document.getElementById('ed2').value.toLowerCase();
  const out = document.getElementById('edOutput');
  if (!s1 || !s2) { out.innerHTML = '<span style="color:#f87171">Enter two words</span>'; return; }

  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  let html = `<span style="color:#60a5fa;font-weight:600">Edit Distance: "${s1}" → "${s2}"</span>\n\n`;

  // Draw DP matrix
  html += '<span style="color:#f59e0b;font-weight:600">DP Matrix:</span>\n';
  html += '      ';
  html += '  ε  ';
  for (let j = 0; j < n; j++) html += `  ${s2[j]}  `;
  html += '\n';

  for (let i = 0; i <= m; i++) {
    html += `  ${i === 0 ? 'ε' : s1[i - 1]}  `;
    for (let j = 0; j <= n; j++) {
      const val = dp[i][j];
      const isFinal = (i === m && j === n);
      if (isFinal) html += ` <span style="color:#34d399;font-weight:700">[${val}]</span>`;
      else html += ` ${String(val).padStart(2, ' ')}  `;
    }
    html += '\n';
  }

  html += `\n<span style="color:#34d399;font-weight:600">Edit Distance = ${dp[m][n]}</span>\n`;

  // Show operations
  html += '\n<span style="color:#a78bfa;font-weight:600">Character Alignment:</span>\n';
  for (let i = 0; i < Math.max(m, n); i++) {
    const c1 = i < m ? s1[i] : '—';
    const c2 = i < n ? s2[i] : '—';
    let op;
    if (c1 === c2) op = '<span style="color:#34d399">MATCH</span>';
    else if (c1 === '—') op = '<span style="color:#f59e0b">INSERT</span>';
    else if (c2 === '—') op = '<span style="color:#f87171">DELETE</span>';
    else op = '<span style="color:#f87171">REPLACE</span>';
    html += `  ${c1} → ${c2}  ${op}\n`;
  }

  out.innerHTML = html;
}

// ═══════════════════════════════════════════════════
//  QUIZ
// ═══════════════════════════════════════════════════
const quizData = [
  { q: "What is the main bottleneck in Information Retrieval indexing?", type: "mcq",
    opts: ["CPU speed", "Disk I/O (seek time)", "Network bandwidth", "RAM capacity"],
    answer: 1, explain: "IR is I/O bound. Disk seek time (~5ms) is the bottleneck, not CPU." },
  { q: "Which algorithm avoids creating (TermID, DocID) pairs entirely?", type: "mcq",
    opts: ["BSBI", "SPIMI", "MapReduce", "Gamma Encoding"],
    answer: 1, explain: "SPIMI builds postings lists directly in memory — no pairs needed." },
  { q: "True or False: SPIMI requires a global TermID mapping before indexing.", type: "mcq",
    opts: ["True", "False"],
    answer: 1, explain: "False. SPIMI builds the dictionary dynamically. BSBI needs the global mapping." },
  { q: "What is the time complexity of BSBI?", type: "mcq",
    opts: ["O(T)", "O(T log T)", "O(T²)", "O(log T)"],
    answer: 1, explain: "O(T log T) — sorting the blocks is the dominant step." },
  { q: "Which phase of MapReduce is the most expensive?", type: "mcq",
    opts: ["Map Phase", "Shuffle Phase", "Reduce Phase", "Input Split"],
    answer: 1, explain: "Shuffle is most expensive due to massive network bandwidth usage." },
  { q: "In MapReduce distributed indexing, what determines which reducer handles a term?", type: "mcq",
    opts: ["Term length", "hash(term) % R", "Document frequency", "Alphabetical order"],
    answer: 1, explain: "hash(term) % R (number of reducers) determines the destination reducer." },
  { q: "Which partitioning strategy is the industry standard (Google, Elasticsearch)?", type: "mcq",
    opts: ["Term Partitioning", "Document Partitioning", "Random Partitioning", "Frequency Partitioning"],
    answer: 1, explain: "Document Partitioning — scalable and even load distribution." },
  { q: "True or False: Lucene segments are mutable (can be modified after writing).", type: "mcq",
    opts: ["True", "False"],
    answer: 1, explain: "False. Lucene segments are immutable — never modified. Deletes use a .liv bitset." },
  { q: "Encode 5 using Variable Byte. What is the result in hex?", type: "mcq",
    opts: ["0x05", "0x85", "0x45", "0x05, 0x80"],
    answer: 1, explain: "5 in 7 bits = 0000101, add C-bit=1 → 10000101 = 0x85." },
  { q: "What is the Gamma code for the number 1?", type: "mcq",
    opts: ["1", "0", "10", "01"],
    answer: 1, explain: "Binary=1, offset=(empty), length=0, unary(0)='0'. Gamma code = '0'." },
  { q: "Why is index compression a performance optimization, not just space saving?", type: "mcq",
    opts: ["Faster CPU processing", "Compressed index fits in RAM, avoiding disk seeks", "Reduces network traffic", "Simplifies the code"],
    answer: 1, explain: "The Big Win: a compressed index fits in RAM → OS cache hits → no slow disk seeks." },
  { q: "What is Front Coding?", type: "mcq",
    opts: ["Encoding the first byte of each term", "Sharing common prefixes among sorted terms", "Encoding terms as binary", "Compressing the first document"],
    answer: 1, explain: "Front Coding shares common prefixes among consecutive sorted dictionary terms." },
  { q: "For a postings list of length L, where should skip pointers be placed?", type: "mcq",
    opts: ["Every L items", "Every L/2 items", "Every √L items", "At the beginning only"],
    answer: 2, explain: "Every √L items — balances skip cost vs. checking cost." },
  { q: "What is the main trade-off between Bi-word and Positional indexes?", type: "mcq",
    opts: ["Speed vs accuracy", "Bi-word: fast but false positives; Positional: exact but 2-4x larger", "Memory vs disk", "Simplicity vs complexity"],
    answer: 1, explain: "Bi-word is fast but has false positives. Positional is exact but indexes are 2-4x larger." },
  { q: "In Elasticsearch, what is the role of a Coordinating Node?", type: "mcq",
    opts: ["Stores data shards", "Manages cluster state", "Routes requests to data nodes and aggregates results", "Handles authentication"],
    answer: 2, explain: "The Coordinating Node is the 'Router' — receives requests, routes to data nodes, aggregates results (Scatter/Gather)." }
];

// Build quiz HTML
function buildQuiz() {
  const container = document.getElementById('quizContainer');
  let html = '';
  quizData.forEach((q, i) => {
    html += `<div class="quiz-q" id="qq${i}"><h4><span class="q-num">Q${i + 1}.</span> ${q.q}</h4>`;
    q.opts.forEach((opt, j) => {
      html += `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label>`;
    });
    html += '<div class="feedback" id="fb' + i + '"></div></div>';
  });
  container.innerHTML = html;
}

function checkQuiz() {
  let score = 0;
  quizData.forEach((q, i) => {
    const el = document.getElementById('qq' + i);
    const fb = document.getElementById('fb' + i);
    const sel = document.querySelector(`input[name="q${i}"]:checked`);

    el.classList.remove('correct', 'wrong');

    if (!sel) {
      el.classList.add('wrong');
      fb.className = 'feedback wrong-fb';
      fb.textContent = '⚠️ No answer selected. ' + q.explain;
      return;
    }

    if (parseInt(sel.value) === q.answer) {
      score++;
      el.classList.add('correct');
      fb.className = 'feedback correct-fb';
      fb.textContent = '✅ Correct! ' + q.explain;
    } else {
      el.classList.add('wrong');
      fb.className = 'feedback wrong-fb';
      fb.textContent = '❌ Incorrect. ' + q.explain;
    }
  });

  const result = document.getElementById('quizResult');
  const pct = ((score / quizData.length) * 100).toFixed(0);
  const color = pct >= 80 ? '#34d399' : pct >= 50 ? '#f59e0b' : '#f87171';
  result.style.background = `rgba(${color === '#34d399' ? '52,211,153' : color === '#f59e0b' ? '245,158,11' : '248,113,113'},0.1)`;
  result.style.color = color;
  result.textContent = `Score: ${score}/${quizData.length} (${pct}%)`;
}

function resetQuiz() {
  quizData.forEach((_, i) => {
    document.getElementById('qq' + i).classList.remove('correct', 'wrong');
    document.getElementById('fb' + i).textContent = '';
    document.getElementById('fb' + i).className = 'feedback';
    document.querySelectorAll(`input[name="q${i}"]`).forEach(r => r.checked = false);
  });
  document.getElementById('quizResult').textContent = '';
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  buildQuiz();
  // Run demos with default values
  runGapDemo();
  runVBDemo();
  runGammaDemo();
  runEditDistance();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  else nav.style.boxShadow = 'none';
});

// ═══════════════════════════════════════════════════
//  PROFESSOR NOTES TOGGLE
// ═══════════════════════════════════════════════════
function toggleNotes(btn) {
  const notes = btn.nextElementSibling;
  btn.classList.toggle('open');
  notes.classList.toggle('open');
}

let allNotesOpen = false;
function toggleAllNotes() {
  allNotesOpen = !allNotesOpen;
  document.querySelectorAll('.prof-notes').forEach(n => {
    if (allNotesOpen) n.classList.add('open');
    else n.classList.remove('open');
  });
  document.querySelectorAll('.prof-toggle').forEach(t => {
    if (allNotesOpen) t.classList.add('open');
    else t.classList.remove('open');
  });
  const btn = document.getElementById('masterToggle');
  btn.textContent = allNotesOpen ? '🎓 Hide All Prof Notes' : '🎓 Show All Prof Notes';
}
