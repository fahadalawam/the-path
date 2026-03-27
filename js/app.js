import { TREE } from "./tree/index.js";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const FORMSPREE_ID = "mdapnwgd";

const TOPICS = {
  en: [
    "Does the universe have a Creator?",
    "Is that Creator one or many?",
    "Did the Creator communicate with us?",
    "Who is Muhammad \uFDFA and why does it matter?",
    "Is the Quran preserved and authentic?",
    "What is the purpose of life?",
  ],
  ar: [
    "هل للكون خالق؟",
    "هل ذلك الخالق واحد أم متعدد؟",
    "هل تواصل الخالق معنا؟",
    "من هو محمد \uFDFA ولماذا يهمّ أمره؟",
    "هل القرآن محفوظ وأصيل؟",
    "ما هو الغرض من الحياة؟",
  ],
};

// Static UI strings
const UI = {
  en: {
    eyebrow: "A journey of reason",
    tagline: "A rational, evidence-based journey through the biggest questions a human being can ask — starting from the universe itself, and following the logic wherever it leads.",
    topicsLabel: "What you will explore",
    finePrint: "No account needed. No pressure. You can go back at any step.\nIf your view is not represented, you can always reach us directly.",
    beginBtn: "Begin the journey",
    back: "Back",
    noneOfThese: "None of these represent my view",
    questionTag: "Question",
    rebuttalTag: "Let's look at this together",
    deadEndTag: "Continue the conversation",
    conclusionTag: "You've reached the end of this path",
    nextSteps: "Next steps",
    restartBtn: "Start the journey again",
    seeEvidence: "See what the evidence says",
    hideEvidence: "Hide evidence",
    readMore: "Read more ▼",
    showLess: "Show less ▲",
    pathTitle: "Your journey so far",
    stoppedAt: "Stopped at",
    nameLabel: "Your name",
    namePlaceholder: "Name",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    messageLabel: "Your question or message",
    messagePlaceholder: "Write your question here...",
    sendBtn: "Send message \u2709",
    sending: "Sending...",
    sent: "\u2713 Message sent. We'll be in touch soon.",
    formErr: "Please enter your name and email.",
    submitFailed: "Submission failed. Please try again.",
    networkErr: "Network error. Please try again.",
  },
  ar: {
    eyebrow: "رحلة في العقل",
    tagline: "رحلة عقلانية قائمة على الأدلة عبر أكبر الأسئلة التي يمكن للإنسان أن يطرحها — تبدأ من الكون نفسه، وتتبع المنطق أينما قاد.",
    topicsLabel: "ما ستستكشفه",
    finePrint: "لا حاجة إلى حساب. لا ضغط. يمكنك العودة في أي خطوة.\nإن لم يكن رأيك ممثلًا، يمكنك التواصل معنا مباشرة في أي وقت.",
    beginBtn: "ابدأ الرحلة",
    back: "رجوع",
    noneOfThese: "لا يمثّل أيٌّ من هذه الخيارات وجهة نظري",
    questionTag: "سؤال",
    rebuttalTag: "دعنا ننظر في هذا معًا",
    deadEndTag: "واصل الحوار",
    conclusionTag: "لقد وصلت إلى نهاية هذا المسار",
    nextSteps: "الخطوات التالية",
    restartBtn: "ابدأ الرحلة من جديد",
    seeEvidence: "اطّلع على ما تقوله الأدلة",
    hideEvidence: "إخفاء الأدلة",
    readMore: "اقرأ المزيد ▼",
    showLess: "أظهر أقل ▲",
    pathTitle: "مسيرتك حتى الآن",
    stoppedAt: "توقّف عند",
    nameLabel: "اسمك",
    namePlaceholder: "الاسم",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "example@mail.com",
    messageLabel: "سؤالك أو رسالتك",
    messagePlaceholder: "اكتب سؤالك هنا...",
    sendBtn: "أرسل الرسالة \u2709",
    sending: "جارٍ الإرسال...",
    sent: "\u2713 تم إرسال الرسالة. سنتواصل معك قريبًا.",
    formErr: "الرجاء إدخال اسمك وبريدك الإلكتروني.",
    submitFailed: "فشل الإرسال. حاول مرة أخرى.",
    networkErr: "خطأ في الشبكة. حاول مرة أخرى.",
  },
};

