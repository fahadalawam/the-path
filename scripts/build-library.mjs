#!/usr/bin/env node

/**
 * build-library.mjs
 *
 * Generates the question library as plain static HTML from js/topics.js and
 * the content tree in js/tree/:
 *
 *   index.html              English home (the sentence and every question)
 *   ar/index.html           Arabic home
 *   q/<slug>/index.html     English question pages
 *   ar/q/<slug>/index.html  Arabic question pages
 *
 * The pages use css/site.css and js/site.js. journey.html and admin.html are
 * separate and keep using css/style.css.
 *
 * It also checks the tree (broken links, unknown topic nodes) and exits with
 * an error if anything is wrong, so the deploy workflow fails instead of
 * publishing a broken site.
 *
 * Usage:
 *   node scripts/build-library.mjs                  write into the repo
 *   node scripts/build-library.mjs --out <dir>      write somewhere else
 *   node scripts/build-library.mjs --explicit-index link to .../index.html
 *                                                   (for hosts without
 *                                                   directory indexes)
 */

import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import { resolve, dirname, join } from "path";
import { fileURLToPath } from "url";
import { TREE } from "../js/tree/index.js";
import { SECTIONS, TOPICS } from "../js/topics.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const args = process.argv.slice(2);
const OUT = args.includes("--out") ? resolve(args[args.indexOf("--out") + 1]) : ROOT;
const EXPLICIT_INDEX = args.includes("--explicit-index");
const FORMSPREE_ID = "mdapnwgd";
const LANGS = ["en", "ar"];

// The first question picked from the reader's sentence (mirrored in js/site.js).
const FIRST_TOPICS = ["muhammad", "quran-preserved", "one-god", "cause", "beginning", "reality", "revelation"];

