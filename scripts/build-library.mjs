#!/usr/bin/env node

/**
 * build-library.mjs
 *
 * Generates the question library as plain static HTML from js/topics.js and
 * the content tree in js/tree/:
 *
 *   index.html              English home (list of questions)
 *   ar/index.html           Arabic home
 *   q/<slug>/index.html     English topic pages
 *   ar/q/<slug>/index.html  Arabic topic pages
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

// ── UI STRINGS ────────────────────────────────────────────────────────────────
const UI = {
  en: {
    eyebrow: "A journey of reason",
    homeLead: "Honest answers to the biggest questions a person can ask. Each page sets out the evidence and then the strongest objections to it, so you can weigh them yourself. Start with whichever question matters most to you.",
    journeyLead: "Prefer to be guided one question at a time?",
    journeyBtn: "Take the guided journey",
    journey: "Guided journey",
    allQuestions: "All questions",
    theCase: "The evidence",
    objections: "Common objections",
    readMore: "Read more",
    nextSteps: "Where to go next",
    askTitle: "Still have a question?",
    askText: "Not convinced, or think something here is wrong? Tell us. Every message is read by a person.",
    homeAskText: "Is your question not here yet? Ask it, and it may become the next page.",
    name: "Your name",
    email: "Email address",
    message: "Your question or message",
    send: "Send message",
    sending: "Sending...",
    sent: "✓ Message sent. We'll be in touch soon.",
    formErr: "Please enter your name and email.",
    submitFailed: "Submission failed. Please try again.",
    related: "Next question",
    switchLang: "العربية",
    switchLangLabel: "Read this page in Arabic",
    darkLabel: "Toggle dark mode",
    footer: "No account, no tracking. Corrections are always welcome.",
  },
  ar: {
    eyebrow: "رحلة في العقل",
    homeLead: "إجابات صادقة عن أكبر الأسئلة التي يمكن للإنسان أن يطرحها. تعرض كل صفحة الأدلة ثم أقوى الاعتراضات عليها، لتوازن بينها بنفسك. ابدأ بالسؤال الذي يهمّك أكثر.",
    journeyLead: "هل تفضّل أن نرشدك سؤالًا تلو الآخر؟",
    journeyBtn: "ابدأ الرحلة الموجَّهة",
    journey: "الرحلة الموجَّهة",
    allQuestions: "كل الأسئلة",
    theCase: "الأدلة",
    objections: "اعتراضات شائعة",
    readMore: "اقرأ المزيد",
    nextSteps: "الخطوات التالية",
    askTitle: "هل ما زال لديك سؤال؟",
    askText: "لم تقتنع، أو ترى أن شيئًا هنا غير صحيح؟ أخبرنا. يقرأ كل رسالة شخصٌ حقيقي.",
    homeAskText: "سؤالك غير موجود هنا بعد؟ اطرحه، فقد يصبح الصفحة التالية.",
    name: "اسمك",
    email: "البريد الإلكتروني",
    message: "سؤالك أو رسالتك",
    send: "أرسل الرسالة",
    sending: "جارٍ الإرسال...",
    sent: "✓ تم إرسال الرسالة. سنتواصل معك قريبًا.",
    formErr: "الرجاء إدخال اسمك وبريدك الإلكتروني.",
    submitFailed: "فشل الإرسال. حاول مرة أخرى.",
    related: "السؤال التالي",
    switchLang: "English",
    switchLangLabel: "Read this page in English",
    darkLabel: "تبديل الوضع الليلي",
    footer: "لا حساب، ولا تتبّع. نرحّب دائمًا بالتصويبات.",
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
if (problems.length) {
  console.error("Library build failed:\n  " + problems.join("\n  "));
  process.exit(1);
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function loc(obj, lang) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[lang] || obj.en || "";
}

const isLive = (id) => TREE[id] && TREE[id].status !== "draft";
const content = (id, lang) => TREE[id].content?.[lang] || TREE[id].content?.en || {};
const paras = (text) =>
  String(text).split(/\n\s*\n/).map((p) => `<p>${esc(p.trim()).replace(/\n/g, "<br>")}</p>`).join("");

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

// ── RENDERING ─────────────────────────────────────────────────────────────────
function renderBlocks(blocks, lang) {
  return (blocks || []).map((b) => {
    if (b.type === "text") return paras(loc(b.content, lang));
    if (b.type === "quote") {
      const src = loc(b.source, lang);
      return `<blockquote>${paras(loc(b.content, lang))}${src ? `<cite>${esc(src)}</cite>` : ""}</blockquote>`;
    }
    if (b.type === "link" && b.url) {
      const icon = b.linkType === "video" ? "▶" : "📄";
      return `<p><a class="chip" href="${esc(b.url)}" target="_blank" rel="noopener noreferrer">${icon} ${esc(loc(b.label, lang))} ↗</a></p>`;
    }
    if (b.type === "image" && b.url) {
      const cap = loc(b.caption, lang);
      return `<figure><img src="${esc(b.url)}" alt="${esc(cap)}" loading="lazy">${cap ? `<figcaption>${esc(cap)}</figcaption>` : ""}</figure>`;
    }
    return "";
  }).join("");
}

function renderEvidence(node, lang) {
  const points = node.evidence?.points || [];
  if (!points.length) return "";
  return points.map((pt) => {
    const more = loc(pt.readMore, lang);
    return `<div class="lib-point">
      ${renderBlocks(pt.blocks, lang)}
      ${more ? `<details class="lib-more"><summary>${esc(UI[lang].readMore)}</summary>${paras(more)}</details>` : ""}
    </div>`;
  }).join("");
}

function renderMain(id, lang) {
  const node = TREE[id];
  const c = content(id, lang);
  return `<section class="lib-block">
    <h2>${esc(c.question)}</h2>
    ${c.subtitle ? `<div class="lib-sub">${paras(c.subtitle)}</div>` : ""}
    ${renderEvidence(node, lang)}
  </section>`;
}

function renderObjection(id, lang) {
  const node = TREE[id];
  const c = content(id, lang);
  const label = loc(incomingLabel[id], lang);
  return `<section class="lib-objection">
    <h3>${label ? `“${esc(label)}”` : esc(c.question)}</h3>
    ${label ? `<p class="lib-answer">${esc(c.question)}</p>` : ""}
    ${c.subtitle ? `<div class="lib-sub">${paras(c.subtitle)}</div>` : ""}
    ${renderEvidence(node, lang)}
  </section>`;
}

function renderSteps(id, lang) {
  const steps = TREE[id]?.steps || [];
  if (!steps.length) return "";
  return `<h2 class="lib-h">${esc(UI[lang].nextSteps)}</h2>` + steps.map((st) =>
    `<a class="step-link" href="${esc(st.url)}" target="_blank" rel="noopener noreferrer">${st.type === "video" ? "▶" : "📄"} ${esc(loc(st.label, lang))} <span class="ext">↗</span></a>`
  ).join("");
}

function contactForm(lang, intro, topic) {
  const u = UI[lang];
  return `<section class="lib-ask" id="ask">
    <h2>${esc(u.askTitle)}</h2>
    <p class="lib-ask-txt">${esc(intro)}</p>
    <form class="lib-form" action="https://formspree.io/f/${FORMSPREE_ID}" method="POST"
      data-sending="${esc(u.sending)}" data-sent="${esc(u.sent)}" data-err="${esc(u.formErr)}" data-failed="${esc(u.submitFailed)}">
      <input type="hidden" name="topic" value="${esc(topic)}">
      <input type="hidden" name="language" value="${lang}">
      <label class="form-lbl" for="f-name">${esc(u.name)}</label>
      <input class="form-inp" id="f-name" name="name" autocomplete="name" required>
      <label class="form-lbl" for="f-email">${esc(u.email)}</label>
      <input class="form-inp" id="f-email" name="email" type="email" autocomplete="email" required>
      <label class="form-lbl" for="f-msg">${esc(u.message)}</label>
      <textarea class="form-inp" id="f-msg" name="message"></textarea>
      <p class="form-err hidden" role="alert"></p>
      <button class="next-btn" type="submit">${esc(u.send)}</button>
    </form>
  </section>`;
}

function layout({ lang, slug, title, description, body }) {
  const u = UI[lang];
  const root = rootFrom(lang, slug);
  const other = lang === "en" ? "ar" : "en";
  const pageTitle = slug ? `${title} — The Path` : "The Path";
  return `<!DOCTYPE html>
<!-- Generated by scripts/build-library.mjs from js/topics.js and js/tree/. Do not edit by hand. -->
<html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="alternate" hreflang="${other}" href="${pageHref(root, other, slug)}">
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}css/style.css">
<script>try{if(localStorage.getItem("theme")==="dark"||(!localStorage.getItem("theme")&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}</script>
</head>
<body class="lib">
<div id="header">
  <a id="logo" href="${pageHref(root, lang, "")}">The Path</a>
  <div class="header-btns">
    <a class="icon-btn" href="${root}journey.html${lang === "ar" ? "?lang=ar" : ""}">${esc(u.journey)}</a>
    <a class="icon-btn" href="${pageHref(root, other, slug)}" hreflang="${other}" aria-label="${esc(u.switchLangLabel)}">${esc(u.switchLang)}</a>
    <button class="icon-btn" id="dark-btn" type="button" aria-label="${esc(u.darkLabel)}"></button>
  </div>
</div>
<main id="main">
${body}
<p class="lib-footer">${esc(u.footer)}</p>
</main>
<script src="${root}js/page.js"></script>
</body>
</html>
`;
}

function homePage(lang) {
  const u = UI[lang];
  const root = rootFrom(lang, "");
  const sections = SECTIONS.map((s) => {
    const items = s.topics.map((slug) => {
      const t = TOPICS[slug];
      return `<li><a class="lib-card" href="${pageHref(root, lang, slug)}">
        <span class="lib-card-t">${esc(loc(t.title, lang))}</span>
        <span class="lib-card-s">${esc(loc(t.summary, lang))}</span>
      </a></li>`;
    }).join("");
    return `<section class="lib-section">
      <h2 class="lib-h">${esc(loc(s.title, lang))}</h2>
      <ul class="lib-list">${items}</ul>
    </section>`;
  }).join("");

  const body = `<p class="eyebrow">${esc(u.eyebrow)}</p>
<h1 class="lib-title">The Path</h1>
<p class="lib-lead">${esc(u.homeLead)}</p>
${sections}
<div class="lib-journey">
  <p>${esc(u.journeyLead)}</p>
  <a class="start-btn" href="${root}journey.html${lang === "ar" ? "?lang=ar" : ""}">${esc(u.journeyBtn)}</a>
</div>
${contactForm(lang, u.homeAskText, "home")}
<script>
  // Old shared links pointed at /?path=... ; send them to the journey.
  if (/[?&](path|preview)=/.test(location.search)) location.replace("${root}journey.html" + location.search);
</script>`;

  return layout({ lang, slug: "", title: "The Path", description: u.homeLead, body });
}

function topicPage(lang, slug, nextSlug) {
  const u = UI[lang];
  const t = TOPICS[slug];
  const root = rootFrom(lang, slug);
  const main = t.main.filter(isLive);
  const objections = t.objections.filter(isLive);
  const contactIntro = t.contactNode && isLive(t.contactNode)
    ? content(t.contactNode, lang).message || u.askText
    : u.askText;
  const next = TOPICS[nextSlug];

  const body = `<nav class="lib-crumb"><a href="${pageHref(root, lang, "")}">${esc(u.allQuestions)}</a></nav>
<h1 class="lib-title lib-title-q">${esc(loc(t.title, lang))}</h1>
<p class="lib-lead">${esc(loc(t.summary, lang))}</p>
${main.length ? `${main.length > 1 || objections.length ? `<h2 class="lib-h">${esc(u.theCase)}</h2>` : ""}${main.map((id) => renderMain(id, lang)).join("")}` : ""}
${objections.length ? `<h2 class="lib-h">${esc(u.objections)}</h2>${objections.map((id) => renderObjection(id, lang)).join("")}` : ""}
${t.stepsFrom ? renderSteps(t.stepsFrom, lang) : ""}
${contactForm(lang, contactIntro, slug)}
${next ? `<a class="lib-next" href="${pageHref(root, lang, nextSlug)}"><span>${esc(u.related)}</span>${esc(loc(next.title, lang))} →</a>` : ""}`;

  return layout({ lang, slug, title: loc(t.title, lang), description: loc(t.summary, lang), body });
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

const order = SECTIONS.flatMap((s) => s.topics);
let pages = 0;
for (const lang of LANGS) {
  write(lang === "ar" ? "ar/index.html" : "index.html", homePage(lang));
  pages++;
  order.forEach((slug, i) => {
    write(`${lang === "ar" ? "ar/" : ""}q/${slug}/index.html`, topicPage(lang, slug, order[i + 1]));
    pages++;
  });
}
console.log(`Built ${pages} pages (${order.length} topics × ${LANGS.length} languages + home pages) into ${OUT}`);
