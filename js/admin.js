import { TREE } from "./tree/index.js";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "admin1234";
const CLAUDE_MODEL = "claude-sonnet-4-6";

// ── STATE ─────────────────────────────────────────────────────────────────────
let tree = JSON.parse(JSON.stringify(TREE));
let selectedId = null;
let editorLang = "en";
let previewLang = "en";
let sidebarTab = "nodes";
let rightTab = "preview";
let rightPanelOpen = true;
let searchQuery = "";
let filterType = "";   // "" = all types
let filterStatus = ""; // "" = all statuses
let filterMissingLang = ""; // "" = off, "ar"/"en" = show nodes missing that language
let claudeApiKey = localStorage.getItem("claude_api_key") || "";

// ── AUTOSAVE ───────────────────────────────────────────────────────────────────
let autoSaveTimer = null;

function debounceAutoSave() {
  const status = document.getElementById("autosave-status");
  if (status) { status.textContent = "Saving…"; status.style.opacity = "1"; }
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(autoSave, 600);
}

function autoSave() {
  if (!selectedId || !tree[selectedId]) return;
  const node = tree[selectedId];
  const type = document.getElementById("e-type")?.value || node.type;
  const status = document.getElementById("e-status")?.value || node.status;

  const c = {};
  if (type !== "dead_end") {
    c.question = document.getElementById("e-question")?.value || "";
    c.subtitle = document.getElementById("e-subtitle")?.value || "";
  } else {
    c.message = document.getElementById("e-message")?.value || "";
  }

  const options = (type === "dead_end" || type === "conclusion") ? (node.options || []) : collectOptions();

  let evidence = null;
  if (document.getElementById("e-has-evidence")?.checked) {
    evidence = {
      title: { ...(node.evidence?.title || {}), [editorLang]: document.getElementById("e-evid-title")?.value || "" },
      points: collectEvidenceBlocks(),
    };
  }

  const steps = type === "conclusion" ? collectSteps() : (node.steps || []);
  const showContact = type === "conclusion" ? (document.getElementById("e-show-contact")?.checked || false) : (node.showContact || false);

  const notes = document.getElementById("e-notes")?.value || "";

  tree[selectedId] = {
    ...node,
    type,
    status,
    content: { ...node.content, [editorLang]: c },
    options,
    evidence,
    steps,
    showContact,
    notes,
  };

  persistTree();
  renderNodeList();
  if (rightPanelOpen && rightTab === "preview") renderPreview();
  if (rightPanelOpen && rightTab === "notes") renderNotesPanel();
  // Graph only rebuilds on tab switch, not on every keystroke

  const el = document.getElementById("autosave-status");
  if (el) { el.textContent = "Saved"; setTimeout(() => { el.style.opacity = "0"; }, 1200); }
}

function persistTree() {
  graphTreeVersion++;
}

window.resetToDefaults = function () {
  if (!confirm("Reset tree to original defaults? All your edits will be lost.")) return;
  tree = JSON.parse(JSON.stringify(TREE));
  graphTreeVersion++;
  selectedId = null;
  renderNodeList();
  updateNodeIdDatalist();
  document.getElementById("editor").innerHTML = `<div class="editor-empty">Select a node from the list to edit it.</div>`;
  showToast("Tree reset to defaults.");
};

// ── UTILS ──────────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function locLang(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || "";
}

// ── AUTH ──────────────────────────────────────────────────────────────────────
function checkAuth() {
  showAdmin();
}

// ── SHOW ADMIN ────────────────────────────────────────────────────────────────
function showAdmin() {
  document.getElementById("admin-ui").style.display = "flex";
  renderNodeList();
  updateNodeIdDatalist();
}

// ── SEARCH HIGHLIGHT ──────────────────────────────────────────────────────────
function clearHighlights() {
  document.querySelectorAll(".search-highlight").forEach(mark => {
    mark.replaceWith(mark.textContent);
  });
}

function highlightSearchTerm() {
  clearHighlights();
  if (!searchQuery) return;
  const editor = document.getElementById("editor");
  const skip = new Set(["SCRIPT", "STYLE", "INPUT", "TEXTAREA", "SELECT", "OPTION"]);
  const q = searchQuery.toLowerCase();

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const lower = text.toLowerCase();
      const idx = lower.indexOf(q);
      if (idx === -1) return;
      const before = document.createTextNode(text.slice(0, idx));
      const mark = document.createElement("mark");
      mark.className = "search-highlight";
      mark.textContent = text.slice(idx, idx + q.length);
      const after = document.createTextNode(text.slice(idx + q.length));
      const parent = node.parentNode;
      parent.replaceChild(after, node);
      parent.insertBefore(mark, after);
      parent.insertBefore(before, mark);
    } else if (node.nodeType === Node.ELEMENT_NODE && !skip.has(node.tagName)) {
      Array.from(node.childNodes).forEach(walk);
    }
  }

  walk(editor);
}

// ── MISSING LANGUAGE CHECK ────────────────────────────────────────────────────
function isMissingLang(node, lang) {
  const c = node.content?.[lang];
  // No content object at all for this language
  if (!c) return true;
  // Primary text field is empty
  const primaryEmpty = node.type === "dead_end" ? !c.message?.trim() : !c.question?.trim();
  if (primaryEmpty) return true;
  // Any option label missing
  if ((node.options || []).some(opt => !opt.label?.[lang]?.trim())) return true;
  // Evidence title or any block text missing
  if (node.evidence) {
    if (!node.evidence.title?.[lang]?.trim()) return true;
    for (const pt of node.evidence.points || []) {
      for (const b of pt.blocks || []) {
        if ((b.type === "text" || b.type === "quote") && !b.content?.[lang]?.trim()) return true;
        if (b.type === "link" && !b.label?.[lang]?.trim()) return true;
      }
    }
  }
  // Step labels missing
  if ((node.steps || []).some(st => !st.label?.[lang]?.trim())) return true;
  return false;
}

// ── SIDEBAR TABS ──────────────────────────────────────────────────────────────
window.switchSidebarTab = function(tab) {
  sidebarTab = tab;
  document.getElementById("tab-nodes").classList.toggle("active", tab === "nodes");
  document.getElementById("tab-graph").classList.toggle("active", tab === "graph");
  document.getElementById("nodes-panel").style.display = tab === "nodes" ? "flex" : "none";
  document.getElementById("graph-panel").style.display = tab === "graph" ? "flex" : "none";

  // When graph is active, hide editor + resize handle so graph gets full width
  const editorPanel = document.querySelector(".editor-panel");
  const resizeHandle = document.getElementById("resize-handle");
  if (editorPanel) editorPanel.style.display = tab === "graph" ? "none" : "";
  if (resizeHandle) resizeHandle.style.display = tab === "graph" ? "none" : "";
  // Expand sidebar to fill space when graph is shown
  const sidebar = document.getElementById("sidebar");
  if (sidebar) sidebar.style.flex = tab === "graph" ? "1" : "";

  if (tab === "graph") requestAnimationFrame(() => renderGraph());
};