// ── UI STRINGS ────────────────────────────────────────────────────────────────
// Plain text unless the key ends in "Html" (authored markup, inserted as is).
const UI = {
  en: {
    siteName: "The Only True Religion",
    wordmarkHtml: 'The Only True Religion<small lang="ar">الدين الحق</small>',
    footNameHtml: 'The Only True Religion <span lang="ar">· الدين الحق</span>',
    nav: "Main",
    allQuestions: "All questions",
    journey: "Guided journey",
    switchLang: "العربية",
    switchLangLabel: "اقرأ هذه الصفحة بالعربية",
    darkLabel: "Toggle dark mode",
    description: "Islam is the truth. Check it yourself: eleven questions in order, each with a short answer and the evidence behind it.",
    // Question pages
    qOf: (i, n) => `Question ${i} of ${n}`,
    shortAns: "Short answer",
    evidence: "The evidence",
    objH: "Objections",
    objSub: "What people say against this, and our answer. Open one to read it.",
    youSay: "You might say",
    ourAns: "Our answer",
    readMore: "Read more",
    next: "Next question",
    last: "That’s the last question so far.",
    lastLink: "Back to all questions",
    whereNext: "Where to go from here",
    talk: "Talk to us",
    kinds: { article: "Article", video: "Video", study: "Study", book: "Book", source: "Source" },
    newTab: "(opens in a new tab)",
    source: "Source",
    quotes: ["“", "”"],
    // Objection form
    oH: "Think we’re wrong? Tell us where.",
    oSub: "We read every objection. The strongest ones become new pages on this site.",
    oMsg: "Your objection",
    oPh: "The strongest reason I don’t accept this is…",
    oName: "Your name",
    oEmail: "Email, so we can reply",
    oSend: "Send your objection",
    sending: "Sending…",
    sent: "Thank you. Your objection reached us, and a person will read it.",
    formErr: "Please write your objection and your email.",
    submitFailed: "That didn’t send. Please try again.",
    footer: "No account, no tracking. Corrections are always welcome.",
  },
  ar: {
    siteName: "الدين الحق",
    wordmarkHtml: 'الدين الحق<small lang="en">The Only True Religion</small>',
    footNameHtml: 'الدين الحق <span lang="en">· The Only True Religion</span>',
    nav: "القائمة الرئيسية",
    allQuestions: "كل الأسئلة",
    journey: "الرحلة الموجَّهة",
    switchLang: "English",
    switchLangLabel: "Read this page in English",
    darkLabel: "تبديل الوضع الليلي",
    description: "الإسلام هو الحق. تحقّق بنفسك: أحد عشر سؤالًا بالترتيب، لكل منها جواب مختصر والدليل عليه.",
    qOf: (i, n) => `السؤال ${i} من ${n}`,
    shortAns: "الجواب المختصر",
    evidence: "الأدلة",
    objH: "اعتراضات",
    objSub: "ما يقوله الناس اعتراضًا على هذا، وردّنا عليه. افتح أيًّا منها لتقرأه.",
    youSay: "قد تقول",
    ourAns: "ردّنا",
    readMore: "اقرأ المزيد",
    next: "السؤال التالي",
    last: "هذا آخر سؤال حتى الآن.",
    lastLink: "عُد إلى كل الأسئلة",
    whereNext: "إلى أين بعد ذلك؟",
    talk: "تحدّث إلينا",
    kinds: { article: "مقال", video: "فيديو", study: "دراسة", book: "كتاب", source: "المصدر" },
    newTab: "(يفتح في نافذة جديدة)",
    source: "المصدر",
    quotes: ["«", "»"],
    oH: "ترى أننا مخطئون؟ أخبرنا أين.",
    oSub: "نقرأ كل اعتراض، وأقوى الاعتراضات تصبح صفحات جديدة في هذا الموقع.",
    oMsg: "اعتراضك",
    oPh: "أقوى سبب يجعلني لا أقبل هذا هو…",
    oName: "اسمك",
    oEmail: "بريدك الإلكتروني، لنردّ عليك",
    oSend: "أرسل اعتراضك",
    sending: "جارٍ الإرسال…",
    sent: "شكرًا لك. وصلنا اعتراضك، وسيقرؤه شخص حقيقي.",
    formErr: "الرجاء كتابة اعتراضك وبريدك الإلكتروني.",
    submitFailed: "لم يُرسَل. حاول مرة أخرى.",
    footer: "لا حساب، ولا تتبّع. نرحّب دائمًا بالتصويبات.",
  },
};

// Home page copy. Under the sentence: Pew's finding, quoted from PEW_URL
// (section "Religious 'switching'"), then a reply that changes with the
// reader's choices (js/site.js).
const PEW_URL = "https://www.pewresearch.org/religion/2025/06/09/how-the-global-religious-landscape-changed-from-2010-to-2020/";
const HOME = {
  en: {
    h1Html: "Islam is the truth. <span>Check it yourself.</span>",
    lead: (n) => `${n} questions, in order. Each one has a short answer and the evidence behind it.`,
    s1: "I was raised", comma: ",", s2: "and today I",
    raisedL: "How you were raised", todayL: "What you believe today",
    raised: [["christian", "Christian"], ["muslim", "Muslim"], ["jewish", "Jewish"], ["hindu", "Hindu"], ["buddhist", "Buddhist"], ["other", "in another faith"], ["none", "with no religion"]],
    today: [["keep", "still believe it"], ["doubt", "have doubts"], ["nogod", "believe in no God"], ["unsure", "am not sure"]],
    hint: "Change the blue words until the sentence is true for you.",
    fact: "“Most people around the world still identify with the religion in which they were raised.”",
    ctx: "Did you choose yours, or inherit it?",
    pew: "Pew Research Center, 2025",
    firstL: "Start here",
    qH: (n) => `The ${n} questions`,
    qSub: "Read them in order. Each one builds on the one before.",
  },
  ar: {
    h1Html: "الإسلام هو الحق. <span>تحقّق بنفسك.</span>",
    lead: (n) => `${n} سؤالًا بالترتيب، لكل منها جواب مختصر والدليل عليه.`,
    s1: "نشأتُ", comma: "،", s2: "واليوم",
    raisedL: "كيف نشأت", todayL: "بماذا تؤمن اليوم",
    raised: [["christian", "مسيحيًا"], ["muslim", "مسلمًا"], ["jewish", "يهوديًا"], ["hindu", "هندوسيًا"], ["buddhist", "بوذيًا"], ["other", "على دين آخر"], ["none", "بلا دين"]],
    today: [["keep", "ما زلتُ مؤمنًا به"], ["doubt", "تساورني شكوك"], ["nogod", "لا أؤمن بوجود إله"], ["unsure", "لستُ متأكدًا"]],
    hint: "غيّر الكلمات الزرقاء حتى تصبح الجملة صادقة عنك.",
    fact: "«ما زال معظم الناس حول العالم ينتمون إلى الدين الذي نشؤوا عليه».",
    ctx: "فهل اخترت دينك، أم ورثته؟",
    pew: "مركز بيو للأبحاث، 2025",
    firstL: "ابدأ من هنا",
    qH: (n) => `الأسئلة الـ${n}`,
    qSub: "اقرأها بالترتيب، فكل سؤال يبني على ما قبله.",
  },
};

