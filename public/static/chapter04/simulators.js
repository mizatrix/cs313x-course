/* ═══════════════════════════════════════════════════
   CS313x Chapter 4 — Step-by-Step Algorithm Simulators
   Visual animated walkthroughs of BSBI, SPIMI, MapReduce
   ═══════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════
//  BSBI SIMULATOR
// ═══════════════════════════════════════════════════
const bsbiSim = {
  docs: [
    { id: 1, text: "the cat sat on the mat" },
    { id: 2, text: "the dog chased the cat" },
    { id: 3, text: "mat is on the floor" }
  ],
  blockSize: 6,
  step: 0,
  pairs: [],
  blocks: [],
  segments: [],
  merged: {},

  reset() {
    this.step = 0;
    this.pairs = [];
    this.blocks = [];
    this.segments = [];
    this.merged = {};
    this.render();
  },

  advance() {
    this.step++;
    this.render();
  },

  render() {
    const el = document.getElementById('bsbiSim');
    if (!el) return;
    const s = this.step;
    let html = '';

    // Phase indicator
    const phases = ['Read Documents', 'Extract Pairs', 'Fill Block 1', 'Sort Block 1', 'Write to Disk', 'Fill Block 2', 'Sort Block 2', 'Write to Disk', 'Merge Segments', 'Final Index'];
    const pi = Math.min(s, phases.length - 1);
    html += `<div class="sim-phase-bar">`;
    phases.forEach((p, i) => {
      const cl = i < s ? 'done' : i === s ? 'active' : '';
      html += `<span class="sim-phase-dot ${cl}">${i + 1}</span>`;
    });
    html += `</div>`;
    html += `<div class="sim-phase-label">${phases[pi]}</div>`;

    // Documents
    html += `<div class="sim-row"><div class="sim-col">`;
    html += `<h4>📄 Documents</h4>`;
    this.docs.forEach(d => {
      const active = (s === 0) ? 'highlight' : '';
      html += `<div class="sim-item ${active}">Doc ${d.id}: "${d.text}"</div>`;
    });
    html += `</div>`;

    // Step 1-2: Extract all pairs
    if (s >= 1) {
      const allPairs = [];
      this.docs.forEach(d => {
        d.text.split(' ').forEach(t => allPairs.push([t, d.id]));
      });

      html += `<div class="sim-col">`;
      html += `<h4>📝 All (term, docID) Pairs</h4>`;
      const showCount = s === 1 ? Math.min(8, allPairs.length) : allPairs.length;
      allPairs.slice(0, showCount).forEach(p => {
        html += `<div class="sim-item ${s === 1 ? 'highlight' : ''}">(${p[0]}, ${p[1]})</div>`;
      });
      if (s === 1 && showCount < allPairs.length) html += `<div class="sim-item">... +${allPairs.length - showCount} more</div>`;
      html += `</div>`;

      // Block 1
      if (s >= 2) {
        const block1 = allPairs.slice(0, this.blockSize);
        html += `<div class="sim-col">`;
        html += `<h4>📦 Block 1 (${this.blockSize} pairs)</h4>`;
        const b1display = s >= 3 ? [...block1].sort((a, b) => a[0].localeCompare(b[0]) || a[1] - b[1]) : block1;
        b1display.forEach(p => {
          html += `<div class="sim-item ${s === 2 ? 'highlight-blue' : s === 3 ? 'highlight-green' : ''}">(${p[0]}, ${p[1]})</div>`;
        });
        if (s === 3) html += `<div class="sim-note">⬆️ Sorted by term!</div>`;
        html += `</div>`;
      }

      // Write segment 1
      if (s >= 4) {
        const block1Sorted = allPairs.slice(0, this.blockSize).sort((a, b) => a[0].localeCompare(b[0]) || a[1] - b[1]);
        const seg1 = {};
        block1Sorted.forEach(([t, d]) => { if (!seg1[t]) seg1[t] = []; seg1[t].push(d); });

        html += `<div class="sim-col">`;
        html += `<h4>💾 Segment 1 ${s === 4 ? '<span class="flash">WRITING...</span>' : '(on disk)'}</h4>`;
        Object.entries(seg1).forEach(([t, ds]) => {
          html += `<div class="sim-item ${s === 4 ? 'highlight-amber' : 'dim'}">${t}: [${ds.join(', ')}]</div>`;
        });
        html += `</div>`;
      }

      // Block 2
      if (s >= 5) {
        const block2 = allPairs.slice(this.blockSize);
        html += `<div class="sim-col">`;
        html += `<h4>📦 Block 2 (${block2.length} pairs)</h4>`;
        const b2display = s >= 6 ? [...block2].sort((a, b) => a[0].localeCompare(b[0]) || a[1] - b[1]) : block2;
        b2display.forEach(p => {
          html += `<div class="sim-item ${s === 5 ? 'highlight-blue' : s === 6 ? 'highlight-green' : ''}">(${p[0]}, ${p[1]})</div>`;
        });
        if (s === 6) html += `<div class="sim-note">⬆️ Sorted by term!</div>`;
        html += `</div>`;
      }

      // Write segment 2
      if (s >= 7) {
        const block2Sorted = allPairs.slice(this.blockSize).sort((a, b) => a[0].localeCompare(b[0]) || a[1] - b[1]);
        const seg2 = {};
        block2Sorted.forEach(([t, d]) => { if (!seg2[t]) seg2[t] = []; seg2[t].push(d); });

        html += `<div class="sim-col">`;
        html += `<h4>💾 Segment 2 ${s === 7 ? '<span class="flash">WRITING...</span>' : '(on disk)'}</h4>`;
        Object.entries(seg2).forEach(([t, ds]) => {
          html += `<div class="sim-item ${s === 7 ? 'highlight-amber' : 'dim'}">${t}: [${ds.join(', ')}]</div>`;
        });
        html += `</div>`;
      }

      // Merge
      if (s >= 8) {
        const allP = allPairs.sort((a, b) => a[0].localeCompare(b[0]) || a[1] - b[1]);
        const merged = {};
        allP.forEach(([t, d]) => { if (!merged[t]) merged[t] = []; if (!merged[t].includes(d)) merged[t].push(d); });

        html += `<div class="sim-col">`;
        html += `<h4>${s === 8 ? '🔀 Merging...' : '✅ Final Inverted Index'}</h4>`;
        Object.entries(merged).forEach(([t, ds]) => {
          html += `<div class="sim-item ${s === 9 ? 'highlight-green' : s === 8 ? 'highlight-amber' : ''}">${t}: [${ds.join(', ')}]</div>`;
        });
        html += `</div>`;
      }
    }

    html += `</div>`;

    // Controls
    html += `<div class="sim-controls">`;
    html += `<button class="btn btn-secondary" onclick="bsbiSim.reset()">⟲ Reset</button>`;
    html += `<button class="btn" onclick="bsbiSim.advance()" ${s >= 9 ? 'disabled style="opacity:0.4"' : ''}>Next Step →</button>`;
    html += `<span class="sim-step-count">Step ${s}/9</span>`;
    html += `</div>`;

    el.innerHTML = html;
  }
};

// ═══════════════════════════════════════════════════
//  SPIMI SIMULATOR
// ═══════════════════════════════════════════════════
const spimiSim = {
  tokens: [
    ['the', 1], ['cat', 1], ['sat', 1], ['on', 1],
    ['the', 2], ['dog', 2], ['chased', 2], ['the', 2],
    ['cat', 2], ['mat', 3], ['is', 3], ['on', 3]
  ],
  step: 0,
  dict: {},
  ramLimit: 7,
  processed: 0,
  flushed: [],

  reset() {
    this.step = 0; this.dict = {}; this.processed = 0; this.flushed = [];
    this.render();
  },

  advance() {
    this.step++;
    this.render();
  },

  render() {
    const el = document.getElementById('spimiSim');
    if (!el) return;
    const s = this.step;

    // Rebuild state up to current step
    let dict = {};
    let processed = 0;
    let flushedBlocks = [];
    let currentAction = '';
    let highlightTerm = null;

    for (let i = 0; i < Math.min(s, this.tokens.length + 3); i++) {
      if (i < this.tokens.length) {
        const [term, docId] = this.tokens[i];
        const dictSize = Object.keys(dict).length;

        if (dictSize >= this.ramLimit && !dict[term]) {
          // Flush
          flushedBlocks.push({ ...dict });
          dict = {};
          currentAction = `🔴 RAM FULL! Flushed block ${flushedBlocks.length} to disk. Cleared RAM.`;
        }

        if (!dict[term]) {
          dict[term] = [];
          if (i === s - 1) currentAction = `➕ New term "${term}" → created entry in hash map`;
        } else {
          if (i === s - 1) currentAction = `📎 "${term}" exists → appended docID ${docId}`;
        }
        if (!dict[term].includes(docId)) dict[term].push(docId);
        processed = i + 1;
        if (i === s - 1) highlightTerm = term;
      } else if (i === this.tokens.length) {
        // Final flush
        if (Object.keys(dict).length > 0) {
          flushedBlocks.push({ ...dict });
          currentAction = '💾 Final flush — writing remaining RAM to disk';
        }
      } else if (i === this.tokens.length + 1) {
        currentAction = '🔀 Merge all flushed blocks into final index';
      } else {
        currentAction = '✅ Done! Final inverted index ready.';
      }
    }

    let html = '';

    // Action banner
    html += `<div class="sim-action">${currentAction || 'Press Next Step to begin processing tokens...'}</div>`;

    html += `<div class="sim-row">`;

    // Token stream
    html += `<div class="sim-col">`;
    html += `<h4>📄 Token Stream</h4>`;
    this.tokens.forEach(([t, d], i) => {
      let cl = '';
      if (i < s) cl = 'dim';
      if (i === s - 1 && s <= this.tokens.length) cl = 'highlight';
      if (i === s && s < this.tokens.length) cl = 'highlight-blue';
      html += `<div class="sim-item ${cl}">${i < s ? '✓' : '○'} (${t}, ${d})</div>`;
    });
    html += `</div>`;

    // RAM Dictionary
    html += `<div class="sim-col">`;
    const ram = Object.keys(dict).length;
    const pct = (ram / this.ramLimit * 100).toFixed(0);
    html += `<h4>🧠 RAM Dictionary (${ram}/${this.ramLimit})</h4>`;
    html += `<div class="ram-bar"><div class="ram-fill" style="width:${pct}%">${pct}%</div></div>`;
    Object.entries(dict).forEach(([t, ds]) => {
      const hl = t === highlightTerm ? 'highlight' : '';
      html += `<div class="sim-item ${hl}">${t}: [${ds.join(', ')}]</div>`;
    });
    if (ram === 0 && s > 0) html += `<div class="sim-item dim">(empty — just flushed)</div>`;
    html += `</div>`;

    // Flushed blocks
    html += `<div class="sim-col">`;
    html += `<h4>💾 Disk Blocks</h4>`;
    flushedBlocks.forEach((block, i) => {
      html += `<div class="sim-segment">`;
      html += `<div class="sim-seg-header">Block ${i + 1}</div>`;
      Object.entries(block).sort(([a], [b]) => a.localeCompare(b)).forEach(([t, ds]) => {
        html += `<div class="sim-item dim">${t}: [${ds.join(', ')}]</div>`;
      });
      html += `</div>`;
    });
    if (flushedBlocks.length === 0) html += `<div class="sim-item dim">(nothing flushed yet)</div>`;

    // Merged index
    if (s > this.tokens.length + 1) {
      const all = {};
      flushedBlocks.forEach(b => {
        Object.entries(b).forEach(([t, ds]) => {
          if (!all[t]) all[t] = [];
          ds.forEach(d => { if (!all[t].includes(d)) all[t].push(d); });
        });
      });
      html += `<div class="sim-segment highlight-box">`;
      html += `<div class="sim-seg-header">✅ Final Index</div>`;
      Object.entries(all).sort(([a], [b]) => a.localeCompare(b)).forEach(([t, ds]) => {
        html += `<div class="sim-item highlight-green">${t}: [${ds.sort((a,b)=>a-b).join(', ')}]</div>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
    html += `</div>`;

    const maxStep = this.tokens.length + 2;
    html += `<div class="sim-controls">`;
    html += `<button class="btn btn-secondary" onclick="spimiSim.reset()">⟲ Reset</button>`;
    html += `<button class="btn" onclick="spimiSim.advance()" ${s >= maxStep ? 'disabled style="opacity:0.4"' : ''}>Next Step →</button>`;
    html += `<span class="sim-step-count">Step ${s}/${maxStep}</span>`;
    html += `</div>`;

    el.innerHTML = html;
  }
};

// ═══════════════════════════════════════════════════
//  MAPREDUCE SIMULATOR
// ═══════════════════════════════════════════════════
const mrSim = {
  docs: [
    { id: 'doc1', mapper: 0, text: "the cat sat" },
    { id: 'doc2', mapper: 1, text: "the dog sat" },
    { id: 'doc3', mapper: 2, text: "cat and dog" }
  ],
  step: 0,
  mapOutputs: [[], [], []],
  shuffled: { 0: [], 1: [] },
  reduced: { 0: {}, 1: {} },

  reset() {
    this.step = 0;
    this.render();
  },

  advance() {
    this.step++;
    this.render();
  },

  render() {
    const el = document.getElementById('mrSim');
    if (!el) return;
    const s = this.step;

    // Recompute state
    const mapOutputs = [[], [], []];
    const shuffled = { 0: [], 1: [] };
    const reduced = { 0: {}, 1: {} };

    // Map phase (steps 1-3)
    if (s >= 1) { this.docs[0].text.split(' ').forEach(t => mapOutputs[0].push([t, 'doc1'])); }
    if (s >= 2) { this.docs[1].text.split(' ').forEach(t => mapOutputs[1].push([t, 'doc2'])); }
    if (s >= 3) { this.docs[2].text.split(' ').forEach(t => mapOutputs[2].push([t, 'doc3'])); }

    // Shuffle phase (step 4)
    if (s >= 4) {
      mapOutputs.flat().forEach(([t, d]) => {
        const bucket = Math.abs(hashCode(t)) % 2;
        shuffled[bucket].push([t, d]);
      });
    }

    // Reduce phase (steps 5-6)
    if (s >= 5) {
      shuffled[0].forEach(([t, d]) => {
        if (!reduced[0][t]) reduced[0][t] = [];
        if (!reduced[0][t].includes(d)) reduced[0][t].push(d);
      });
    }
    if (s >= 6) {
      shuffled[1].forEach(([t, d]) => {
        if (!reduced[1][t]) reduced[1][t] = [];
        if (!reduced[1][t].includes(d)) reduced[1][t].push(d);
      });
    }

    const phaseNames = ['Input Splits', 'Map: Mapper 0', 'Map: Mapper 1', 'Map: Mapper 2', 'Shuffle: hash(term) % 2', 'Reduce: Partition 0', 'Reduce: Partition 1', 'Final Index'];
    const pi = Math.min(s, phaseNames.length - 1);

    let html = '';
    html += `<div class="sim-action">${phaseNames[pi]}</div>`;
    html += `<div class="sim-row">`;

    // Input docs
    html += `<div class="sim-col">`;
    html += `<h4>📁 Input Splits</h4>`;
    this.docs.forEach((d, i) => {
      const hl = s === i + 1 ? 'highlight' : s > i + 1 ? 'dim' : '';
      html += `<div class="sim-item ${hl}">Split ${i}: "${d.text}"</div>`;
    });
    html += `</div>`;

    // Map outputs
    html += `<div class="sim-col">`;
    html += `<h4>🗺️ Map Outputs</h4>`;
    mapOutputs.forEach((pairs, i) => {
      if (pairs.length > 0) {
        html += `<div class="sim-segment ${s === i + 1 ? '' : ''}">`;
        html += `<div class="sim-seg-header">Mapper ${i}</div>`;
        pairs.forEach(([t, d]) => {
          html += `<div class="sim-item ${s === i + 1 ? 'highlight-blue' : 'dim'}">(${t}, ${d})</div>`;
        });
        html += `</div>`;
      }
    });
    if (mapOutputs.every(p => p.length === 0)) html += `<div class="sim-item dim">(waiting...)</div>`;
    html += `</div>`;

    // Shuffled
    if (s >= 4) {
      html += `<div class="sim-col">`;
      html += `<h4>⚡ Shuffled Partitions</h4>`;
      [0, 1].forEach(p => {
        html += `<div class="sim-segment">`;
        html += `<div class="sim-seg-header">Partition ${p} (hash%2=${p})</div>`;
        shuffled[p].forEach(([t, d]) => {
          html += `<div class="sim-item ${s === 4 ? 'highlight-amber' : 'dim'}">(${t}, ${d})</div>`;
        });
        html += `</div>`;
      });
      html += `</div>`;
    }

    // Reduced
    if (s >= 5) {
      html += `<div class="sim-col">`;
      html += `<h4>📚 Reduced Index</h4>`;
      [0, 1].forEach(p => {
        if (Object.keys(reduced[p]).length > 0) {
          html += `<div class="sim-segment ${(s === 5 && p === 0) || (s === 6 && p === 1) ? '' : ''} ${s >= 7 ? 'highlight-box' : ''}">`;
          html += `<div class="sim-seg-header">${s >= 7 ? '✅' : '⚙️'} Reducer ${p}</div>`;
          Object.entries(reduced[p]).sort(([a],[b]) => a.localeCompare(b)).forEach(([t, ds]) => {
            const hl = (s === 5 && p === 0) ? 'highlight-green' : (s === 6 && p === 1) ? 'highlight-green' : s >= 7 ? 'highlight-green' : '';
            html += `<div class="sim-item ${hl}">${t}: [${ds.join(', ')}]</div>`;
          });
          html += `</div>`;
        }
      });
      html += `</div>`;
    }

    html += `</div>`;

    html += `<div class="sim-controls">`;
    html += `<button class="btn btn-secondary" onclick="mrSim.reset()">⟲ Reset</button>`;
    html += `<button class="btn" onclick="mrSim.advance()" ${s >= 7 ? 'disabled style="opacity:0.4"' : ''}>Next Step →</button>`;
    html += `<span class="sim-step-count">Step ${s}/7</span>`;
    html += `</div>`;

    el.innerHTML = html;
  }
};

// Simple hash function for MapReduce partitioning
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// ═══════════════════════════════════════════════════
//  SKIP POINTERS INTERSECTION SIMULATOR
// ═══════════════════════════════════════════════════
const skipSim = {
  listA: [2, 4, 8, 16, 19, 23, 28, 43, 45],
  listB: [1, 4, 8, 12, 19, 28, 41, 45, 52],
  skipsA: { 0: 3, 3: 6 },
  skipsB: { 0: 3, 3: 6 },
  step: 0,
  ptrA: 0, ptrB: 0,
  result: [],
  log: [],

  reset() {
    this.step = 0; this.ptrA = 0; this.ptrB = 0; this.result = []; this.log = [];
    this.render();
  },

  advance() {
    if (this.ptrA >= this.listA.length || this.ptrB >= this.listB.length) return;
    this.step++;

    const a = this.listA[this.ptrA];
    const b = this.listB[this.ptrB];

    if (a === b) {
      this.result.push(a);
      this.log.push(`✅ ${a} = ${b} → MATCH! Add ${a} to result`);
      this.ptrA++; this.ptrB++;
    } else if (a < b) {
      // Try skip
      if (this.skipsA[this.ptrA] !== undefined) {
        const skipTo = this.skipsA[this.ptrA];
        if (this.listA[skipTo] <= b) {
          this.log.push(`⏭️ A[${this.ptrA}]=${a} < B=${b}, skip A → index ${skipTo} (val=${this.listA[skipTo]})`);
          this.ptrA = skipTo;
        } else {
          this.log.push(`➡️ A[${this.ptrA}]=${a} < B=${b}, skip too far, advance A by 1`);
          this.ptrA++;
        }
      } else {
        this.log.push(`➡️ A[${this.ptrA}]=${a} < B=${b}, advance A`);
        this.ptrA++;
      }
    } else {
      if (this.skipsB[this.ptrB] !== undefined) {
        const skipTo = this.skipsB[this.ptrB];
        if (this.listB[skipTo] <= a) {
          this.log.push(`⏭️ B[${this.ptrB}]=${b} < A=${a}, skip B → index ${skipTo} (val=${this.listB[skipTo]})`);
          this.ptrB = skipTo;
        } else {
          this.log.push(`➡️ B[${this.ptrB}]=${b} < A=${a}, skip too far, advance B by 1`);
          this.ptrB++;
        }
      } else {
        this.log.push(`➡️ B[${this.ptrB}]=${b} < A=${a}, advance B`);
        this.ptrB++;
      }
    }
    this.render();
  },

  render() {
    const el = document.getElementById('skipSim');
    if (!el) return;
    const done = this.ptrA >= this.listA.length || this.ptrB >= this.listB.length;

    let html = '<div class="sim-row">';

    // List A
    html += `<div class="sim-col"><h4>List A (caesar)</h4><div class="skip-sim-list">`;
    this.listA.forEach((v, i) => {
      let cl = '';
      if (i === this.ptrA && !done) cl = 'highlight';
      else if (i < this.ptrA) cl = 'dim';
      const hasSkip = this.skipsA[i] !== undefined;
      html += `<span class="sim-node ${cl} ${hasSkip ? 'has-skip' : ''}">${v}</span>`;
    });
    html += `</div></div>`;

    // List B
    html += `<div class="sim-col"><h4>List B (brutus)</h4><div class="skip-sim-list">`;
    this.listB.forEach((v, i) => {
      let cl = '';
      if (i === this.ptrB && !done) cl = 'highlight';
      else if (i < this.ptrB) cl = 'dim';
      const hasSkip = this.skipsB[i] !== undefined;
      html += `<span class="sim-node ${cl} ${hasSkip ? 'has-skip' : ''}">${v}</span>`;
    });
    html += `</div></div>`;

    // Result
    html += `<div class="sim-col"><h4>Result (A ∩ B)</h4>`;
    if (this.result.length > 0) {
      html += `<div class="sim-result">[${this.result.join(', ')}]</div>`;
    } else {
      html += `<div class="sim-item dim">(empty)</div>`;
    }
    html += `</div></div>`;

    // Log
    html += `<div class="sim-log">`;
    this.log.slice(-4).forEach(l => {
      html += `<div class="sim-log-entry">${l}</div>`;
    });
    if (done) html += `<div class="sim-log-entry highlight-green">🏁 Done! Intersection: [${this.result.join(', ')}]</div>`;
    html += `</div>`;

    html += `<div class="sim-controls">`;
    html += `<button class="btn btn-secondary" onclick="skipSim.reset()">⟲ Reset</button>`;
    html += `<button class="btn" onclick="skipSim.advance()" ${done ? 'disabled style="opacity:0.4"' : ''}>Next Step →</button>`;
    html += `<span class="sim-step-count">Step ${this.step} · Comparisons saved by skips</span>`;
    html += `</div>`;

    el.innerHTML = html;
  }
};

// Init all simulators on load
document.addEventListener('DOMContentLoaded', () => {
  bsbiSim.render();
  spimiSim.render();
  mrSim.render();
  skipSim.render();
});