// ── RIGHT PANEL (Preview & Notes) ─────────────────────────────────────────────
window.switchRightTab = function (tab) {
  rightTab = tab;
  document.getElementById("rtab-preview").classList.toggle("active", tab === "preview");
  document.getElementById("rtab-notes").classList.toggle("active", tab === "notes");
  document.getElementById("preview-panel").style.display = tab === "preview" ? "block" : "none";
  document.getElementById("notes-panel").style.display = tab === "notes" ? "flex" : "none";
  if (tab === "preview") renderPreview();
  if (tab === "notes") renderNotesPanel();
};

window.toggleRightPanel = function () {
  rightPanelOpen = !rightPanelOpen;
  const panel = document.getElementById("right-panel");
  const handle = document.getElementById("right-resize-handle");
  const toggle = document.getElementById("right-panel-toggle");
  if (!rightPanelOpen) {
    panel.style.display = "none";
    if (handle) handle.style.display = "none";
  } else {
    panel.style.display = "";
    if (handle) handle.style.display = "";
    if (rightTab === "preview") renderPreview();
    if (rightTab === "notes") renderNotesPanel();
  }
  toggle.classList.toggle("visible", !rightPanelOpen);
};

// ── NOTES PANEL ───────────────────────────────────────────────────────────────
const GLOBAL_NOTES_KEY = "thepath_admin_global_notes";
let notesSearch = "";