// ── VALIDATION ────────────────────────────────────────────────────────────────
const problems = [];
for (const [id, node] of Object.entries(TREE)) {
  for (const opt of node.options || []) {
    if (!TREE[opt.next]) problems.push(`${id}: option points to missing node "${opt.next}"`);
  }
}
const sectionTopics = SECTIONS.flatMap((s) => s.topics);
for (const slug of sectionTopics) {
  if (!TOPICS[slug]) problems.push(`section lists unknown topic "${slug}"`);
}
for (const slug of Object.keys(TOPICS)) {
  if (!sectionTopics.includes(slug)) problems.push(`topic "${slug}" is not in any section`);
}
for (const [slug, t] of Object.entries(TOPICS)) {
  for (const id of [...t.main, ...t.objections, t.contactNode, t.stepsFrom].filter(Boolean)) {
    if (!TREE[id]) problems.push(`topic "${slug}" uses missing node "${id}"`);
  }
}
for (const [slug, t] of Object.entries(TOPICS)) {
  for (const lang of LANGS) if (!t.answer?.[lang]) problems.push(`topic "${slug}" has no ${lang} answer`);
  for (const src of t.sources || []) if (!/^https:\/\//.test(src.url || "")) problems.push(`topic "${slug}" has a source without an https link`);
}
for (const slug of FIRST_TOPICS) {
  if (!TOPICS[slug]) problems.push(`the home page links to unknown topic "${slug}"`);
}
if (problems.length) {
  console.error("Library build failed:\n  " + problems.join("\n  "));
  process.exit(1);
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Escaped text with ﷺ set in the Arabic face, so it never falls back to a
// Latin font's tiny glyph.
const fmt = (s) => esc(s).replace(/\uFDFA/g, '<span class="saw">\uFDFA</span>');

function loc(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || "";
}

const isLive = (id) => TREE[id] && TREE[id].status !== "draft";
const content = (id, lang) => TREE[id].content?.[lang] || TREE[id].content?.en || {};
const isArabic = (s) => /[\u0600-\u06FF]/.test(s) && !/[A-Za-z]{4}/.test(s);
// Paragraphs split on blank lines. An all-Arabic paragraph inside an English
// page (or any quote) is set right-to-left in the scripture face.
const paras = (text, lang, quote = false) =>
  String(text ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p) =>
    isArabic(p) && (quote || lang === "en")
      ? `<p class="q-ar" lang="ar" dir="rtl">${fmt(p).replace(/\n/g, "<br>")}</p>`
      : `<p>${fmt(p).replace(/\n/g, "<br>")}</p>`
  ).join("");
const norm = (s) => String(s).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const arrow = '<span class="arr" aria-hidden="true">→</span>';
const svgArrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

// The answer button that leads to each node in the journey, used to state
// each objection in the reader's own words.
const incomingLabel = {};
for (const [id, node] of Object.entries(TREE)) {
  if (!isLive(id)) continue;
  for (const opt of node.options || []) {
    if (!incomingLabel[opt.next]) incomingLabel[opt.next] = opt.label;
  }
}

// Relative path from a page to the site root.
function rootFrom(lang, slug) {
  const depth = (lang === "ar" ? 1 : 0) + (slug ? 2 : 0);
  return "../".repeat(depth);
}
function pageHref(root, lang, slug) {
  const path = (lang === "ar" ? "ar/" : "") + (slug ? `q/${slug}/` : "");
  const href = root + path;
  if (EXPLICIT_INDEX) return href + "index.html";
  return href || "./";
}

const order = SECTIONS.flatMap((s) => s.topics);

// ── SHARED PARTS ──────────────────────────────────────────────────────────────
function linkChip(b, lang) {
  const u = UI[lang];
  return `<a class="src-link" href="${esc(b.url)}" target="_blank" rel="noopener noreferrer"><span class="k">${esc(u.kinds[b.linkType] || u.kinds.article)}</span><span>${fmt(loc(b.label, lang))}</span><span class="ext" aria-hidden="true">↗</span><span class="sr">${esc(u.newTab)}</span></a>`;
}

function renderPoint(pt, lang) {
  let h = "";
  let links = [];
  const flush = () => { if (links.length) { h += `<div class="links">${links.join("")}</div>`; links = []; } };
  for (const b of pt.blocks || []) {
    if (b.type === "link" && b.url) { links.push(linkChip(b, lang)); continue; }
    flush();
    if (b.type === "text") h += paras(loc(b.content, lang), lang);
    else if (b.type === "quote") {
      const src = loc(b.source, lang);
      h += `<blockquote>${paras(loc(b.content, lang), lang, true)}${src ? `<cite>${fmt(src)}</cite>` : ""}</blockquote>`;
    } else if (b.type === "image" && b.url) {
      const cap = loc(b.caption, lang);
      h += `<figure><img src="${esc(b.url)}" alt="${esc(cap)}" loading="lazy">${cap ? `<figcaption>${fmt(cap)}</figcaption>` : ""}</figure>`;
    }
  }
  flush();
  const more = loc(pt.readMore, lang);
  if (more) h += `<details class="more"><summary>${esc(UI[lang].readMore)}</summary>${paras(more, lang)}</details>`;
  return `<div class="pt">${h}</div>`;
}

function renderEvidence(node, lang) {
  const points = node.evidence?.points || [];
  if (!points.length) return "";
  const title = loc(node.evidence.title, lang);
  return `<div class="ev">${title ? `<p class="ev-t">${fmt(title)}</p>` : ""}${points.map((pt) => renderPoint(pt, lang)).join("")}</div>`;
}

function askSection(lang, topic) {
  const u = UI[lang];
  return `<section class="sec" id="ask" aria-labelledby="o-h">
    <div class="wrap obj">
      <div>
        <h2 id="o-h">${esc(u.oH)}</h2>
        <p class="sub">${esc(u.oSub)}</p>
      </div>
      <form class="ask-form" action="https://formspree.io/f/${FORMSPREE_ID}" method="POST" novalidate
        data-sending="${esc(u.sending)}" data-sent="${esc(u.sent)}" data-err="${esc(u.formErr)}" data-failed="${esc(u.submitFailed)}">
        <input type="hidden" name="topic" value="${esc(topic)}">
        <input type="hidden" name="language" value="${lang}">
        <div><label for="o-msg">${esc(u.oMsg)}</label><textarea id="o-msg" name="message" required placeholder="${esc(u.oPh)}"></textarea></div>
        <div class="two">
          <div><label for="o-name">${esc(u.oName)}</label><input id="o-name" name="name" autocomplete="name"></div>
          <div><label for="o-email">${esc(u.oEmail)}</label><input id="o-email" name="email" type="email" autocomplete="email" dir="auto" required></div>
        </div>
        <button class="btn" type="submit">${esc(u.oSend)}</button>
        <p class="sent" aria-live="polite"></p>
      </form>
    </div>
  </section>`;
}

function layout({ lang, slug, title, description, body }) {
  const u = UI[lang];
  const root = rootFrom(lang, slug);
  const other = lang === "en" ? "ar" : "en";
  const home = pageHref(root, lang, "");
  const pageTitle = slug ? `${title} · ${u.siteName}` : `${u.siteName}`;
  const fonts = "family=Schibsted+Grotesk:wght@400..800&family=Amiri:wght@400;700&family=Reem+Kufi:wght@600" +
    (lang === "ar" ? "&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@600..800" : "");
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-library.mjs from js/topics.js and js/tree/. Do not edit by hand. -->
<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="alternate" hreflang="${other}" href="${pageHref(root, other, slug)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap">
<link rel="stylesheet" href="${root}css/site.css">
<script>document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script>
</head>
<body>
<header class="top">
  <div class="wrap">
    <a class="brand" href="${home}">
      <span class="seal" lang="ar" aria-hidden="true">حق</span>
      <span class="wm">${u.wordmarkHtml}</span>
    </a>
    <nav aria-label="${esc(u.nav)}">
      <a class="nav-wide" href="${slug ? home : ""}#questions">${esc(u.allQuestions)}</a>
      <a class="langbtn" href="${pageHref(root, other, slug)}" hreflang="${other}" lang="${other}" aria-label="${esc(u.switchLangLabel)}">${esc(u.switchLang)}</a>
      <button class="themebtn" id="dark-btn" type="button" aria-label="${esc(u.darkLabel)}"></button>
    </nav>
  </div>
</header>

<main id="top">
${body}
${askSection(lang, slug || "home")}
</main>

<footer>
  <div class="wrap foot">
    <p class="fname">${u.footNameHtml}</p>
    <p class="fnote">${esc(u.footer)}</p>
    <p class="fnote"><a href="${root}journey.html${lang === "ar" ? "?lang=ar" : ""}">${esc(u.journey)}</a></p>
  </div>
</footer>
<script src="${root}js/site.js"></script>
</body>
</html>
`;
}

// The sources behind a topic's short answer, as small links after it.
function cites(t, lang) {
  const u = UI[lang];
  return (t.sources || []).map((s) =>
    `<a class="cite" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${fmt(loc(s.label, lang))}<span class="sr"> ${esc(u.newTab)}</span></a>`
  ).join(" ");
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function homePage(lang) {
  const u = UI[lang];
  const h = HOME[lang];
  const root = rootFrom(lang, "");
  const topicTitle = (slug) => loc(TOPICS[slug].title, lang);
  const first = "muhammad";
  const qmap = Object.fromEntries(order.map((slug) => [slug, { t: topicTitle(slug), h: pageHref(root, lang, slug) }]));
  const option = ([v, label], sel) => `<option value="${v}"${sel ? " selected" : ""}>${esc(label)}</option>`;

  const groups = SECTIONS.map((s) => `<div class="grp">
        <h3>${fmt(loc(s.title, lang))}</h3>
        <ol start="${order.indexOf(s.topics[0]) + 1}">
          ${s.topics.map((slug) => {
            const t = TOPICS[slug];
            return `<li>
            <span class="n" aria-hidden="true">${order.indexOf(slug) + 1}</span>
            <div>
              <a class="q" href="${pageHref(root, lang, slug)}">${fmt(topicTitle(slug))} ${arrow}</a>
              <p class="a">${fmt(loc(t.answer, lang))} ${cites(t, lang)}</p>
            </div>
          </li>`;
          }).join("\n          ")}
        </ol>
      </div>`).join("\n      ");

  const body = `<section class="hero" aria-labelledby="h1">
    <div class="wrap">
      <h1 id="h1">${h.h1Html}</h1>
      <p class="lead">${esc(h.lead(order.length))}</p>

      <div class="start">
        <p class="sentence"><span>${esc(h.s1)}</span> <span class="nw"><span class="blank"><select id="raised" aria-label="${esc(h.raisedL)}">${h.raised.map((o, i) => option(o, i === 0)).join("")}</select></span><span>${esc(h.comma)}</span></span> <span>${esc(h.s2)}</span> <span class="nw"><span class="blank"><select id="today" aria-label="${esc(h.todayL)}">${h.today.map((o, i) => option(o, i === 0)).join("")}</select></span>.</span></p>
        <p class="hint">${esc(h.hint)}</p>
        <p class="fact">${esc(h.fact)} <a class="cite" href="${PEW_URL}" target="_blank" rel="noopener noreferrer">${esc(h.pew)}<span class="sr"> ${esc(u.newTab)}</span></a></p>
        <p class="ctx swap" id="ctx" aria-live="polite">${esc(h.ctx)}</p>
        <a class="first" id="firstq" href="${pageHref(root, lang, first)}"><span class="l">${esc(h.firstL)}</span><span class="t swap" id="firstq-t">${fmt(topicTitle(first))}</span>${svgArrow}</a>
      </div>
    </div>
  </section>
  <script type="application/json" id="qmap">${JSON.stringify(qmap).replace(/</g, "\\u003c")}</script>

  <section class="sec" id="questions" aria-labelledby="q-h">
    <div class="wrap">
      <h2 id="q-h">${esc(h.qH(order.length))}</h2>
      <p class="sub">${esc(h.qSub)}</p>
      ${groups}
    </div>
  </section>
  <script>
    // Old shared links pointed at /?path=... ; send them to the journey.
    if (/[?&](path|preview)=/.test(location.search)) location.replace("${root}journey.html" + location.search);
  </script>`;

  return layout({ lang, slug: "", title: u.siteName, description: u.description, body });
}

// ── QUESTION PAGES ────────────────────────────────────────────────────────────
function topicPage(lang, slug) {
  const u = UI[lang];
  const t = TOPICS[slug];
  const root = rootFrom(lang, slug);
  const i = order.indexOf(slug);
  const nextSlug = order[i + 1];
  const title = loc(t.title, lang);
  const section = SECTIONS.find((s) => s.topics.includes(slug));
  const main = t.main.filter(isLive);
  const objections = t.objections.filter(isLive);
  const steps = t.stepsFrom && isLive(t.stepsFrom) ? TREE[t.stepsFrom].steps || [] : [];
  const contactMsg = t.contactNode && isLive(t.contactNode) ? content(t.contactNode, lang).message : "";
  const [q1, q2] = u.quotes;

  let body = "";
  if (contactMsg) {
    body += `<div class="talk"><p>${fmt(contactMsg)}</p><a class="btn" href="#ask">${esc(u.talk)} ${svgArrow}</a></div>`;
  }
  if (main.length) {
    const solo = main.length === 1;
    body += `<section class="t-sec" aria-labelledby="t-ev"><h2 class="t-h" id="t-ev">${esc(u.evidence)}</h2>` +
      main.map((id, k) => {
        const c = content(id, lang);
        const head = norm(c.question) === norm(title) ? "" : `<h3>${fmt(c.question)}</h3>`;
        return `<section class="step${solo ? " solo" : ""}">${solo ? "" : `<p class="step-n" aria-hidden="true">${k + 1}</p>`}<div>${head}${c.subtitle ? `<p class="step-sub">${fmt(c.subtitle)}</p>` : ""}${renderEvidence(TREE[id], lang)}</div></section>`;
      }).join("") + `</section>`;
  }
  if (objections.length) {
    const allOpen = !main.length;
    body += `<section class="t-sec" aria-labelledby="t-obj"><h2 class="t-h" id="t-obj">${esc(u.objH)}</h2><p class="t-hs">${esc(u.objSub)}</p>` +
      objections.map((id) => {
        const c = content(id, lang);
        const say = loc(incomingLabel[id], lang) || c.question;
        return `<details class="ob"${allOpen ? " open" : ""}><summary><span class="ys">${esc(u.youSay)}</span><span class="say">${q1}${fmt(say)}${q2}</span><span class="pm" aria-hidden="true"></span></summary>` +
          `<div class="ob-body"><p class="ans-l">${esc(u.ourAns)}</p><p class="ans-h">${fmt(c.question)}</p>${c.subtitle ? `<p class="step-sub">${fmt(c.subtitle)}</p>` : ""}${renderEvidence(TREE[id], lang)}</div></details>`;
      }).join("") + `</section>`;
  }
  if (steps.length) {
    body += `<section class="t-sec" aria-labelledby="t-go"><h2 class="t-h" id="t-go">${esc(u.whereNext)}</h2><ul class="go">` +
      steps.map((st) => `<li><a href="${esc(st.url)}" target="_blank" rel="noopener noreferrer"><span class="k">${esc(u.kinds[st.type] || u.kinds.article)}</span><span>${fmt(loc(st.label, lang))}</span><span class="ext" aria-hidden="true">↗</span><span class="sr">${esc(u.newTab)}</span></a></li>`).join("") +
      `</ul></section>`;
  }

  const next = nextSlug && TOPICS[nextSlug];
  body += next
    ? `<a class="nextbar" href="${pageHref(root, lang, nextSlug)}"><span class="l">${esc(u.next)}</span><span class="tt">${fmt(loc(next.title, lang))}</span>${svgArrow}</a>`
    : `<div class="endcard"><p>${esc(u.last)}</p><a href="${pageHref(root, lang, "")}#questions">${esc(u.lastLink)}</a></div>`;

  const page = `<div class="wrap t-head">
    <a class="back" href="${pageHref(root, lang, "")}#questions"><span class="arr" aria-hidden="true">←</span> ${esc(u.allQuestions)}</a>
    <p class="stepof">${fmt(u.qOf(i + 1, order.length) + " · " + loc(section.title, lang))}</p>
    <div class="prog" aria-hidden="true"><i style="width:${((i + 1) / order.length * 100).toFixed(1)}%"></i></div>
    <h1 class="t-title">${fmt(title)}</h1>
    <div class="short">
      <p class="short-l">${esc(u.shortAns)}</p>
      <p class="short-a">${fmt(loc(t.answer, lang))}</p>
      ${t.sources?.length ? `<p class="short-s">${esc(u.source)}: ${cites(t, lang)}</p>` : ""}
    </div>
  </div>
  <div class="wrap t-body">${body}</div>`;

  return layout({ lang, slug, title, description: loc(t.summary, lang), body: page });
}

// ── WRITE ─────────────────────────────────────────────────────────────────────
function write(path, html) {
  const full = join(OUT, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html, "utf-8");
}

for (const dir of ["q", "ar"]) {
  if (existsSync(join(OUT, dir))) rmSync(join(OUT, dir), { recursive: true });
}

let pages = 0;
for (const lang of LANGS) {
  write(lang === "ar" ? "ar/index.html" : "index.html", homePage(lang));
  pages++;
  for (const slug of order) {
    write(`${lang === "ar" ? "ar/" : ""}q/${slug}/index.html`, topicPage(lang, slug));
    pages++;
  }
}
console.log(`Built ${pages} pages (${order.length} topics × ${LANGS.length} languages + home pages) into ${OUT}`);
