// Behaviour for the question library (index.html, ar/, q/). The pages are
// static HTML built by scripts/build-library.mjs and work without this file:
// forms post to Formspree directly and "Read more" uses <details>.
//
//   • dark mode toggle (shares the "theme" key with journey.html)
//   • objection form, sent to Formspree without leaving the page
//   • home page: the "I was raised ___, and today I ___" sentence and the
//     field of 1,000 dots

(function () {
  const root = document.documentElement;
  const lang = root.lang === "ar" ? "ar" : "en";
  const $ = (id) => document.getElementById(id);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── DARK MODE ───────────────────────────────────────────────────────────────
  const SVG_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const SVG_SUN = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const darkBtn = $("dark-btn");
  function paintTheme() {
    const dark = root.classList.contains("dark");
    darkBtn.innerHTML = dark ? SVG_SUN : SVG_MOON;
    darkBtn.setAttribute("aria-pressed", String(dark));
  }
  if (darkBtn) {
    paintTheme();
    darkBtn.addEventListener("click", () => {
      const dark = root.classList.toggle("dark");
      try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
      paintTheme();
    });
  }

  // ── OBJECTION FORM ──────────────────────────────────────────────────────────
  document.querySelectorAll("form.ask-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const note = form.querySelector(".sent");
      const btn = form.querySelector("button[type=submit]");
      const data = Object.fromEntries(new FormData(form));
      note.classList.remove("err");
      if (!String(data.message || "").trim() || !String(data.email || "").trim()) {
        note.textContent = form.dataset.err;
        note.classList.add("err");
        return;
      }
      data.page = location.href;
      const label = btn.textContent;
      btn.textContent = form.dataset.sending;
      btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(res.status);
        const done = document.createElement("p");
        done.className = "done";
        done.setAttribute("role", "status");
        done.textContent = form.dataset.sent;
        form.replaceWith(done);
      } catch (err) {
        note.textContent = form.dataset.failed;
        note.classList.add("err");
        btn.textContent = label;
        btn.disabled = false;
      }
    });
  });

  // ── HOME: THE SENTENCE AND THE DOT FIELD ────────────────────────────────────
  const cv = $("field");
  if (!cv) return;
  const QMAP = JSON.parse($("qmap").textContent);

  const S = {
    en: {
      you: "You", tip: "about 8 million people",
      canvas: (n, fig, cap) => "1,000 dots, one for every 8 million people. " + n + " are highlighted: " + fig + " " + cap,
    },
    ar: {
      you: "أنت", tip: "نحو 8 ملايين شخص",
      canvas: (n, fig, cap) => "ألف نقطة، كل نقطة نحو 8 ملايين شخص. منها " + n + " مميّزة: " + fig + " " + cap,
    },
  }[lang];

  // Pew Research Center (2025), figures for 2020. 1,000 dots, each about 7.9 million people.
  const GROUPS = {
    christian: { n: 288, left: 17 },
    muslim: { n: 256, left: 1 },
    none: { n: 242 },
    hindu: { n: 149, left: 1 },
    buddhist: { n: 41, left: 22 },
    other: { n: 22 },
    jewish: { n: 2 },
  };
  const ORDER = ["christian", "muslim", "none", "hindu", "buddhist", "other", "jewish"];
  const G = {
    en: {
      christian: { fig: "2.3 billion", cap: "people are Christian.", key: "Christian", stat: "About 83 in 100 people raised Christian still are." },
      muslim: { fig: "2.0 billion", cap: "people are Muslim.", key: "Muslim", stat: "About 99 in 100 people raised Muslim still are." },
      none: { fig: "1.9 billion", cap: "people have no religion.", key: "No religion", stat: "More than 9 in 10 people raised with no religion still have none." },
      hindu: { fig: "1.2 billion", cap: "people are Hindu.", key: "Hindu", stat: "About 99 in 100 people raised Hindu still are." },
      buddhist: { fig: "324 million", cap: "people are Buddhist.", key: "Buddhist", stat: "About 78 in 100 people raised Buddhist still are." },
      other: { fig: "172 million", cap: "people follow other religions.", key: "Other religions", stat: "Most people keep the religion they were raised in." },
      jewish: { fig: "14.8 million", cap: "people are Jewish. That’s two dots out of 1,000.", key: "Jewish", stat: "Most people keep the religion they were raised in." },
    },
    ar: {
      christian: { fig: "2.3 مليار", cap: "مسيحي حول العالم.", key: "المسيحيون", stat: "نحو 83 من كل 100 ممن نشؤوا مسيحيين ما زالوا كذلك." },
      muslim: { fig: "2.0 مليار", cap: "مسلم حول العالم.", key: "المسلمون", stat: "نحو 99 من كل 100 ممن نشؤوا مسلمين ما زالوا كذلك." },
      none: { fig: "1.9 مليار", cap: "شخص بلا دين.", key: "بلا دين", stat: "أكثر من 9 من كل 10 ممن نشؤوا بلا دين ما زالوا بلا دين." },
      hindu: { fig: "1.2 مليار", cap: "هندوسي حول العالم.", key: "الهندوس", stat: "نحو 99 من كل 100 ممن نشؤوا هندوسًا ما زالوا كذلك." },
      buddhist: { fig: "324 مليون", cap: "بوذي حول العالم.", key: "البوذيون", stat: "نحو 78 من كل 100 ممن نشؤوا بوذيين ما زالوا كذلك." },
      other: { fig: "172 مليون", cap: "يتّبعون أديانًا أخرى.", key: "أديان أخرى", stat: "معظم الناس يبقون على الدين الذي نشؤوا عليه." },
      jewish: { fig: "14.8 مليون", cap: "يهودي حول العالم. أي نقطتان فقط من أصل ألف.", key: "اليهود", stat: "معظم الناس يبقون على الدين الذي نشؤوا عليه." },
    },
  }[lang];
  const TODAY = {
    en: {
      rel: [["keep", "still believe it"], ["doubt", "have doubts"], ["nogod", "believe in no God"], ["unsure", "am not sure"]],
      none: [["keep", "still have none"], ["god", "believe in God"], ["unsure", "am not sure"]],
    },
    ar: {
      rel: [["keep", "ما زلتُ مؤمنًا به"], ["doubt", "تساورني شكوك"], ["nogod", "لا أؤمن بوجود إله"], ["unsure", "لستُ متأكدًا"]],
      none: [["keep", "ما زلتُ بلا دين"], ["god", "أؤمن بالله"], ["unsure", "لستُ متأكدًا"]],
    },
  }[lang];

  // Which question to start with, given the sentence.
  const FIRST = { christian: "muhammad", jewish: "muhammad", muslim: "quran-preserved", hindu: "one-god", other: "one-god", buddhist: "cause" };
  function firstSlug(r, t) {
    if (t === "nogod") return "beginning";
    if (t === "unsure") return "reality";
    if (r === "none") return t === "god" ? "revelation" : "beginning";
    return FIRST[r];
  }
  function ctxLine(r, t) {
    const left = GROUPS[r].left;
    if (lang === "ar") {
      if (t === "keep") return r === "muslim" ? "مثلك تمامًا. لكن أن تولد على الحق لا يعني أن تعرف لماذا هو حق." : "مثلك تمامًا. فهل اخترته، أم ورثته؟";
      if (t === "doubt") return "ما زلت واحدًا منهم، لكنك بدأت تسأل. هذا جيد، فاستمر.";
      if (t === "nogod") return (left === 1 ? "لا يتركه إلا نحو واحد من كل 100، وأنت منهم. " : left ? "أنت من الـ" + left + " من كل 100 الذين تركوه. " : "لقد تركته. ") + "تطلّب ذلك سؤالًا حقيقيًا، فاطرح السؤال التالي.";
      if (t === "god") return "لقد بدأت تبحث أبعد من ذلك. لنرَ إلى أين يقودك هذا.";
      return "ألّا تكون متأكدًا بدايةٌ صادقة.";
    }
    if (t === "keep") return r === "muslim" ? "Like you. But being born into the truth isn’t the same as knowing why it’s true." : "Like you. Did you choose it, or inherit it?";
    if (t === "doubt") return "You’re still one of them, but you’re asking questions. Good. Keep going.";
    if (t === "nogod") return (left === 1 ? "Only about 1 in 100 leave, and you did. " : left ? "You’re one of the " + left + " in 100 who left. " : "You left. ") + "That took a real question. Now ask the next one.";
    if (t === "god") return "You’ve already started looking further. Let’s see where it leads.";
    return "Not being sure is an honest place to start.";
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (s) => esc(s).replace(/ﷺ/g, '<span class="saw">ﷺ</span>');

  // Seeded shuffle so the crowd is the same on every visit
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const rnd = mulberry(2020), who = [];
  ORDER.forEach((g) => { for (let k = 0; k < GROUPS[g].n; k++) who.push(g); });
  for (let i = who.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)), s = who[i]; who[i] = who[j]; who[j] = s; }
  const N = who.length;

  const ctx = cv.getContext("2d"), box = cv.parentNode, tip = $("tip");
  let W = 0, H = 0, cols = 50, sp = 10, rad = 3, group = "christian", you = -1, hover = -1;
  const from = new Float32Array(N), to = new Float32Array(N), delay = new Float32Array(N);
  let t0 = 0, youT0 = -1e9, raf = 0;
  const DUR = 340, SPREAD = 720;

  function pos(k) { return [(k % cols + .5) * sp, (Math.floor(k / cols) + .5) * sp]; }
  function pickYou(g) {
    const tx = W * (W >= 640 ? .66 : .6), ty = H * (W >= 640 ? .42 : .24);
    let best = -1, bd = Infinity;
    for (let k = 0; k < N; k++) { if (who[k] !== g) continue; const p = pos(k), d = (p[0] - tx) ** 2 + (p[1] - ty) ** 2; if (d < bd) { bd = d; best = k; } }
    return best;
  }
  function layout() {
    const w = box.clientWidth; if (!w) return;
    W = w; cols = W >= 640 ? 50 : 25; sp = W / cols; rad = Math.max(2.4, sp * .3); H = Math.round(Math.ceil(N / cols) * sp);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    you = pickYou(group);
  }
  function rgb(c) {
    c = c.trim();
    if (c.charAt(0) === "#") { if (c.length === 4) c = "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3]; return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
    const m = c.match(/[\d.]+/g); return m ? [+m[0], +m[1], +m[2]] : [128, 128, 128];
  }
  function tokens() {
    const st = getComputedStyle(root);
    return { dot: rgb(st.getPropertyValue("--dot")), hi: rgb(st.getPropertyValue("--lapis")), you: st.getPropertyValue("--verm").trim(), panel: st.getPropertyValue("--panel").trim(), ink: st.getPropertyValue("--ink").trim(), bg: st.getPropertyValue("--bg").trim() };
  }
  const ease = (p) => 1 - Math.pow(1 - p, 3);
  const prog = (k, now) => Math.min(1, Math.max(0, (now - t0 - delay[k]) / DUR));
  function value(k, now) { const f = from[k], g = to[k]; return f === g ? g : f + (g - f) * ease(prog(k, now)); }
  function pill(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  function draw() {
    raf = 0;
    if (!W) return;
    const now = performance.now(), C = tokens();
    let busy = false;
    ctx.clearRect(0, 0, W, H);
    for (let k = 0; k < N; k++) {
      const f = from[k], g = to[k];
      let p = 1, bump = 0;
      if (f !== g) { p = prog(k, now); if (p < 1) busy = true; bump = Math.sin(Math.PI * p) * .55; }
      const v = f === g ? g : f + (g - f) * ease(p), xy = pos(k);
      ctx.fillStyle = "rgb(" + Math.round(C.dot[0] + (C.hi[0] - C.dot[0]) * v) + "," + Math.round(C.dot[1] + (C.hi[1] - C.dot[1]) * v) + "," + Math.round(C.dot[2] + (C.hi[2] - C.dot[2]) * v) + ")";
      ctx.beginPath(); ctx.arc(xy[0], xy[1], rad * (1 + bump), 0, 6.2832); ctx.fill();
    }
    if (hover >= 0 && hover !== you) { const hp = pos(hover); ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(hp[0], hp[1], rad + 3, 0, 6.2832); ctx.stroke(); }
    if (you >= 0) {
      const q = reduce ? 1 : Math.min(1, (now - youT0) / 420); if (q < 1) busy = true;
      const e = ease(q), y = pos(you), ring = Math.max(rad * 2.1, 9);
      ctx.fillStyle = C.panel; ctx.beginPath(); ctx.arc(y[0], y[1], (ring + 2) * e, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = C.you; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(y[0], y[1], ring * e, 0, 6.2832); ctx.stroke();
      ctx.fillStyle = C.you; ctx.beginPath(); ctx.arc(y[0], y[1], Math.max(rad * 1.05, 3.5), 0, 6.2832); ctx.fill();
      ctx.font = lang === "ar" ? '700 14px "IBM Plex Sans Arabic", system-ui, sans-serif' : '700 13px "Schibsted Grotesk", system-ui, sans-serif';
      const pw = ctx.measureText(S.you).width + 18, ph = 24;
      const right = y[0] + ring + 6, left = y[0] - ring - 6 - pw;
      const lx = lang === "ar" ? (left > 2 ? left : right) : (right + pw <= W - 2 ? right : left);
      let ly = y[1] - ring - ph + 4;
      if (ly < 2) ly = y[1] + ring + 2;
      ctx.globalAlpha = e; ctx.fillStyle = C.ink; pill(lx, ly, pw, ph, 12); ctx.fill();
      ctx.fillStyle = C.bg; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(S.you, lx + pw / 2, ly + ph / 2 + .5); ctx.globalAlpha = 1;
    }
    if (busy) raf = requestAnimationFrame(draw);
  }
  function redraw() { if (!raf) raf = requestAnimationFrame(draw); }

  function setGroup(g) {
    const now = performance.now();
    for (let k = 0; k < N; k++) { from[k] = value(k, now); to[k] = who[k] === g ? 1 : 0; }
    group = g; you = pickYou(g); youT0 = now; t0 = now;
    const o = pos(you), maxd = Math.hypot(W, H) || 1;
    for (let k = 0; k < N; k++) { const p = pos(k); delay[k] = reduce ? 0 : Math.hypot(p[0] - o[0], p[1] - o[1]) / maxd * SPREAD; }
    if (reduce) { for (let k = 0; k < N; k++) from[k] = to[k]; }
    redraw();
  }

  // The sentence
  const raised = $("raised"), today = $("today");
  const meas = document.createElement("span");
  meas.setAttribute("aria-hidden", "true");
  meas.style.cssText = "position:absolute;top:-9999px;left:0;visibility:hidden;white-space:pre;pointer-events:none";
  document.body.appendChild(meas);
  function fit(sel) {
    const st = getComputedStyle(sel);
    meas.style.fontFamily = st.fontFamily; meas.style.fontSize = st.fontSize; meas.style.fontWeight = st.fontWeight; meas.style.letterSpacing = st.letterSpacing;
    meas.textContent = sel.options[sel.selectedIndex].text;
    sel.style.width = Math.ceil(meas.getBoundingClientRect().width + parseFloat(st.fontSize) * 1.1) + "px";
  }
  function fillToday() {
    const list = TODAY[raised.value === "none" ? "none" : "rel"], keep = today.value;
    today.innerHTML = "";
    list.forEach((o) => today.add(new Option(o[1], o[0])));
    today.value = list.some((o) => o[0] === keep) ? keep : "keep";
  }
  function swap(id, html) {
    const el = $(id);
    if (el.innerHTML === html) return;
    if (reduce) { el.innerHTML = html; return; }
    el.classList.add("out");
    setTimeout(() => { el.innerHTML = html; el.classList.remove("out"); }, 160);
  }
  function update() {
    const r = raised.value, t = today.value, g = G[r], q = QMAP[firstSlug(r, t)];
    swap("fig", esc(g.fig)); swap("cap", esc(g.cap)); swap("stat", esc(g.stat)); swap("ctx", esc(ctxLine(r, t)));
    swap("firstq", fmt(q.t));
    $("firstq").href = $("firstbtn").href = q.h;
    $("k-label").textContent = g.key;
    cv.setAttribute("aria-label", S.canvas(GROUPS[r].n, g.fig, g.cap));
  }
  raised.addEventListener("change", () => { fillToday(); fit(raised); fit(today); update(); setGroup(raised.value); });
  today.addEventListener("change", () => { fit(today); update(); });

  // Hover: which group is this dot?
  cv.addEventListener("pointermove", (ev) => {
    const b = cv.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, c = Math.floor(x / sp), rw = Math.floor(y / sp), k = rw * cols + c;
    if (c < 0 || c >= cols || rw < 0 || k < 0 || k >= N) { tip.hidden = true; hover = -1; redraw(); return; }
    tip.textContent = (k === you ? S.you + " · " : "") + G[who[k]].key + " · " + S.tip;
    tip.hidden = false;
    const hw = tip.offsetWidth / 2, p = pos(k);
    tip.style.left = Math.min(Math.max(p[0], hw + 2), W - hw - 2) + "px";
    tip.style.top = (p[1] - rad - 8) + "px";
    if (hover !== k) { hover = k; redraw(); }
  });
  cv.addEventListener("pointerleave", () => { tip.hidden = true; hover = -1; redraw(); });

  // Start: the sentence as the page was built (a reload may have kept other choices)
  if (raised.value === "none") fillToday();
  group = raised.value;
  layout();
  for (let i = 0; i < N; i++) from[i] = to[i] = who[i] === group ? 1 : 0;
  update();
  fit(raised); fit(today);
  redraw();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fit(raised); fit(today); redraw(); });
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { if (box.clientWidth && box.clientWidth !== W) { layout(); redraw(); } fit(raised); fit(today); }, 120); });
  new MutationObserver(redraw).observe(root, { attributes: true, attributeFilter: ["class"] });
})();