function renderNotesPanel() {
  // Restore global notes from localStorage
  const globalEl = document.getElementById("global-notes");
  if (globalEl && !globalEl.dataset.loaded) {
    globalEl.value = localStorage.getItem(GLOBAL_NOTES_KEY) || "";
    globalEl.dataset.loaded = "1";
    autoResizeTextarea(globalEl);
  }

  const q = notesSearch.toLowerCase();
  const words = q.split(/\s+/).filter(Boolean);
  const nodes = Object.values(tree).filter(n => {
    if (!n.notes?.trim()) return false;
    if (!words.length) return true;
    const text = (n.id + " " + n.notes).toLowerCase();
    return words.every(w => text.includes(w));
  });

  const list = document.getElementById("notes-node-list");
  if (!nodes.length) {
    list.innerHTML = `<div class="notes-empty">${q ? "No notes match your search." : "No node notes yet.\nAdd notes in the editor below any node."}</div>`;
    return;
  }

  list.innerHTML = nodes.map(n => {
    const safe = escHtml(n.notes);
    const text = q
      ? safe.replace(new RegExp(`(${escHtml(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"), "<mark class=\"search-highlight\">$1</mark>")
      : safe;
    return `<div class="note-item" onclick="selectNode('${n.id}');switchSidebarTab('nodes')">
      <div class="note-item-id">${escHtml(n.id)}</div>
      <div class="note-item-text">${text}</div>
    </div>`;
  }).join("");
}

document.getElementById("global-notes").addEventListener("input", e => {
  localStorage.setItem(GLOBAL_NOTES_KEY, e.target.value);
  autoResizeTextarea(e.target);
});

document.getElementById("notes-search").addEventListener("input", e => {
  notesSearch = e.target.value;
  renderNotesPanel();
});

window.togglePrevEvidence = function(btn) {
  const box = btn.nextElementSibling;
  const open = box.style.display !== "none";
  box.style.display = open ? "none" : "block";
  btn.querySelector(".prev-evid-arrow").textContent = open ? "▶" : "▼";
};

function renderPreview() {
  const panel = document.getElementById("preview-panel");
  if (!selectedId || !tree[selectedId]) {
    panel.innerHTML = `<div class="prev-empty">Select a node to preview it.</div>`;
    return;
  }

  const node = tree[selectedId];
  const c = node.content?.[previewLang] || node.content?.en || {};
  const loc = v => locLang(v, previewLang);

  const typeLabels = {
    question: "Question",
    rebuttal: "Let's look at this together",
    dead_end: "Continue the conversation",
    conclusion: "You've reached the end of this path",
  };

  let html = ``;

  // Type tag
  html += `<div class="prev-tag">${typeLabels[node.type] || node.type}</div>`;

  // Heading
  if (c.question) html += `<div class="prev-question">${escHtml(c.question)}</div>`;
  if (c.subtitle) html += `<div class="prev-subtitle">${escHtml(c.subtitle)}</div>`;
  if (c.message)  html += `<div class="prev-subtitle">${escHtml(c.message)}</div>`;

  // Evidence
  if (node.evidence) {
    const evTitle = loc(node.evidence.title) || "See what the evidence says";
    html += `<button class="prev-evid-toggle" onclick="togglePrevEvidence(this)">
      <span class="prev-evid-arrow">▶</span> <span>${escHtml(evTitle)}</span>
    </button>
    <div class="prev-evid-box" style="display:none">`;
    for (const pt of node.evidence.points || []) {
      html += `<div class="prev-evid-pt">`;
      for (const b of pt.blocks || []) {
        if (b.type === "text")  html += `<p class="prev-evid-text">${escHtml(loc(b.content))}</p>`;
        if (b.type === "quote") html += `<blockquote class="prev-evid-quote">${escHtml(loc(b.content))}<cite>${escHtml(loc(b.source))}</cite></blockquote>`;
        if (b.type === "link")  html += `<a class="prev-evid-link" href="${escHtml(b.url)}" target="_blank" rel="noopener noreferrer">↗ ${escHtml(loc(b.label))}</a>`;
        if (b.type === "image" && b.url) html += `<figure style="margin:6px 0"><img src="${escHtml(b.url)}" alt="${escHtml(loc(b.caption))}" style="width:100%;border-radius:6px;display:block">${loc(b.caption) ? `<figcaption style="font-size:11px;color:var(--muted);margin-top:4px">${escHtml(loc(b.caption))}</figcaption>` : ""}</figure>`;
      }
      const rm = loc(pt.readMore);
      if (rm) html += `<div class="prev-evid-readmore">${escHtml(rm)}</div>`;
      html += `</div>`;
    }
    html += `</div>`;
  }

  // Options
  const opts = node.options || [];
  if (opts.length) {
    html += `<div class="prev-opts">`;
    for (const opt of opts) {
      const label = loc(opt.label) || opt.next;
      const valid = !!tree[opt.next];
      const arrow = valid
        ? `<span class="prev-opt-arrow">${escHtml(opt.next)}</span>`
        : `<span class="prev-opt-arrow broken" title="Broken link">⚠ ${escHtml(opt.next)}</span>`;
      html += `<div class="prev-opt">${escHtml(label)}${arrow}</div>`;
    }
    if (node.type === "question") {
      html += `<div class="prev-none">None of these represent my view</div>`;
    }
    html += `</div>`;
  }

  // Conclusion steps
  if (node.type === "conclusion" && node.steps?.length) {
    html += `<div class="prev-steps-title">Next steps</div>`;
    for (const st of node.steps) {
      html += `<div class="prev-step">↗ ${escHtml(loc(st.label))}</div>`;
    }
  }

  panel.innerHTML = html;
}

// ── NODE LIST ─────────────────────────────────────────────────────────────────
const TYPE_COLORS = {
  question: "#2563eb",
  rebuttal: "#b45309",
  dead_end: "#b91c1c",
  conclusion: "#047857",
};

function renderNodeList() {
  const list = document.getElementById("node-list");
  const nodes = Object.values(tree).filter(n => {
    if (filterType && n.type !== filterType) return false;
    if (filterStatus && (n.status || "live") !== filterStatus) return false;
    if (filterMissingLang && !isMissingLang(n, filterMissingLang)) return false;
    if (!searchQuery) return true;
    const words = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const text = [
      n.id,
      ...Object.values(n.content || {}).flatMap(c => [c.question, c.subtitle, c.message]),
      ...(n.options || []).flatMap(o => Object.values(o.label || {})),
      n.evidence?.title ? Object.values(n.evidence.title) : [],
      ...(n.evidence?.points || []).flatMap(pt => [
        ...(pt.blocks || []).flatMap(b => [
          typeof b.content === "object" ? Object.values(b.content) : b.content,
          typeof b.label === "object" ? Object.values(b.label) : b.label,
          typeof b.source === "object" ? Object.values(b.source) : b.source,
        ]),
        typeof pt.readMore === "object" ? Object.values(pt.readMore) : pt.readMore,
      ]),
      ...(n.steps || []).flatMap(s => typeof s.label === "object" ? Object.values(s.label) : s.label),
      n.notes || "",
    ].flat().filter(Boolean).join(" ").toLowerCase();
    return words.every(w => text.includes(w));
  });

  list.innerHTML = nodes.map(n => {
    const c = n.content?.en || {};
    const label = c.question || c.message || n.id;
    const color = TYPE_COLORS[n.type] || "#666";
    const active = n.id === selectedId ? " active" : "";
    const missingAr = isMissingLang(n, "ar");
    const missingEn = isMissingLang(n, "en");
    const langBadges = [
      missingEn ? `<span class="missing-lang-badge">EN</span>` : "",
      missingAr ? `<span class="missing-lang-badge">AR</span>` : "",
    ].join("");
    return `<div class="node-item${active}" onclick="selectNode('${n.id}')">
      <div class="node-item-header">
        <span class="node-type-chip" style="background:${color}22;color:${color}">${n.type}</span>
        <span class="node-status-chip ${n.status === "draft" ? "draft" : "live"}">${n.status || "live"}</span>
        ${langBadges}
      </div>
      <div class="node-item-id">${n.id}</div>
      <div class="node-item-label">${label.length > 70 ? label.slice(0, 70) + "…" : label}</div>
    </div>`;
  }).join("");
}

// ── SELECT NODE ───────────────────────────────────────────────────────────────
window.selectNode = function (id) {
  selectedId = id;
  renderNodeList();
  renderEditor();
  if (searchQuery) highlightSearchTerm();
  if (rightPanelOpen && rightTab === "preview") renderPreview();
  if (sidebarTab === "graph" && cyInstance) highlightGraphNode(id);
};

window.switchEditorLang = function (l) {
  editorLang = l;
  previewLang = l;
  renderEditor();
  if (rightPanelOpen && rightTab === "preview") renderPreview();
};

// ── INCOMING LINKS ────────────────────────────────────────────────────────────
function getIncomingLinks(id) {
  return Object.values(tree).filter(n =>
    (n.options || []).some(opt => opt.next === id)
  ).map(n => n.id);
}

// ── EDITOR ────────────────────────────────────────────────────────────────────
function renderEditor() {
  const editor = document.getElementById("editor");
  if (!selectedId || !tree[selectedId]) {
    editor.innerHTML = `<div class="editor-empty">Select a node from the list to edit it.</div>`;
    return;
  }

  const node = tree[selectedId];
  const c = node.content?.[editorLang] || {};
  const incoming = getIncomingLinks(selectedId);
  const outgoing = (node.options || []).map(o => o.next).filter(id => id && tree[id]);

  editor.innerHTML = `
    <div class="editor-header">
      <div>
        <div class="editor-node-id">${node.id}</div>
        <div class="editor-node-type">${node.type}</div>
      </div>
      <div class="editor-actions">
        <div class="lang-toggle">
          <button class="btn btn-sm ${editorLang === "en" ? "btn-primary" : ""}" onclick="switchEditorLang('en')">EN</button>
          <button class="btn btn-sm ${editorLang === "ar" ? "btn-primary" : ""}" onclick="switchEditorLang('ar')">AR</button>
        </div>
        <button class="btn btn-secondary" onclick="previewNode()">Open site ↗</button>
        <button class="btn btn-secondary" onclick="duplicateNode('${node.id}')">Duplicate</button>
        <button class="btn btn-danger" onclick="deleteNode('${node.id}')">Delete</button>
      </div>
    </div>

    ${incoming.length ? `
    <div class="field-group">
      <label class="field-label">Incoming links</label>
      <div class="incoming-links">
        ${incoming.map(id => `<span class="link-chip" onclick="selectNode('${id}')">${id}</span>`).join("")}
      </div>
    </div>` : ""}

    ${outgoing.length ? `
    <div class="field-group">
      <label class="field-label">Outgoing links</label>
      <div class="incoming-links">
        ${outgoing.map(id => `<span class="link-chip" onclick="selectNode('${id}')">${id}</span>`).join("")}
      </div>
    </div>` : ""}

    <div class="field-group">
      <label class="field-label">Node ID</label>
      <input class="field-input" id="e-id" value="${node.id}" placeholder="snake_case_id" />
    </div>

    <div class="field-row">
      <div class="field-group">
        <label class="field-label">Type</label>
        <select class="field-input" id="e-type" onchange="onTypeChange()">
          <option value="question" ${node.type === "question" ? "selected" : ""}>Question</option>
          <option value="rebuttal" ${node.type === "rebuttal" ? "selected" : ""}>Rebuttal</option>
          <option value="dead_end" ${node.type === "dead_end" ? "selected" : ""}>Dead End</option>
          <option value="conclusion" ${node.type === "conclusion" ? "selected" : ""}>Conclusion</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">Status</label>
        <select class="field-input" id="e-status">
          <option value="live" ${(node.status || "live") === "live" ? "selected" : ""}>Live</option>
          <option value="draft" ${node.status === "draft" ? "selected" : ""}>Draft</option>
        </select>
      </div>
    </div>

    <div class="field-group" id="e-question-group" style="${node.type === "dead_end" ? "display:none" : ""}">
      <label class="field-label">${node.type === "conclusion" ? "Heading" : "Question"}</label>
      <textarea class="field-input field-textarea" id="e-question" rows="2">${c.question || ""}</textarea>
    </div>

    <div class="field-group" id="e-subtitle-group" style="${node.type === "dead_end" ? "display:none" : ""}">
      <label class="field-label">Subtitle</label>
      <textarea class="field-input field-textarea" id="e-subtitle" rows="2">${c.subtitle || ""}</textarea>
    </div>

    <div class="field-group" id="e-message-group" style="${node.type !== "dead_end" ? "display:none" : ""}">
      <label class="field-label">Message</label>
      <textarea class="field-input field-textarea" id="e-message" rows="3">${c.message || ""}</textarea>
    </div>

    <div id="e-evidence-section" style="${node.type === "dead_end" || node.type === "conclusion" ? "display:none" : ""}">
      <div class="section-header">
        <label class="field-label" style="margin:0">Evidence Panel</label>
        <label class="toggle-label">
          <input type="checkbox" id="e-has-evidence" ${node.evidence ? "checked" : ""} onchange="toggleEvidenceSection()">
          Enabled
        </label>
      </div>
      <div id="e-evidence-fields" style="${!node.evidence ? "display:none" : ""}">
        <div class="field-group">
          <label class="field-label">Evidence Title</label>
          <input class="field-input" id="e-evid-title" value="${node.evidence?.title?.[editorLang] || ""}" placeholder="e.g. What the evidence shows" />
        </div>
        <div id="e-evidence-points">
          ${renderEvidencePoints(node.evidence?.points || [])}
        </div>
        <button class="btn btn-sm" onclick="addEvidencePoint()">+ Add point</button>
      </div>
    </div>

    <div id="e-options-section" style="${node.type === "dead_end" || node.type === "conclusion" ? "display:none" : ""}">
      <div class="section-header">
        <label class="field-label" style="margin:0">Answer Options</label>
        <button class="btn btn-sm" onclick="addOption()">+ Add option</button>
      </div>
      <div id="e-options">
        ${renderOptionsEditor(node.options || [])}
      </div>
    </div>

    <div id="e-steps-section" style="${node.type !== "conclusion" ? "display:none" : ""}">
      <div class="section-header">
        <label class="field-label" style="margin:0">Next Steps</label>
        <button class="btn btn-sm" onclick="addStep()">+ Add step</button>
      </div>
      <div id="e-steps">
        ${renderStepsEditor(node.steps || [])}
      </div>
      <div class="field-group" style="margin-top:12px">
        <label class="toggle-label">
          <input type="checkbox" id="e-show-contact" ${node.showContact ? "checked" : ""}>
          Show contact form on this conclusion
        </label>
      </div>
    </div>

    <div class="node-notes-field">
      <div class="node-notes-label">📋 Admin notes <span style="font-weight:400;color:var(--muted);text-transform:none;letter-spacing:0">(not shown to users)</span></div>
      <textarea class="node-notes-textarea" id="e-notes" placeholder="TODOs, improvement ideas, translation reminders…">${node.notes || ""}</textarea>
    </div>

    <div class="editor-footer">
      <button class="btn btn-ai" onclick="aiGenerate()">✦ AI Generate</button>
      <div style="display:flex;align-items:center;gap:12px">
        <span id="autosave-status" style="font-size:12px;color:var(--muted);opacity:0;transition:opacity .4s"></span>
        <button class="btn btn-secondary" onclick="renderEditor()">Reset</button>
      </div>
    </div>
  `;
  requestAnimationFrame(autoResizeAll);
}

// ── OPTIONS EDITOR ────────────────────────────────────────────────────────────
function renderOptionsEditor(options) {
  return options.map((opt, i) => {
    const valid = opt.next && !!tree[opt.next];
    const invalid = opt.next && !tree[opt.next];
    return `
    <div class="opt-row" data-index="${i}">
      <div class="opt-row-fields">
        <input class="field-input" placeholder="Button label" value="${(opt.label?.[editorLang] || "").replace(/"/g, "&quot;")}" data-opt-label="${i}" />
        <div style="display:flex;gap:6px;align-items:center">
          <input class="field-input${invalid ? " opt-next-invalid" : ""}" placeholder="Target node ID" value="${opt.next || ""}"
                 data-opt-next="${i}" list="node-ids-list" style="flex:1" oninput="updateNextField(this)" />
          <span data-opt-next-action="${i}">
            ${valid ? `<button class="btn btn-sm" style="white-space:nowrap" onclick="selectNode('${opt.next}')" title="Go to ${opt.next}">→ go</button>` : ""}
            ${invalid ? `<span class="invalid-indicator" title="Node not found">✗</span>` : ""}
          </span>
        </div>
      </div>
      <button class="btn btn-icon btn-danger" onclick="removeOption(${i})" title="Remove option">×</button>
    </div>`;
  }).join("");
}

function updateNodeIdDatalist() {
  const dl = document.getElementById("node-ids-list");
  if (!dl) return;
  dl.innerHTML = Object.keys(tree).map(id => `<option value="${id}">`).join("");
}

window.updateNextField = function (input) {
  const val = input.value.trim();
  const valid = val && !!tree[val];
  const invalid = val && !tree[val];
  input.classList.toggle("opt-next-invalid", !!invalid);
  const i = input.dataset.optNext;
  const action = document.querySelector(`[data-opt-next-action="${i}"]`);
  if (!action) return;
  if (valid) {
    action.innerHTML = `<button class="btn btn-sm" style="white-space:nowrap" onclick="selectNode('${val}')" title="Go to ${val}">→ go</button>`;
  } else if (invalid) {
    action.innerHTML = `<span class="invalid-indicator" title="Node not found">✗</span>`;
  } else {
    action.innerHTML = "";
  }
};

window.addOption = function () {
  const node = tree[selectedId];
  node.options = node.options || [];
  node.options.push({ label: { en: "" }, next: "" });
  document.getElementById("e-options").innerHTML = renderOptionsEditor(node.options);
};

window.removeOption = function (index) {
  const node = tree[selectedId];
  node.options.splice(index, 1);
  document.getElementById("e-options").innerHTML = renderOptionsEditor(node.options);
};

function collectOptions() {
  const labels = document.querySelectorAll("[data-opt-label]");
  const nexts = document.querySelectorAll("[data-opt-next]");
  const opts = [];
  labels.forEach((el, i) => {
    const existingLabel = tree[selectedId]?.options?.[i]?.label || {};
    opts.push({ label: { ...existingLabel, [editorLang]: el.value }, next: nexts[i]?.value || "" });
  });
  return opts;
}

// ── EVIDENCE EDITOR ───────────────────────────────────────────────────────────
function renderEvidencePoints(points) {
  return points.map((pt, pi) => `
    <div class="evidence-point" data-point="${pi}">
      <div class="point-header">
        <span class="point-label">Point ${pi + 1}</span>
        <button class="btn btn-sm btn-danger" onclick="removeEvidencePoint(${pi})">Remove</button>
      </div>
      <div class="blocks-container" id="blocks-${pi}">
        ${renderBlocks(pt.blocks || [], pi)}
      </div>
      <div class="block-add-row">
        <button class="btn btn-sm" onclick="addBlock(${pi}, 'text')">+ Text</button>
        <button class="btn btn-sm" onclick="addBlock(${pi}, 'link')">+ Link</button>
        <button class="btn btn-sm" onclick="addBlock(${pi}, 'quote')">+ Quote</button>
        <button class="btn btn-sm" onclick="addBlock(${pi}, 'image')">+ Image</button>
      </div>
      <div class="field-group" style="margin-top:8px">
        <label class="field-label">Read More (optional expanded text)</label>
        <textarea class="field-input field-textarea" data-readmore="${pi}" rows="2">${(typeof pt.readMore === "object" ? pt.readMore[editorLang] : pt.readMore) || ""}</textarea>
      </div>
    </div>
  `).join("");
}

function renderBlocks(blocks, pi) {
  return blocks.map((b, bi) => `
    <div class="block-row" data-block="${bi}" data-point="${pi}">
      <div class="block-type-tag">${b.type}</div>
      <div class="block-fields">
        ${renderBlockFields(b, pi, bi)}
      </div>
      <button class="btn btn-icon btn-danger" onclick="removeBlock(${pi}, ${bi})">×</button>
    </div>
  `).join("");
}

function renderBlockFields(b, pi, bi) {
  const lv = v => (typeof v === "object" ? v[editorLang] ?? v.en ?? "" : v ?? "");
  if (b.type === "text") {
    return `<textarea class="field-input field-textarea" data-block-content="${pi}-${bi}" rows="2">${lv(b.content)}</textarea>`;
  }
  if (b.type === "link") {
    return `
      <input class="field-input" data-block-label="${pi}-${bi}" placeholder="Link label" value="${lv(b.label).replace(/"/g, "&quot;")}" />
      <input class="field-input" data-block-url="${pi}-${bi}" placeholder="URL" value="${b.url || ""}" />
      <select class="field-input" data-block-linktype="${pi}-${bi}">
        <option value="article" ${b.linkType === "article" ? "selected" : ""}>Article</option>
        <option value="video" ${b.linkType === "video" ? "selected" : ""}>Video</option>
        <option value="book" ${b.linkType === "book" ? "selected" : ""}>Book</option>
        <option value="study" ${b.linkType === "study" ? "selected" : ""}>Study</option>
      </select>`;
  }
  if (b.type === "quote") {
    return `
      <textarea class="field-input field-textarea" data-block-content="${pi}-${bi}" placeholder="Quote text" rows="2">${lv(b.content)}</textarea>
      <input class="field-input" data-block-source="${pi}-${bi}" placeholder="Source (e.g. Ibn Kathir)" value="${lv(b.source).replace(/"/g, "&quot;")}" />`;
  }
  if (b.type === "image") {
    return `
      <input class="field-input" data-block-url="${pi}-${bi}" placeholder="Image URL" value="${b.url || ""}" />
      <input class="field-input" data-block-caption="${pi}-${bi}" placeholder="Caption (optional)" value="${lv(b.caption).replace(/"/g, "&quot;")}" />`;
  }
  return "";
}

