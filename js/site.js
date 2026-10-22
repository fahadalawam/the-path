// Behaviour for the question library (index.html, ar/, q/). The pages are
// static HTML built by scripts/build-library.mjs and work without this file:
// forms post to Formspree directly and "Read more" uses <details>.
//
//   • dark mode toggle (shares the "theme" key with journey.html)
//   • objection form, sent to Formspree without leaving the page
//   • home page: the "I was raised ___, and today I ___" sentence

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

  // ── HOME: THE SENTENCE ──────────────────────────────────────────────────────
  // "I was raised ___, and today I ___." The line under it and the first
  // question change with the reader's choices.
  const raised = $("raised"), today = $("today");
  if (!raised || !today) return;
  const QMAP = JSON.parse($("qmap").textContent);

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
  // A reply to the sentence, under Pew's finding that most people keep the
  // religion they were raised in.
  function ctxLine(r, t) {
    if (lang === "ar") {
      if (t === "keep") return r === "muslim" ? "لكن أن تولد على الحق لا يعني أن تعرف لماذا هو حق." : r === "none" ? "فهل اخترت ذلك، أم ورثته؟" : "فهل اخترت دينك، أم ورثته؟";
      if (t === "doubt") return "وأنت بدأت تسأل. هذا جيد، فاستمر.";
      if (t === "nogod") return "أما أنت فلم تبقَ عليه. تطلّب ذلك سؤالًا حقيقيًا، فاطرح السؤال التالي.";
      if (t === "god") return "أما أنت فبدأت تبحث أبعد من ذلك.";
      return "وألّا تكون متأكدًا بداية صادقة.";
    }
    if (t === "keep") return r === "muslim" ? "But being born into the truth isn’t the same as knowing why it’s true." : r === "none" ? "Did you choose that, or inherit it?" : "Did you choose yours, or inherit it?";
    if (t === "doubt") return "You’re asking questions. Good. Keep going.";
    if (t === "nogod") return "You didn’t stay. That took a real question. Now ask the next one.";
    if (t === "god") return "You’ve already started looking further.";
    return "Not being sure is an honest place to start.";
  }

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (s) => esc(s).replace(/ﷺ/g, '<span class="saw">ﷺ</span>');

  // Each select is as wide as its chosen words, so the sentence reads as one line.
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
    const r = raised.value, t = today.value, q = QMAP[firstSlug(r, t)];
    swap("ctx", esc(ctxLine(r, t)));
    swap("firstq-t", fmt(q.t));
    $("firstq").href = q.h;
  }
  raised.addEventListener("change", () => { fillToday(); fit(raised); fit(today); update(); });
  today.addEventListener("change", () => { fit(today); update(); });

  // Start from the sentence as the page was built (a reload may keep other choices).
  if (raised.value === "none") fillToday();
  update();
  fit(raised); fit(today);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fit(raised); fit(today); });
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { fit(raised); fit(today); }, 120); });
})();
