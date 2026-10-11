#!/usr/bin/env node

/**
 * build-library.mjs
 *
 * Generates the question library as plain static HTML from js/topics.js and
 * the content tree in js/tree/:
 *
 *   index.html              English home (the data story and every question)
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

// Topics the home page links to by name: the four facts, and the first
// question picked from the reader's sentence (mirrored in js/site.js).
const FACT_TOPICS = ["cause", "muhammad", "quran-preserved", "quran-literary"];
const FIRST_TOPICS = ["muhammad", "quran-preserved", "one-god", "cause", "beginning", "reality", "revelation"];

// ── UI STRINGS ────────────────────────────────────────────────────────────────
// Plain text unless the key ends in "Html" (authored markup, inserted as is).
const UI = {
  en: {
    siteName: "The Only True Religion",
    wordmarkHtml: 'The Only True Religion<small lang="ar">الدين الحق</small>',
    footNameHtml: 'The Only True Religion <span lang="ar">· الدين الحق</span>',
    nav: "Main",
    navEvidence: "The evidence",
    allQuestions: "All questions",
    journey: "Guided journey",
    switchLang: "العربية",
    switchLangLabel: "اقرأ هذه الصفحة بالعربية",
    darkLabel: "Toggle dark mode",
    description: "Most people never chose their religion. They inherited it. We say Islam is the only true religion: check the evidence one question at a time, and try to prove us wrong.",
    // Question pages
    qOf: (i, n) => `Question ${i} of ${n}`,
    theCase: "The case",
    objH: "Objections, answered",
    objSub: "The strongest pushback we hear, and our answer to each.",
    youSay: "You might say",
    ourAns: "Our answer",
    readMore: "Read more",
    next: "Next question",
    last: "That’s the last question so far.",
    lastLink: "Back to all questions",
    whereNext: "Where to go from here",
    talk: "Talk to us",
    askH: "Not convinced?",
    askT: "Tell us exactly where the argument fails. We read every objection.",
    askB: "Send an objection",
    kinds: { article: "Article", video: "Video", study: "Study", book: "Book" },
    newTab: "(opens in a new tab)",
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
    navEvidence: "الأدلة",
    allQuestions: "كل الأسئلة",
    journey: "الرحلة الموجَّهة",
    switchLang: "English",
    switchLangLabel: "Read this page in English",
    darkLabel: "تبديل الوضع الليلي",
    description: "معظم الناس لم يختاروا دينهم، بل ورثوه. نقول إن الإسلام هو الدين الحق: تحقّق من الأدلة سؤالًا تلو الآخر، وحاول أن تثبت أننا مخطئون.",
    qOf: (i, n) => `السؤال ${i} من ${n}`,
    theCase: "الحجة",
    objH: "اعتراضات وردودنا",
    objSub: "أقوى ما نسمعه من اعتراضات، وردّنا على كل منها.",
    youSay: "قد تقول",
    ourAns: "ردّنا",
    readMore: "اقرأ المزيد",
    next: "السؤال التالي",
    last: "هذا آخر سؤال حتى الآن.",
    lastLink: "عُد إلى كل الأسئلة",
    whereNext: "إلى أين بعد ذلك؟",
    talk: "تحدّث إلينا",
    askH: "لم تقتنع؟",
    askT: "أخبرنا أين تخطئ الحجة بالضبط. نقرأ كل اعتراض.",
    askB: "أرسل اعتراضك",
    kinds: { article: "مقال", video: "فيديو", study: "دراسة", book: "كتاب" },
    newTab: "(يفتح في نافذة جديدة)",
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

// Home page copy. Figures: Pew Research Center (2025), populations for 2020,
// staying rates for adults 18 to 54. Bars are widths relative to Christians.
const HOME = {
  en: {
    h1Html: "You didn’t choose what you believe. <span>You inherited it.</span>",
    leadHtml: "That’s not an insult. It’s data. Researchers found that <q>most people around the world still identify with the religion in which they were raised.</q> <cite>Pew Research Center, 2025</cite> Before you decide we’re wrong, see where you stand.",
    s1: "I was raised", comma: ",", s2: "and today I",
    raisedL: "How you were raised", todayL: "What you believe today",
    raised: [["christian", "Christian"], ["muslim", "Muslim"], ["jewish", "Jewish"], ["hindu", "Hindu"], ["buddhist", "Buddhist"], ["other", "in another faith"], ["none", "with no religion"]],
    today: [["keep", "still believe it"], ["doubt", "have doubts"], ["nogod", "believe in no God"], ["unsure", "am not sure"]],
    hint: "Change the blue words until the sentence is true for you.",
    fig: "2.3 billion", cap: "people are Christian.", stat: "About 83 in 100 people raised Christian still are.", ctx: "Like you. Did you choose it, or inherit it?",
    canvas: "1,000 dots, one for every 8 million people. 288 are highlighted: 2.3 billion people are Christian.",
    key: "Christian", rest: "Everyone else", you: "You",
    src: "1,000 dots, each about 8 million people · Pew Research Center, 2025 (staying rates are for adults 18 to 54)",
    firstL: "Your first question", cta: "Prove us wrong",
    promise: "No sign-up. No tracking. Every page puts the strongest objections next to our answers.",
    cH: "They can’t all be right.",
    cSubHtml: "Ask everyone in those 1,000 dots one question: <b>how many gods are there?</b>",
    barsL: "How many gods are there? Each group’s answer, with its population in 2020",
    barsHead: ["Group", "People, 2020", "Their answer"], tag: "Our claim",
    rows: [
      ["Christians", "2.3 billion", "One God, in three persons"],
      ["Muslims", "2.0 billion", "One God, with no partner and no equal"],
      ["No religion", "1.9 billion", "No set answer"],
      ["Hindus", "1.2 billion", "Many, or one God in many forms"],
      ["Buddhists", "324 million", "No creator God"],
      ["Other religions", "172 million", "Depends on the tradition"],
      ["Jews", "14.8 million", "One God"],
    ],
    cBig: "Seven answers. At most one of them is true.",
    cSmallHtml: "<b>We say it’s Islam’s.</b> Everything on this site exists so you can check that claim yourself, one step at a time, starting wherever you are.",
    bH: "Islam doesn’t want to be inherited either.",
    bI1Html: 'Fourteen centuries before anyone surveyed it, the Prophet <span class="saw">ﷺ</span> described what those dots show.',
    hadithEnHtml: "“Every child is born upon the <i>fitrah</i>. Then his parents make him a Jew, a Christian or a Magian.”",
    glossHtml: "<i>Fitrah</i>: the natural disposition to recognize God.",
    bC1Html: 'The Prophet Muhammad <span class="saw">ﷺ</span> · Sahih al-Bukhari 1385',
    bI2: "And the Quran criticizes anyone who keeps a belief only because their parents held it.",
    ayahEn: "“And when it is said to them, ‘Follow what Allah has revealed,’ they say, ‘Rather, we will follow that upon which we found our fathers.’ Even though their fathers understood nothing, nor were they guided?”",
    bC2: "Al-Baqarah 2:170",
    bEnd: "That includes Muslims. Islam doesn’t ask to be inherited. It asks to be checked.",
    fH: "So check it. Start with four facts.",
    fSub: "Each one opens a full page: the evidence, the strongest objections against it, and our answers.",
    facts: [
      ["13.8", "billion years since the universe began", "The universe had a beginning. Whatever begins to exist has a cause. So what caused it?"],
      ["40", "years before he claimed prophethood", 'Muhammad <span class="saw">ﷺ</span> was 40 when he first said God had spoken to him. Long before that, Mecca called him al-Amin: the trustworthy.'],
      ["568–645", "CE, the radiocarbon date of an early Quran", 'That’s the date range for the parchment of the Birmingham Quran manuscript. The Prophet <span class="saw">ﷺ</span> lived from about 570 to 632.'],
      ["10", "words in the Quran’s shortest chapter", "The Quran challenges anyone who doubts it to produce one chapter like it (2:23). The shortest is ten words long."],
    ],
    qH: "Or pick any question.",
    qSub: (n) => `${n} pages so far, in the order the argument runs.`,
    srcH: "Sources",
    sourcesHtml: `<li><a href="https://www.pewresearch.org/religion/2025/06/09/how-the-global-religious-landscape-changed-from-2010-to-2020/" target="_blank" rel="noopener noreferrer">Pew Research Center (2025), How the Global Religious Landscape Changed From 2010 to 2020</a>. Populations for 2020; switching rates for adults 18 to 54.</li>
        <li><a href="https://arxiv.org/abs/1807.06209" target="_blank" rel="noopener noreferrer">Planck Collaboration (2018), Planck 2018 results VI: Cosmological parameters</a>. Age of the universe.</li>
        <li>University of Birmingham (2015), radiocarbon dating of the Birmingham Quran manuscript.</li>
        <li><a href="https://sunnah.com/bukhari:1385" target="_blank" rel="noopener noreferrer">Sahih al-Bukhari 1385</a> · <a href="https://quran.com/2/170" target="_blank" rel="noopener noreferrer">Quran 2:170</a> · <a href="https://quran.com/2/23" target="_blank" rel="noopener noreferrer">Quran 2:23</a> · <a href="https://quran.com/108" target="_blank" rel="noopener noreferrer">Quran 108</a></li>`,
  },
  ar: {
    h1Html: "أنت لم تختر ما تؤمن به. <span>بل ورثته.</span>",
    leadHtml: "ليست هذه إهانة، بل هي ما تقوله الأرقام. فقد وجد الباحثون أن <q>معظم الناس حول العالم ما زالوا ينتمون إلى الدين الذي نشؤوا عليه</q> <cite>مركز بيو للأبحاث، 2025</cite>. وقبل أن تحكم بأننا مخطئون، انظر أين تقف أنت.",
    s1: "نشأتُ", comma: "،", s2: "واليوم",
    raisedL: "كيف نشأت", todayL: "بماذا تؤمن اليوم",
    raised: [["christian", "مسيحيًا"], ["muslim", "مسلمًا"], ["jewish", "يهوديًا"], ["hindu", "هندوسيًا"], ["buddhist", "بوذيًا"], ["other", "على دين آخر"], ["none", "بلا دين"]],
    today: [["keep", "ما زلتُ مؤمنًا به"], ["doubt", "تساورني شكوك"], ["nogod", "لا أؤمن بوجود إله"], ["unsure", "لستُ متأكدًا"]],
    hint: "غيّر الكلمات الزرقاء حتى تصبح الجملة صادقة عنك.",
    fig: "2.3 مليار", cap: "مسيحي حول العالم.", stat: "نحو 83 من كل 100 ممن نشؤوا مسيحيين ما زالوا كذلك.", ctx: "مثلك تمامًا. فهل اخترته، أم ورثته؟",
    canvas: "ألف نقطة، كل نقطة نحو 8 ملايين شخص. منها 288 مميّزة: 2.3 مليار مسيحي حول العالم.",
    key: "المسيحيون", rest: "بقية الناس", you: "أنت",
    src: "ألف نقطة، كل نقطة نحو 8 ملايين شخص · مركز بيو للأبحاث، 2025 (نسب البقاء للبالغين من 18 إلى 54 عامًا)",
    firstL: "سؤالك الأول", cta: "أثبت أننا مخطئون",
    promise: "بلا تسجيل، وبلا تتبّع. وفي كل صفحة نضع أقوى الاعتراضات إلى جانب ردودنا.",
    cH: "لا يمكن أن يكونوا جميعًا على حق.",
    cSubHtml: "اسأل كل من تمثّلهم هذه النقاط الألف سؤالًا واحدًا: <b>كم إلهًا هناك؟</b>",
    barsL: "كم إلهًا هناك؟ جواب كل جماعة، مع عدد أفرادها في 2020",
    barsHead: ["الجماعة", "عددهم في 2020", "جوابهم"], tag: "دعوانا",
    rows: [
      ["المسيحيون", "2.3 مليار", "إله واحد في ثلاثة أقانيم"],
      ["المسلمون", "2.0 مليار", "إله واحد لا شريك له ولا مثيل"],
      ["بلا دين", "1.9 مليار", "لا جواب محدد"],
      ["الهندوس", "1.2 مليار", "آلهة كثيرة، أو إله واحد في صور كثيرة"],
      ["البوذيون", "324 مليون", "لا إله خالق"],
      ["أديان أخرى", "172 مليون", "يختلف باختلاف التقليد"],
      ["اليهود", "14.8 مليون", "إله واحد"],
    ],
    cBig: "سبعة أجوبة، وجواب واحد منها على الأكثر هو الصحيح.",
    cSmallHtml: "<b>ونحن نقول إنه جواب الإسلام.</b> وكل ما في هذا الموقع موجود لتتحقق من ذلك بنفسك، خطوةً خطوة، من حيث أنت.",
    bH: "والإسلام نفسه لا يريد أن يُورَث.",
    bI1Html: 'قبل أربعة عشر قرنًا من أي استطلاع، وصف النبي <span class="saw">ﷺ</span> ما تُظهره هذه النقاط.',
    hadithEnHtml: "",
    glossHtml: "",
    bC1Html: 'النبي محمد <span class="saw">ﷺ</span> · صحيح البخاري 1385',
    bI2: "والقرآن يذمّ من يتمسّك بمعتقدٍ لمجرد أن آباءه كانوا عليه.",
    ayahEn: "",
    bC2: "سورة البقرة، الآية 170",
    bEnd: "وهذا يشمل المسلمين أيضًا. فالإسلام لا يطلب أن يُورَث، بل أن يُتحقَّق منه.",
    fH: "فتحقّق بنفسك. ابدأ بأربع حقائق.",
    fSub: "كل حقيقة منها تفتح صفحة كاملة: الأدلة، وأقوى الاعتراضات عليها، وردودنا.",
    facts: [
      ["13.8", "مليار سنة منذ بدأ الكون", "للكون بداية، وكل ما له بداية فلا بد له من سبب. فما الذي سبّبه؟"],
      ["40", "سنة قبل أن يعلن النبوة", 'كان محمد <span class="saw">ﷺ</span> في الأربعين حين قال أول مرة إن الله أوحى إليه. وقبل ذلك بزمن طويل، كان أهل مكة يسمّونه «الأمين».'],
      ["568–645", "ميلاديًا: تأريخ رَقّ مصحف مبكر بالكربون المشع", 'هذا هو المدى الزمني الذي حدّده التأريخ بالكربون المشع لرَقّ مخطوطة برمنغهام القرآنية. وقد عاش النبي <span class="saw">ﷺ</span> من نحو 570 إلى 632م.'],
      ["10", "كلمات في أقصر سورة في القرآن", "يتحدّى القرآن كل من يشكّ فيه أن يأتي بسورة من مثله (البقرة: 23). وأقصر سوره عشر كلمات."],
    ],
    qH: "أو اختر أي سؤال.",
    qSub: (n) => `${n} صفحة حتى الآن، مرتّبة بحسب تسلسل الحجة.`,
    srcH: "المصادر",
    sourcesHtml: `<li><a href="https://www.pewresearch.org/religion/2025/06/09/how-the-global-religious-landscape-changed-from-2010-to-2020/" target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">Pew Research Center (2025)</a>: كيف تغيّر المشهد الديني العالمي بين 2010 و2020. أعداد عام 2020، ونسب التحوّل للبالغين من 18 إلى 54 عامًا.</li>
        <li><a href="https://arxiv.org/abs/1807.06209" target="_blank" rel="noopener noreferrer" lang="en" dir="ltr">Planck Collaboration (2018)</a>: نتائج بلانك 2018 للمعاملات الكونية. عمر الكون.</li>
        <li>جامعة برمنغهام (2015): التأريخ بالكربون المشع لمخطوطة برمنغهام القرآنية.</li>
        <li><a href="https://sunnah.com/bukhari:1385" target="_blank" rel="noopener noreferrer">صحيح البخاري 1385</a> · <a href="https://quran.com/2/170" target="_blank" rel="noopener noreferrer">البقرة 170</a> · <a href="https://quran.com/2/23" target="_blank" rel="noopener noreferrer">البقرة 23</a> · <a href="https://quran.com/108" target="_blank" rel="noopener noreferrer">سورة الكوثر</a></li>`,
  },
};
const BAR_WIDTHS = [100, 87, 82.6, 52.2, 14.1, 7.5, 0.64];
const CLAIM_ROW = 1;

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
for (const slug of new Set([...FACT_TOPICS, ...FIRST_TOPICS])) {
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

function layout({ lang, slug, title, description, body, footExtra = "" }) {
  const u = UI[lang];
  const root = rootFrom(lang, slug);
  const other = lang === "en" ? "ar" : "en";
  const home = pageHref(root, lang, "");
  const onHome = !slug;
  const pageTitle = slug ? `${title} · ${u.siteName}` : `${u.siteName}`;
  const fonts = "family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400;1,6..72,500&family=Amiri:wght@400;700&family=Reem+Kufi:wght@500..700" +
    (lang === "ar" ? "&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Noto+Kufi+Arabic:wght@500..800" : "");
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
      <a class="nav-wide" href="${onHome ? "" : home}#facts">${esc(u.navEvidence)}</a>
      <a class="nav-wide" href="${onHome ? "" : home}#questions">${esc(u.allQuestions)}</a>
      <a class="nav-wide" href="${root}journey.html${lang === "ar" ? "?lang=ar" : ""}">${esc(u.journey)}</a>
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
    <div>
      <p class="fname">${u.footNameHtml}</p>
      <p class="fnote">${esc(u.footer)}</p>
    </div>
    <div>${footExtra}</div>
  </div>
</footer>
<script src="${root}js/site.js"></script>
</body>
</html>
`;
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function homePage(lang) {
  const u = UI[lang];
  const h = HOME[lang];
  const root = rootFrom(lang, "");
  const topicTitle = (slug) => loc(TOPICS[slug].title, lang);
  const first = "muhammad";
  const qmap = Object.fromEntries(order.map((slug) => [slug, { t: topicTitle(slug), h: pageHref(root, lang, slug) }]));

  const bars = `<div class="bars" role="table" aria-label="${esc(h.barsL)}">
        <div class="row head" role="row">${h.barsHead.map((x) => `<span role="columnheader">${esc(x)}</span>`).join("")}</div>
        ${h.rows.map(([who, val, ans], i) => `<div class="row${i === CLAIM_ROW ? " claim" : ""}" role="row"><span class="who" role="rowheader">${esc(who)}</span><span class="track" role="cell"><span class="bar" style="--w:${BAR_WIDTHS[i]}%"></span><span class="val">${esc(val)}</span></span><span class="ans" role="cell">${esc(ans)}${i === CLAIM_ROW ? ` <span class="tag">${esc(h.tag)}</span>` : ""}</span></div>`).join("\n        ")}
      </div>`;

  const facts = h.facts.map(([n, unit, text], i) => `<li>
          <p class="n"${n.includes("–") ? ' dir="ltr"' : ""}>${esc(n)}</p>
          <p class="u">${esc(unit)}</p>
          <p class="t">${text}</p>
          <a href="${pageHref(root, lang, FACT_TOPICS[i])}">${fmt(topicTitle(FACT_TOPICS[i]))} ${arrow}</a>
        </li>`).join("\n        ");

  const parts = SECTIONS.map((s) => `<div class="part"><h3>${fmt(loc(s.title, lang))}</h3><ul>
          ${s.topics.map((slug) => `<li><a href="${pageHref(root, lang, slug)}"><span>${fmt(topicTitle(slug))}</span> ${arrow}</a></li>`).join("\n          ")}
        </ul></div>`).join("\n        ");

  const option = ([v, label], sel) => `<option value="${v}"${sel ? " selected" : ""}>${esc(label)}</option>`;

  const body = `<section class="hero" aria-labelledby="h1">
    <div class="wrap">
      <h1 id="h1">${h.h1Html}</h1>
      <p class="lead">${h.leadHtml}</p>

      <div class="inst">
        <div class="inst-top">
          <div>
            <p class="sentence"><span>${esc(h.s1)}</span> <span class="nw"><span class="blank"><select id="raised" aria-label="${esc(h.raisedL)}">${h.raised.map((o, i) => option(o, i === 0)).join("")}</select></span><span>${esc(h.comma)}</span></span> <span>${esc(h.s2)}</span> <span class="nw"><span class="blank"><select id="today" aria-label="${esc(h.todayL)}">${h.today.map((o, i) => option(o, i === 0)).join("")}</select></span>.</span></p>
            <p class="hint">${esc(h.hint)}</p>
          </div>
          <div class="readout" aria-live="polite">
            <p class="fig swap" id="fig">${esc(h.fig)}</p>
            <p class="cap swap" id="cap">${esc(h.cap)}</p>
            <p class="stat swap" id="stat">${esc(h.stat)}</p>
            <p class="ctx swap" id="ctx">${esc(h.ctx)}</p>
          </div>
        </div>

        <div class="field">
          <canvas id="field" role="img" aria-label="${esc(h.canvas)}"></canvas>
          <div class="tip" id="tip" hidden></div>
        </div>
        <div class="legend">
          <span><i class="k-hi"></i><span id="k-label">${esc(h.key)}</span></span>
          <span><i class="k-rest"></i>${esc(h.rest)}</span>
          <span><i class="k-you"></i>${esc(h.you)}</span>
          <span class="src">${esc(h.src)}</span>
        </div>

        <div class="next">
          <div>
            <p class="next-l">${esc(h.firstL)}</p>
            <p class="next-q"><a class="swap" id="firstq" href="${pageHref(root, lang, first)}">${fmt(topicTitle(first))}</a></p>
          </div>
          <a class="btn" id="firstbtn" href="${pageHref(root, lang, first)}"><span>${esc(h.cta)}</span> ${svgArrow}</a>
        </div>
      </div>
      <p class="promise">${esc(h.promise)}</p>
    </div>
  </section>
  <script type="application/json" id="qmap">${JSON.stringify(qmap).replace(/</g, "\\u003c")}</script>

  <section class="sec" aria-labelledby="c-h">
    <div class="wrap">
      <h2 id="c-h">${esc(h.cH)}</h2>
      <p class="sub">${h.cSubHtml}</p>
      ${bars}
      <div class="conclude">
        <p class="big">${esc(h.cBig)}</p>
        <p class="small">${h.cSmallHtml}</p>
      </div>
    </div>
  </section>

  <section class="band" aria-labelledby="b-h">
    <svg class="geo" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="star8" width="72" height="72" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" stroke-width="1">
            <rect x="10.54" y="10.54" width="50.92" height="50.92"/>
            <path d="M36 0L72 36L36 72L0 36Z"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#star8)"/>
    </svg>
    <div class="wrap">
      <h2 id="b-h">${esc(h.bH)}</h2>
      <p class="intro">${h.bI1Html}</p>
      <figure class="bil">
        <p class="ar" lang="ar" dir="rtl">كُلُّ مَوْلُودٍ يُولَدُ عَلَى الْفِطْرَةِ، فَأَبَوَاهُ يُهَوِّدَانِهِ أَوْ يُنَصِّرَانِهِ أَوْ يُمَجِّسَانِهِ</p>
        <div class="en">
          ${h.hadithEnHtml ? `<blockquote>${h.hadithEnHtml}</blockquote>` : ""}
          ${h.glossHtml ? `<p class="gloss">${h.glossHtml}</p>` : ""}
          <p class="cite">${h.bC1Html}</p>
        </div>
      </figure>
      <p class="intro">${esc(h.bI2)}</p>
      <figure class="bil sm">
        <p class="ar" lang="ar" dir="rtl">وَإِذَا قِيلَ لَهُمُ اتَّبِعُوا مَا أَنزَلَ اللَّهُ قَالُوا بَلْ نَتَّبِعُ مَا أَلْفَيْنَا عَلَيْهِ آبَاءَنَا ۗ أَوَلَوْ كَانَ آبَاؤُهُمْ لَا يَعْقِلُونَ شَيْئًا وَلَا يَهْتَدُونَ</p>
        <div class="en">
          ${h.ayahEn ? `<blockquote>${esc(h.ayahEn)}</blockquote>` : ""}
          <p class="cite">${esc(h.bC2)}</p>
        </div>
      </figure>
      <p class="end">${esc(h.bEnd)}</p>
    </div>
  </section>

  <section class="sec" id="facts" aria-labelledby="f-h">
    <div class="wrap">
      <h2 id="f-h">${esc(h.fH)}</h2>
      <p class="sub">${esc(h.fSub)}</p>
      <ol class="facts">
        ${facts}
      </ol>
    </div>
  </section>

  <section class="sec" id="questions" aria-labelledby="q-h">
    <div class="wrap qs">
      <div>
        <h2 id="q-h">${esc(h.qH)}</h2>
        <p class="sub">${esc(h.qSub(order.length))}</p>
      </div>
      <div class="parts">
        ${parts}
      </div>
    </div>
  </section>
  <script>
    // Old shared links pointed at /?path=... ; send them to the journey.
    if (/[?&](path|preview)=/.test(location.search)) location.replace("${root}journey.html" + location.search);
  </script>`;

  return layout({
    lang, slug: "", title: u.siteName, description: u.description, body,
    footExtra: `<p class="fh">${esc(h.srcH)}</p>\n      <ol>\n        ${h.sourcesHtml}\n      </ol>`,
  });
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

  // A row of dots, one per question: where this page sits in the argument.
  const path = `<div class="path"><nav aria-label="${esc(u.allQuestions)}">${SECTIONS.map((s) =>
    `<span class="grp">${s.topics.map((sl) => {
      const tt = loc(TOPICS[sl].title, lang);
      return `<a href="${pageHref(root, lang, sl)}" title="${esc(tt)}" aria-label="${esc(u.qOf(order.indexOf(sl) + 1, order.length) + ": " + tt)}"${sl === slug ? ' aria-current="page"' : ""}></a>`;
    }).join("")}</span>`).join("")}</nav><span class="lbl">${fmt(u.qOf(i + 1, order.length) + " · " + loc(section.title, lang))}</span></div>`;

  let body = "";
  if (contactMsg) {
    body += `<div class="talk"><p>${fmt(contactMsg)}</p><a class="btn" href="#ask">${esc(u.talk)} ${svgArrow}</a></div>`;
  }
  if (main.length) {
    const solo = main.length === 1;
    body += `<section class="t-sec" aria-labelledby="t-case"><h2 class="t-h" id="t-case">${esc(u.theCase)}</h2>` +
      main.map((id, k) => {
        const c = content(id, lang);
        const head = norm(c.question) === norm(title) ? "" : `<h3>${fmt(c.question)}</h3>`;
        return `<section class="step${solo ? " solo" : ""}">${solo ? "" : `<p class="step-n" aria-hidden="true">${String(k + 1).padStart(2, "0")}</p>`}<div>${head}${c.subtitle ? `<p class="step-sub">${fmt(c.subtitle)}</p>` : ""}${renderEvidence(TREE[id], lang)}</div></section>`;
      }).join("") + `</section>`;
  }
  if (objections.length) {
    const allOpen = !main.length;
    body += `<section class="t-sec" aria-labelledby="t-obj"><h2 class="t-h" id="t-obj">${esc(u.objH)}</h2><p class="t-hs">${esc(u.objSub)}</p>` +
      objections.map((id, k) => {
        const c = content(id, lang);
        const say = loc(incomingLabel[id], lang) || c.question;
        return `<details class="ob"${allOpen || k === 0 ? " open" : ""}><summary><span class="ys">${esc(u.youSay)}</span><span class="say">${q1}${fmt(say)}${q2}</span><span class="pm" aria-hidden="true"></span></summary>` +
          `<div class="ob-body"><p class="ans-l">${esc(u.ourAns)}</p><p class="ans-h">${fmt(c.question)}</p>${c.subtitle ? `<p class="step-sub">${fmt(c.subtitle)}</p>` : ""}${renderEvidence(TREE[id], lang)}</div></details>`;
      }).join("") + `</section>`;
  }
  if (steps.length) {
    body += `<section class="t-sec" aria-labelledby="t-go"><h2 class="t-h" id="t-go">${esc(u.whereNext)}</h2><ul class="go">` +
      steps.map((st) => `<li><a href="${esc(st.url)}" target="_blank" rel="noopener noreferrer"><span class="k">${esc(u.kinds[st.type] || u.kinds.article)}</span><span>${fmt(loc(st.label, lang))}</span><span class="ext" aria-hidden="true">↗</span><span class="sr">${esc(u.newTab)}</span></a></li>`).join("") +
      `</ul></section>`;
  }

  const next = nextSlug && TOPICS[nextSlug];
  const aside = (next
    ? `<a class="nextcard" href="${pageHref(root, lang, nextSlug)}"><span class="l">${esc(u.next)}</span><span class="tt">${fmt(loc(next.title, lang))}</span>${arrow}</a>`
    : `<div class="endcard"><p>${esc(u.last)}</p><a href="${pageHref(root, lang, "")}#questions">${esc(u.lastLink)}</a></div>`) +
    `<div class="askcard"><p class="h">${esc(u.askH)}</p><p>${esc(u.askT)}</p><a class="btn ghost" href="#ask">${esc(u.askB)}</a></div>`;

  const page = `<div class="wrap t-head">
    <a class="back" href="${pageHref(root, lang, "")}#questions"><span class="arr" aria-hidden="true">←</span> ${esc(u.allQuestions)}</a>
    ${path}
    <h1 class="t-title">${fmt(title)}</h1>
    <p class="t-sum">${fmt(loc(t.summary, lang))}</p>
  </div>
  <div class="wrap t-grid">
    <article class="t-body">${body}</article>
    <aside class="t-aside">${aside}</aside>
  </div>`;

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