window.addBlock = function (pi, type) {
  const node = tree[selectedId];
  const pts = node.evidence?.points || [];
  if (!pts[pi]) return;
  const block = { type };
  if (type === "text" || type === "quote") block.content = "";
  if (type === "link") { block.label = ""; block.url = ""; block.linkType = "article"; }
  if (type === "image") { block.url = ""; block.caption = ""; }
  pts[pi].blocks = pts[pi].blocks || [];
  pts[pi].blocks.push(block);
  document.getElementById(`blocks-${pi}`).innerHTML = renderBlocks(pts[pi].blocks, pi);
  requestAnimationFrame(autoResizeAll);
};

window.removeBlock = function (pi, bi) {
  const node = tree[selectedId];
  node.evidence.points[pi].blocks.splice(bi, 1);
  document.getElementById(`blocks-${pi}`).innerHTML = renderBlocks(node.evidence.points[pi].blocks, pi);
  requestAnimationFrame(autoResizeAll);
};

window.addEvidencePoint = function () {
  const node = tree[selectedId];
  if (!node.evidence) {
    node.evidence = { title: { en: "" }, points: [] };
  }
  node.evidence.points = node.evidence.points || [];
  const newId = `p${Date.now()}`;
  node.evidence.points.push({ id: newId, blocks: [{ type: "text", content: "" }], readMore: "" });
  document.getElementById("e-evidence-points").innerHTML = renderEvidencePoints(node.evidence.points);
  requestAnimationFrame(autoResizeAll);
};