// ── STATE ─────────────────────────────────────────────────────────────────────
let lang = "en";
let nodeId = "start";
let history = [];
let pathLog = [];
let dark = localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
let sent = false;
let expandedEvidence = false;
let expandedRM = {};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function nodeContent(node) {
  return node.content?.[lang] || node.content?.en || {};
}

/** Resolve a multilingual string or plain string */
function loc(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || "";
}

/** Get UI string */
function ui(key) {
  return UI[lang]?.[key] ?? UI.en[key] ?? "";
}

// ── LANGUAGE SWITCH ───────────────────────────────────────────────────────────
function setLang(newLang) {
  lang = newLang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // Update lang button
  const btn = document.getElementById("lang-btn");
  if (btn) btn.textContent = lang === "ar" ? "EN" : "AR";

  // Re-render landing topics if visible
  const landingVisible = document.getElementById("landing").style.display !== "none";
  if (landingVisible) renderLanding();

  // Re-render journey if visible
  const journeyVisible = document.getElementById("journey").style.display !== "none";
  if (journeyVisible) renderNode();
}
window._setLang = setLang;

// ── RENDER LANDING ────────────────────────────────────────────────────────────
function renderLanding() {
  document.querySelector(".eyebrow").textContent = ui("eyebrow");
  document.querySelector(".tagline").textContent = ui("tagline");
  document.querySelector(".topics-label").textContent = ui("topicsLabel");
  document.querySelector(".fine-print").innerHTML = ui("finePrint").replace("\n", "<br>");
  document.getElementById("start-btn").textContent = ui("beginBtn");

  const list = document.getElementById("topics-list");
  list.innerHTML = "";
  (TOPICS[lang] || TOPICS.en).forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="arrow">→</span><span>${t}</span>`;
    list.appendChild(li);
  });
}

// ── PREVIEW MODE ──────────────────────────────────────────────────────────────
(function checkPreviewMode() {
  const params = new URLSearchParams(location.search);
  const previewId = params.get("preview");
  const previewLang = params.get("lang");
  if (!previewId) return;

  // Set language if specified
  if (previewLang && (previewLang === "en" || previewLang === "ar")) {
    lang = previewLang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    const btn = document.getElementById("lang-btn");
    if (btn) btn.textContent = lang === "ar" ? "EN" : "AR";
  }

  // Jump directly to the node
  nodeId = previewId;
  document.getElementById("landing").style.display = "none";
  document.getElementById("journey").style.display = "block";

  // Insert preview banner
  const banner = document.createElement("div");
  banner.id = "preview-banner";
  banner.style.cssText = "background:#854d0e;color:#fef9c3;text-align:center;font-size:12px;padding:6px 12px;letter-spacing:.05em;";
  banner.textContent = `PREVIEW — node: ${previewId}`;
  document.getElementById("header").insertAdjacentElement("afterend", banner);

  renderNode();
  updateProgress();
})();

// ── INIT ──────────────────────────────────────────────────────────────────────
renderLanding();

// ── RESTORE FROM URL ──────────────────────────────────────────────────────────
(function restoreFromUrl() {
  const params = new URLSearchParams(location.search);
  const pathParam = params.get("path");
  const langParam = params.get("lang");
  if (!pathParam) return;

  const nodes = pathParam.split(",").filter(id => TREE[id]);
  if (!nodes.length) return;

  if (langParam === "ar") {
    lang = "ar";
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    const btn = document.getElementById("lang-btn");
    if (btn) btn.textContent = "EN";
  }

  nodeId = nodes[nodes.length - 1];
  history = nodes.slice(0, -1);

  document.getElementById("landing").style.display = "none";
  document.getElementById("journey").style.display = "block";
  document.getElementById("share-btn").classList.remove("hidden");
  renderNode();
  updateProgress();
})();

document.getElementById("start-btn").addEventListener("click", () => {
  const landing = document.getElementById("landing");
  landing.style.opacity = "0";
  landing.style.transition = "opacity 0.5s";
  setTimeout(() => {
    landing.style.display = "none";
    document.getElementById("journey").style.display = "block";
    renderNode();
  }, 500);
});

document.getElementById("logo").addEventListener("click", () => {
  document.getElementById("journey").style.display = "none";
  const landing = document.getElementById("landing");
  landing.style.display = "block";
  landing.style.opacity = "0";
  setTimeout(() => { landing.style.opacity = "1"; landing.style.transition = "opacity 0.5s"; }, 10);
  nodeId = "start"; history = []; pathLog = []; sent = false;
  renderLanding();
  updateProgress();
  clearUrl();
});

document.getElementById("back-btn").addEventListener("click", () => {
  if (!history.length) return;
  nodeId = history.pop();
  pathLog.pop();
  expandedEvidence = false; expandedRM = {};
  renderNode(); updateProgress(); updateUrl();
});


const SVG_MOON = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const SVG_SUN  = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function applyTheme() {
  document.body.classList.toggle("dark", dark);
  document.getElementById("dark-btn").innerHTML = dark ? SVG_SUN : SVG_MOON;
}

applyTheme();

document.getElementById("dark-btn").addEventListener("click", () => {
  dark = !dark;
  localStorage.setItem("theme", dark ? "dark" : "light");
  applyTheme();
});


// ── PROGRESS ──────────────────────────────────────────────────────────────────
function updateProgress() {
  const pct = Math.min(100, Math.round((history.length / 12) * 100));
  document.getElementById("progress-bar").style.width = pct + "%";
  const backBtn = document.getElementById("back-btn");
  backBtn.classList.toggle("hidden", history.length === 0);
  backBtn.querySelector(".back-label").textContent = ui("back");
}

// ── URL / SHARING ─────────────────────────────────────────────────────────────
function updateUrl() {
  const path = [...history, nodeId].join(",");
  const params = new URLSearchParams({ path });
  if (lang === "ar") params.set("lang", "ar");
  window.history.replaceState(null, "", "?" + params.toString());
  document.getElementById("share-btn").classList.remove("hidden");
}

function clearUrl() {
  window.history.replaceState(null, "", location.pathname);
  document.getElementById("share-btn").classList.add("hidden");
}

document.getElementById("share-btn").addEventListener("click", () => {
  navigator.clipboard.writeText(location.href).then(() => {
    const btn = document.getElementById("share-btn");
    const original = btn.innerHTML;
    btn.innerHTML = `<span style="font-size:11px;letter-spacing:.02em">Copied ✓</span>`;
    setTimeout(() => { btn.innerHTML = original; }, 2000);
  });
});

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function navigate(nextId, label) {
  history.push(nodeId);
  const c = nodeContent(TREE[nodeId]);
  pathLog.push({
    nodeId,
    question: c.question || c.message || nodeId,
    chosenOption: label || "—",
  });
  nodeId = nextId;
  expandedEvidence = false; expandedRM = {};
  sent = false;
  window.speechSynthesis?.cancel();
  renderNode(); updateProgress(); updateUrl();
}
window._navigate = navigate;

function restartJourney() {
  nodeId = "start"; history = []; pathLog = []; sent = false;
  expandedEvidence = false; expandedRM = {};
  updateProgress(); renderNode(); clearUrl();
}
window._restartJourney = restartJourney;

// ── EVIDENCE TOGGLE ───────────────────────────────────────────────────────────
function toggleEvidence() {
  expandedEvidence = !expandedEvidence;
  const box = document.getElementById("evid-box");
  const label = document.getElementById("evid-label");
  box.classList.toggle("hidden", !expandedEvidence);
  if (label) label.textContent = expandedEvidence ? ui("hideEvidence") : ui("seeEvidence");
}
window._toggleEvidence = toggleEvidence;

function toggleRM(id) {
  expandedRM[id] = !expandedRM[id];
  const el = document.getElementById("rm_" + id);
  const btn = el.previousElementSibling;
  if (expandedRM[id]) { el.className = "rm-text"; btn.textContent = ui("showLess"); }
  else { el.className = "hidden"; btn.textContent = ui("readMore"); }
}
window._toggleRM = toggleRM;

// ── RENDER HELPERS ────────────────────────────────────────────────────────────
function renderBlocks(blocks) {
  return (blocks || []).map(b => {
    if (b.type === "text") {
      return `<p class="evid-txt">${loc(b.content)}</p>`;
    }
    if (b.type === "link") {
      return `<a class="chip" href="${b.url}" target="_blank" rel="noopener noreferrer">${b.linkType === "video" ? "▶" : "📄"} ${loc(b.label)} ↗</a>`;
    }
    if (b.type === "quote") {
      return `<blockquote class="evid-txt" style="border-left:3px solid var(--accent);padding-left:12px;font-style:italic">${loc(b.content)}${b.source ? `<cite style="display:block;font-size:11px;margin-top:4px;font-style:normal">— ${loc(b.source)}</cite>` : ""}</blockquote>`;
    }
    if (b.type === "image") {
      return `<figure style="margin:8px 0"><img src="${b.url}" alt="${loc(b.caption) || ""}" style="width:100%;border-radius:6px">${b.caption ? `<figcaption style="font-size:11px;color:var(--muted);margin-top:4px">${loc(b.caption)}</figcaption>` : ""}</figure>`;
    }
    return "";
  }).join("");
}

function renderPoints(points) {
  return (points || []).map(pt => {
    const rmText = loc(pt.readMore);
    const isOpen = expandedRM[pt.id];
    return `<div class="evid-pt">
      ${renderBlocks(pt.blocks)}
      ${rmText ? `<button class="rm-btn" onclick="_toggleRM('${pt.id}')">${isOpen ? ui("showLess") : ui("readMore")}</button>
      <div id="rm_${pt.id}" class="${isOpen ? "rm-text" : "hidden"}">${rmText}</div>` : ""}
    </div>`;
  }).join("");
}

function buildPathSummary() {
  if (!pathLog.length) return "";
  const steps = pathLog.map((s, i) => `
    <div class="path-step">
      <span class="path-num">${i + 1}.</span>
      <div><p class="path-q">${s.question}</p><p class="path-a">→ "${s.chosenOption}"</p></div>
    </div>`).join("");
  return `<div class="path-box">
    <p class="path-ttl">${ui("pathTitle")}</p>
    ${steps}
    <div class="path-stopped">${ui("stoppedAt")}: <code>${nodeId}</code></div>
  </div>`;
}

function buildContactForm() {
  if (sent) return `<div class="sent-msg">${ui("sent")}</div>`;
  return `
    <label class="form-lbl">${ui("nameLabel")}</label>
    <input class="form-inp" id="f-name" placeholder="${ui("namePlaceholder")}" />
    <label class="form-lbl">${ui("emailLabel")}</label>
    <input class="form-inp" id="f-email" type="email" placeholder="${ui("emailPlaceholder")}" />
    <label class="form-lbl">${ui("messageLabel")}</label>
    <textarea class="form-inp" id="f-msg" placeholder="${ui("messagePlaceholder")}"></textarea>
    <p id="f-err" class="form-err hidden"></p>
    <button class="next-btn" id="f-submit" onclick="_submitForm()">${ui("sendBtn")}</button>`;
}

async function submitForm() {
  const name = document.getElementById("f-name")?.value || "";
  const email = document.getElementById("f-email")?.value || "";
  const message = document.getElementById("f-msg")?.value || "";
  const err = document.getElementById("f-err");
  if (!name || !email) {
    err.textContent = ui("formErr");
    err.classList.remove("hidden");
    return;
  }
  const btn = document.getElementById("f-submit");
  btn.textContent = ui("sending"); btn.disabled = true;
  const journey = pathLog.map((s, i) => `${i + 1}. ${s.question}\n   → "${s.chosenOption}"`).join("\n") + `\n\nStopped at: ${nodeId}`;
  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name, email, message, journey }),
    });
    if (res.ok) { sent = true; renderNode(); }
    else {
      err.textContent = ui("submitFailed");
      err.classList.remove("hidden");
      btn.textContent = ui("sendBtn"); btn.disabled = false;
    }
  } catch {
    err.textContent = ui("networkErr");
    err.classList.remove("hidden");
    btn.textContent = ui("sendBtn"); btn.disabled = false;
  }
}
window._submitForm = submitForm;

// ── RENDER NODE ───────────────────────────────────────────────────────────────
function renderNode() {
  const node = TREE[nodeId];
  if (!node) return;
  const c = nodeContent(node);
  const el = document.getElementById("node-content");
  el.className = "anim";
  void el.offsetWidth;

  let html = "";

  if (node.type === "question") {
    const evidHtml = node.evidence ? `
      <button class="evid-toggle" onclick="_toggleEvidence()">
        <span style="color:#16a34a">●</span>
        <span id="evid-label">${expandedEvidence ? ui("hideEvidence") : ui("seeEvidence")}</span>
        <span style="margin-left:auto">▼</span>
      </button>
      <div id="evid-box" class="evid-box${expandedEvidence ? "" : " hidden"}">
        <p class="evid-title">${loc(node.evidence.title)}</p>
        ${renderPoints(node.evidence.points)}
      </div>` : "";

    const optsHtml = (node.options || []).filter(opt => {
      const target = TREE[opt.next];
      return !target || target.status !== "draft";
    }).map(opt =>
      `<button class="opt-btn" onclick="_navigate('${opt.next}', ${JSON.stringify(loc(opt.label)).replace(/"/g, '&quot;')})">
        ${loc(opt.label)}
      </button>`
    ).join("");

    html = `
      <p class="node-tag">${ui("questionTag")}</p>
      <h1 class="node-q">${c.question || ""}</h1>
      ${c.subtitle ? `<p class="node-sub">${c.subtitle}</p>` : ""}
      ${evidHtml}
      <div class="opts">${optsHtml}</div>
      <button class="none-btn" onclick="_navigate('none_of_these', ${JSON.stringify(ui("noneOfThese")).replace(/"/g, '&quot;')})">${ui("noneOfThese")}</button>`;
  }

  else if (node.type === "rebuttal") {
    const optsHtml = (node.options || []).map(opt =>
      `<button class="next-btn" onclick="_navigate('${opt.next}', ${JSON.stringify(loc(opt.label)).replace(/"/g, '&quot;')})">
        ${loc(opt.label)}
      </button>`
    ).join("");
    html = `
      <p class="node-tag">${ui("rebuttalTag")}</p>
      <h2 class="node-q" style="font-size:clamp(1.1rem,3.5vw,1.5rem)">${c.question || ""}</h2>
      ${node.evidence ? `<div class="evid-box"><p class="evid-title">${loc(node.evidence.title)}</p>${renderPoints(node.evidence.points)}</div>` : ""}
      ${optsHtml}`;
  }

  else if (node.type === "dead_end") {
    html = `
      <div class="dead-box">
        <p class="node-tag" style="text-align:center">${ui("deadEndTag")}</p>
        <p class="dead-txt">${c.message || ""}</p>
        ${buildContactForm()}
      </div>`;
  }

  else if (node.type === "conclusion") {
    const stepsHtml = (node.steps || []).map(st =>
      `<a class="step-link" href="${st.url}" target="_blank" rel="noopener noreferrer">
        ${st.type === "video" ? "▶" : "📄"} ${loc(st.label)} <span style="margin-left:auto">↗</span>
      </a>`
    ).join("");
    html = `
      <p class="node-tag">${ui("conclusionTag")}</p>
      <h1 class="conc-h">${c.question || ""}</h1>
      <p class="conc-msg">${c.subtitle || ""}</p>
      ${stepsHtml.length ? `<p class="steps-ttl">${ui("nextSteps")}</p>${stepsHtml}` : ""}
      ${node.showContact ? `<div style="margin-top:18px">${buildContactForm()}</div>` : ""}
      <button class="restart-btn" onclick="_restartJourney()">${ui("restartBtn")}</button>`;
  }

  el.innerHTML = html;
}

// ── KICK OFF ──────────────────────────────────────────────────────────────────
updateProgress();