window.removeEvidencePoint = function (pi) {
  const node = tree[selectedId];
  node.evidence.points.splice(pi, 1);
  document.getElementById("e-evidence-points").innerHTML = renderEvidencePoints(node.evidence.points);
  requestAnimationFrame(autoResizeAll);
};

window.toggleEvidenceSection = function () {
  const checked = document.getElementById("e-has-evidence").checked;
  document.getElementById("e-evidence-fields").style.display = checked ? "" : "none";
  if (checked && !tree[selectedId].evidence) {
    tree[selectedId].evidence = { title: { en: "" }, points: [] };
  }
};

// ── STEPS EDITOR (CONCLUSION) ─────────────────────────────────────────────────
function renderStepsEditor(steps) {
  return steps.map((st, i) => `
    <div class="opt-row">
      <div class="opt-row-fields">
        <input class="field-input" placeholder="Step label" data-step-label="${i}" value="${escHtml(locLang(st.label, editorLang))}" />
        <input class="field-input" placeholder="URL" data-step-url="${i}" value="${st.url || ""}" />
        <select class="field-input" data-step-type="${i}" style="max-width:120px">
          <option value="article" ${st.type === "article" ? "selected" : ""}>Article</option>
          <option value="video" ${st.type === "video" ? "selected" : ""}>Video</option>
        </select>
      </div>
      <button class="btn btn-icon btn-danger" onclick="removeStep(${i})">×</button>
    </div>
  `).join("");
}

window.addStep = function () {
  const node = tree[selectedId];
  node.steps = node.steps || [];
  node.steps.push({ label: "", url: "", type: "article" });
  document.getElementById("e-steps").innerHTML = renderStepsEditor(node.steps);
};

window.removeStep = function (i) {
  const node = tree[selectedId];
  node.steps.splice(i, 1);
  document.getElementById("e-steps").innerHTML = renderStepsEditor(node.steps);
};

function collectSteps() {
  const node = tree[selectedId];
  const labels = document.querySelectorAll("[data-step-label]");
  const urls = document.querySelectorAll("[data-step-url]");
  const types = document.querySelectorAll("[data-step-type]");
  const steps = [];
  labels.forEach((el, i) => {
    const existing = node.steps?.[i]?.label;
    const label = typeof existing === "object" ? { ...existing, [editorLang]: el.value } : { [editorLang]: el.value };
    steps.push({ label, url: urls[i]?.value || "", type: types[i]?.value || "article" });
  });
  return steps;
}

// ── TYPE CHANGE ───────────────────────────────────────────────────────────────
window.onTypeChange = function () {
  const type = document.getElementById("e-type").value;
  document.getElementById("e-question-group").style.display = type === "dead_end" ? "none" : "";
  document.getElementById("e-subtitle-group").style.display = type === "dead_end" ? "none" : "";
  document.getElementById("e-message-group").style.display = type === "dead_end" ? "" : "none";
  document.getElementById("e-options-section").style.display = (type === "dead_end" || type === "conclusion") ? "none" : "";
  document.getElementById("e-evidence-section").style.display = (type === "dead_end" || type === "conclusion") ? "none" : "";
  document.getElementById("e-steps-section").style.display = type === "conclusion" ? "" : "none";
};

// ── COLLECT EVIDENCE BLOCKS ───────────────────────────────────────────────────
function collectEvidenceBlocks() {
  const node = tree[selectedId];
  const points = node.evidence?.points || [];
  // Helper: merge edited value into existing multilingual object
  const merge = (existing, val) => {
    if (typeof existing === "object" && existing !== null) return { ...existing, [editorLang]: val };
    // Was a plain string (old format) — promote to multilingual
    return { en: editorLang === "en" ? val : (existing || ""), ar: editorLang === "ar" ? val : "" };
  };
  return points.map((pt, pi) => {
    const blocks = pt.blocks.map((b, bi) => {
      const key = `${pi}-${bi}`;
      if (b.type === "text") return { type: "text", content: merge(b.content, document.querySelector(`[data-block-content="${key}"]`)?.value || "") };
      if (b.type === "link") return {
        type: "link",
        label: merge(b.label, document.querySelector(`[data-block-label="${key}"]`)?.value || ""),
        url: document.querySelector(`[data-block-url="${key}"]`)?.value || "",
        linkType: document.querySelector(`[data-block-linktype="${key}"]`)?.value || "article",
      };
      if (b.type === "quote") return {
        type: "quote",
        content: merge(b.content, document.querySelector(`[data-block-content="${key}"]`)?.value || ""),
        source: merge(b.source, document.querySelector(`[data-block-source="${key}"]`)?.value || ""),
      };
      if (b.type === "image") return {
        type: "image",
        url: document.querySelector(`[data-block-url="${key}"]`)?.value || "",
        caption: merge(b.caption, document.querySelector(`[data-block-caption="${key}"]`)?.value || ""),
      };
      return b;
    });
    const readMore = merge(pt.readMore, document.querySelector(`[data-readmore="${pi}"]`)?.value || "");
    return { ...pt, blocks, readMore };
  });
}

// ── SAVE NODE ─────────────────────────────────────────────────────────────────
window.saveNode = function () {
  const node = tree[selectedId];
  const newId = document.getElementById("e-id").value.trim();
  const type = document.getElementById("e-type").value;
  const status = document.getElementById("e-status").value;

  // Update content
  const c = {};
  if (type !== "dead_end") {
    c.question = document.getElementById("e-question")?.value || "";
    c.subtitle = document.getElementById("e-subtitle")?.value || "";
  } else {
    c.message = document.getElementById("e-message")?.value || "";
  }

  // Options
  const options = (type === "dead_end" || type === "conclusion") ? (node.options || []) : collectOptions();

  // Evidence
  let evidence = null;
  if (document.getElementById("e-has-evidence")?.checked) {
    evidence = {
      title: { ...(tree[selectedId].evidence?.title || {}), [editorLang]: document.getElementById("e-evid-title")?.value || "" },
      points: collectEvidenceBlocks(),
    };
  }

  // Steps (conclusion)
  const steps = type === "conclusion" ? collectSteps() : (node.steps || []);
  const showContact = type === "conclusion" ? (document.getElementById("e-show-contact")?.checked || false) : (node.showContact || false);

  const updated = {
    ...node,
    id: newId,
    type,
    status,
    content: { ...node.content, [editorLang]: c },
    options,
    evidence,
    steps,
    showContact,
    notes: document.getElementById("e-notes")?.value || "",
  };

  // Handle ID rename
  if (newId !== selectedId) {
    delete tree[selectedId];
    tree[newId] = updated;
    selectedId = newId;
  } else {
    tree[selectedId] = updated;
  }

  persistTree();
  renderNodeList();
  renderEditor();
  if (rightPanelOpen && rightTab === "preview") renderPreview();
};

// ── PREVIEW ───────────────────────────────────────────────────────────────────
window.previewNode = function () {
  const params = new URLSearchParams({ path: selectedId });
  if (editorLang === "ar") params.set("lang", "ar");
  window.open("index.html?" + params.toString(), "_blank");
};

// ── DUPLICATE / DELETE ────────────────────────────────────────────────────────
window.duplicateNode = function (id) {
  const node = JSON.parse(JSON.stringify(tree[id]));
  const newId = id + "_copy";
  node.id = newId;
  node.status = "draft";
  tree[newId] = node;
  persistTree();
  selectedId = newId;
  renderNodeList();
  renderEditor();
  updateNodeIdDatalist();
};

window.deleteNode = function (id) {
  if (!confirm(`Delete node "${id}"? This cannot be undone.`)) return;
  delete tree[id];
  persistTree();
  selectedId = null;
  renderNodeList();
  updateNodeIdDatalist();
  document.getElementById("editor").innerHTML = `<div class="editor-empty">Select a node from the list to edit it.</div>`;
};

// ── NEW NODE ──────────────────────────────────────────────────────────────────
window.createNewNode = function () {
  const id = "new_node_" + Date.now();
  tree[id] = {
    id,
    type: "question",
    status: "draft",
    content: { en: { question: "", subtitle: "" } },
    options: [],
    evidence: null,
  };
  persistTree();
  selectedId = id;
  renderNodeList();
  renderEditor();
  updateNodeIdDatalist();
};

// ── AI GENERATE ───────────────────────────────────────────────────────────────
window.aiGenerate = function () {
  const modal = document.getElementById("ai-modal");
  modal.style.display = "flex";
  document.getElementById("ai-key-display").textContent = claudeApiKey ? "API key set ✓" : "No API key set";
};

window.closeAiModal = function () {
  document.getElementById("ai-modal").style.display = "none";
};

window.saveApiKey = function () {
  claudeApiKey = document.getElementById("ai-key-input").value.trim();
  localStorage.setItem("claude_api_key", claudeApiKey);
  document.getElementById("ai-key-display").textContent = claudeApiKey ? "API key set ✓" : "No API key set";
};

window.runAiGenerate = async function () {
  if (!claudeApiKey) {
    alert("Please enter a Claude API key first.");
    return;
  }
  const node = tree[selectedId];
  if (!node) return;

  const prompt = document.getElementById("ai-prompt").value.trim();
  const btn = document.getElementById("ai-run-btn");
  const output = document.getElementById("ai-output");

  btn.textContent = "Generating…"; btn.disabled = true;
  output.textContent = "";

  const systemPrompt = `You are a content writer for "The Path", a rational, evidence-based Islamic dawah website.
The site guides users through big questions using logic and evidence.
Tone: rational, simple, direct. No jargon. No lecturing.
You are helping write or improve a node in the content tree.

Current node data:
${JSON.stringify(node, null, 2)}

Node types: question (with options), rebuttal (shows evidence then continue button), dead_end (shows contact form), conclusion (end of path with next steps).

Return ONLY a JSON object matching the node structure. Do not add commentary. The user will review and approve before it's applied.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": claudeApiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-calls": "true",
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: "user", content: prompt || "Please improve this node's content while keeping the same structure and connections." }],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      output.textContent = "Error: " + (err.error?.message || res.statusText);
      btn.textContent = "Generate"; btn.disabled = false;
      return;
    }

    const data = await res.json();
    const text = data.content?.[0]?.text || "";
    output.textContent = text;
    document.getElementById("ai-apply-btn").style.display = "inline-block";
  } catch (e) {
    output.textContent = "Network error: " + e.message;
  }
  btn.textContent = "Generate"; btn.disabled = false;
};

window.applyAiResult = function () {
  const text = document.getElementById("ai-output").textContent;
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found in response");
    const parsed = JSON.parse(jsonMatch[0]);
    tree[selectedId] = { ...tree[selectedId], ...parsed, id: selectedId };
    closeAiModal();
    renderEditor();
    showToast("AI content applied. Review and save.");
  } catch (e) {
    alert("Could not parse AI response as JSON: " + e.message);
  }
};

// ── EXPORT / IMPORT ───────────────────────────────────────────────────────────
window.exportTree = function () {
  const json = JSON.stringify(tree, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "the-path-data.json"; a.click();
  URL.revokeObjectURL(url);
};

const SAVE_SERVER_URL = "http://localhost:3456/save";

window.saveToFiles = async function () {
  const btn = document.getElementById("save-to-files-btn");
  if (!btn) { alert("Save button not found"); return; }
  const origText = btn.innerHTML;
  btn.textContent = "Saving…";
  btn.disabled = true;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(SAVE_SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tree),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const data = await res.json();
    if (data.ok) {
      const gitMsg = data.git === "pushed" ? " & pushed" : data.git === "no_changes" ? " (no changes)" : "";
      btn.textContent = "✓ Saved " + data.totalNodes + " nodes" + gitMsg;
      setTimeout(() => { btn.innerHTML = origText; btn.disabled = false; }, 3000);
    } else {
      throw new Error(data.error || "Unknown error");
    }
  } catch (err) {
    btn.innerHTML = origText;
    btn.disabled = false;
    if (err.name === "AbortError" || err.message.includes("Failed to fetch") || err.message.includes("NetworkError") || err.message.includes("Load failed")) {
      alert("Save server not running.\n\nStart it with:\n  node scripts/save-server.js");
    } else {
      alert("Save failed: " + err.message);
    }
  }
};

window.importTree = function () {
  document.getElementById("import-input").click();
};

document.getElementById("import-input").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (confirm(`Import ${Object.keys(imported).length} nodes? This will replace the current tree.`)) {
        tree = imported;
        persistTree();
        selectedId = null;
        renderNodeList();
        updateNodeIdDatalist();
        document.getElementById("editor").innerHTML = `<div class="editor-empty">Select a node from the list to edit it.</div>`;
        showToast("Tree imported successfully.");
      }
    } catch (e) {
      alert("Invalid JSON file: " + e.message);
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

// ── TEXTAREA AUTO-RESIZE ──────────────────────────────────────────────────────
function autoResizeTextarea(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function autoResizeAll() {
  document.querySelectorAll(".editor-panel .field-textarea").forEach(autoResizeTextarea);
}

// ── EDITOR AUTO-SAVE ──────────────────────────────────────────────────────────
document.querySelector(".editor-panel").addEventListener("input", e => {
  if (e.target.classList.contains("field-textarea")) autoResizeTextarea(e.target);
  if (e.target.id === "e-id") return; // ID rename handled on blur
  debounceAutoSave();
});
document.querySelector(".editor-panel").addEventListener("change", e => {
  if (e.target.id === "e-id") return;
  debounceAutoSave();
});
// ID rename on blur
document.querySelector(".editor-panel").addEventListener("blur", e => {
  if (e.target.id !== "e-id") return;
  if (!selectedId || !tree[selectedId]) return;
  const newId = e.target.value.trim();
  if (!newId || newId === selectedId) return;
  const node = tree[selectedId];
  delete tree[selectedId];
  node.id = newId;
  tree[newId] = node;
  selectedId = newId;
  renderNodeList();
  updateNodeIdDatalist();
  if (rightPanelOpen && rightTab === "preview") renderPreview();
  const el = document.getElementById("autosave-status");
  if (el) { el.textContent = "Saved"; el.style.opacity = "1"; setTimeout(() => { el.style.opacity = "0"; }, 1200); }
}, true); // capture phase so blur fires on child elements

// ── SEARCH ────────────────────────────────────────────────────────────────────
document.getElementById("search-input").addEventListener("input", e => {
  searchQuery = e.target.value;
  renderNodeList();
  highlightSearchTerm();
});

document.getElementById("filter-type").addEventListener("change", e => {
  filterType = e.target.value;
  renderNodeList();
});

document.getElementById("filter-status").addEventListener("change", e => {
  filterStatus = e.target.value;
  renderNodeList();
});

document.getElementById("filter-missing-lang").addEventListener("change", e => {
  filterMissingLang = e.target.value;
  renderNodeList();
});

// ── TOAST ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ── NODE GRAPH (Cytoscape + dagre) ───────────────────────────────────────────
let cyInstance = null;
let graphTreeVersion = 0;  // incremented when tree changes
let graphRenderedVersion = -1;  // version that cyInstance reflects

function buildGraphElements() {
  const elements = [];
  for (const [id, node] of Object.entries(tree)) {
    elements.push({
      group: "nodes",
      data: {
        id,
        label: id.length > 22 ? id.slice(0, 20) + "…" : id,
        type: node.type || "question",
        status: node.status || "live",
      },
    });
    for (const opt of node.options || []) {
      if (opt.next && tree[opt.next]) {
        elements.push({
          group: "edges",
          data: { id: `${id}__${opt.next}`, source: id, target: opt.next },
        });
      }
    }
  }
  return elements;
}

function getGraphStyles() {
  const cs = getComputedStyle(document.body);
  const borderColor = cs.getPropertyValue("--border").trim();
  const mutedColor = cs.getPropertyValue("--muted").trim();
  return [
    {
      selector: "node",
      style: {
        label: "data(label)",
        "font-size": "9px",
        "font-family": "monospace",
        "text-valign": "center",
        "text-halign": "center",
        color: "#fff",
        "text-wrap": "ellipsis",
        "text-max-width": "88px",
        width: 105,
        height: 34,
        shape: "round-rectangle",
        "border-width": 0,
        "background-color": "#3b82f6",
      },
    },
    { selector: 'node[type="question"]',   style: { "background-color": TYPE_COLORS.question } },
    { selector: 'node[type="rebuttal"]',   style: { "background-color": TYPE_COLORS.rebuttal } },
    { selector: 'node[type="dead_end"]',   style: { "background-color": TYPE_COLORS.dead_end } },
    { selector: 'node[type="conclusion"]', style: { "background-color": TYPE_COLORS.conclusion } },
    {
      selector: 'node[status="draft"]',
      style: { "border-width": 2, "border-style": "dashed", "border-color": borderColor, opacity: 0.55 },
    },
    {
      selector: "node:selected",
      style: { "border-width": 3, "border-color": "#fff", width: 115, height: 38 },
    },
    {
      selector: "edge",
      style: {
        width: 2,
        "line-color": mutedColor,
        "target-arrow-color": mutedColor,
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        "arrow-scale": 0.9,
        opacity: 0.7,
      },
    },
    {
      selector: "edge.connected",
      style: { "line-color": "#fff", "target-arrow-color": "#fff", width: 2.5, opacity: 1 },
    },
  ];
}

function renderGraph(forceRebuild) {
  const container = document.getElementById("graph-container");
  if (!container || typeof cytoscape === "undefined") return;

  // Cytoscape needs a visible container with real dimensions
  if (container.offsetWidth === 0 || container.offsetHeight === 0) {
    requestAnimationFrame(() => renderGraph(forceRebuild));
    return;
  }

  // If tree hasn't changed, just resize and fit the existing instance
  if (!forceRebuild && cyInstance && graphRenderedVersion === graphTreeVersion) {
    cyInstance.resize();
    if (selectedId) highlightGraphNode(selectedId);
    return;
  }

  // Register dagre layout (once)
  if (typeof cytoscapeDagre !== "undefined" && !cytoscape._dagreRegistered) {
    cytoscape.use(cytoscapeDagre);
    cytoscape._dagreRegistered = true;
  }

  const elements = buildGraphElements();
  if (cyInstance) { cyInstance.destroy(); cyInstance = null; }

  if (elements.length === 0) {
    container.innerHTML = '<div style="padding:24px;text-align:center;color:var(--muted);font-size:13px">No nodes in tree.</div>';
    return;
  }
  container.innerHTML = "";

  cyInstance = cytoscape({
    container,
    elements,
    style: getGraphStyles(),
    layout: {
      name: "dagre",
      rankDir: "TB",
      nodeSep: 35,
      rankSep: 55,
      edgeSep: 15,
      animate: true,
      animationDuration: 300,
    },
    minZoom: 0.1,
    maxZoom: 3,
    zoomingEnabled: true,
    userZoomingEnabled: false, // disable default wheel zoom, handle manually below
  });

  // Two-finger trackpad drag → pan, pinch (ctrlKey) → zoom
  container.addEventListener("wheel", function (e) {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      // Pinch or Cmd+scroll — zoom
      const zoom = cyInstance.zoom();
      const delta = e.deltaY > 0 ? 0.95 : 1.05;
      cyInstance.zoom({
        level: Math.min(3, Math.max(0.1, zoom * delta)),
        renderedPosition: { x: e.offsetX, y: e.offsetY },
      });
    } else {
      // Two-finger drag — pan
      cyInstance.panBy({ x: -e.deltaX, y: -e.deltaY });
    }
  }, { passive: false });

  cyInstance.on("layoutstop", function () {
    cyInstance.fit(undefined, 30);
  });

  cyInstance.on("tap", "node", function (evt) {
    const nodeId = evt.target.id();
    selectNode(nodeId);
  });

  graphRenderedVersion = graphTreeVersion;
  if (selectedId) highlightGraphNode(selectedId);
}

function highlightGraphNode(id) {
  if (!cyInstance) return;
  cyInstance.nodes().unselect();
  cyInstance.edges().removeClass("connected");
  const node = cyInstance.getElementById(id);
  if (node.length) {
    node.select();
    node.connectedEdges().addClass("connected");
    cyInstance.animate({ center: { eles: node }, duration: 200 });
  }
}

window.graphFit = function () {
  if (cyInstance) cyInstance.fit(undefined, 30);
};
window.graphZoomIn = function () {
  if (cyInstance) cyInstance.zoom({ level: cyInstance.zoom() * 1.3, renderedPosition: { x: cyInstance.width() / 2, y: cyInstance.height() / 2 } });
};
window.graphZoomOut = function () {
  if (cyInstance) cyInstance.zoom({ level: cyInstance.zoom() / 1.3, renderedPosition: { x: cyInstance.width() / 2, y: cyInstance.height() / 2 } });
};

// ── SIDEBAR RESIZE ────────────────────────────────────────────────────────────
(function () {
  const handle = document.getElementById("resize-handle");
  const sidebar = document.getElementById("sidebar");
  if (!handle || !sidebar) return;

  const STORAGE_KEY = "admin_sidebar_width";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) sidebar.style.width = saved + "px";

  let startX, startW;

  handle.addEventListener("mousedown", e => {
    startX = e.clientX;
    startW = sidebar.offsetWidth;
    handle.classList.add("dragging");
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    function onMove(e) {
      const delta = e.clientX - startX;
      const newW = Math.min(600, Math.max(160, startW + delta));
      sidebar.style.width = newW + "px";
    }

    function onUp() {
      handle.classList.remove("dragging");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      localStorage.setItem(STORAGE_KEY, sidebar.offsetWidth);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (sidebarTab === "graph" && cyInstance) { cyInstance.resize(); cyInstance.fit(undefined, 30); }
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
})();

// ── RIGHT PANEL RESIZE ───────────────────────────────────────────────────────
(function () {
  const handle = document.getElementById("right-resize-handle");
  const panel = document.getElementById("right-panel");
  if (!handle || !panel) return;

  const STORAGE_KEY = "admin_right_width";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) panel.style.width = saved + "px";

  let startX, startW;

  handle.addEventListener("mousedown", e => {
    e.preventDefault();
    startX = e.clientX;
    startW = panel.offsetWidth;
    handle.classList.add("dragging");
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    function onMove(e) {
      e.preventDefault();
      const newW = Math.min(600, Math.max(200, startW - (e.clientX - startX)));
      panel.style.width = newW + "px";
    }

    function onUp() {
      handle.classList.remove("dragging");
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      localStorage.setItem(STORAGE_KEY, panel.offsetWidth);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
})();

// ── DARK MODE ─────────────────────────────────────────────────────────────────
let adminDark = localStorage.getItem("admin_dark") === "1";

function applyDark() {
  document.body.classList.toggle("dark", adminDark);
  if (cyInstance && sidebarTab === "graph") cyInstance.style(getGraphStyles());
  document.getElementById("dark-icon").innerHTML = adminDark
    ? `<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`
    : `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
}

window.toggleDark = function () {
  adminDark = !adminDark;
  localStorage.setItem("admin_dark", adminDark ? "1" : "0");
  applyDark();
};

applyDark();

// ── KICK OFF ──────────────────────────────────────────────────────────────────
checkAuth();
