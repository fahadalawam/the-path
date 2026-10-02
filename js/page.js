// Shared behaviour for the question library pages (home and topic pages).
// Pages work without it: the form posts to Formspree directly and
// "Read more" uses <details>.

(function () {
  // ── DARK MODE ───────────────────────────────────────────────────────────────
  const SVG_MOON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  const SVG_SUN = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const root = document.documentElement;
  const darkBtn = document.getElementById("dark-btn");

  function applyTheme() {
    const dark = root.classList.contains("dark");
    darkBtn.innerHTML = dark ? SVG_SUN : SVG_MOON;
    darkBtn.setAttribute("aria-pressed", String(dark));
  }
  applyTheme();
  darkBtn.addEventListener("click", () => {
    const dark = root.classList.toggle("dark");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
    applyTheme();
  });

  // ── CONTACT FORM ────────────────────────────────────────────────────────────
  document.querySelectorAll(".lib-form").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = form.querySelector(".form-err");
      const btn = form.querySelector("button[type=submit]");
      const data = Object.fromEntries(new FormData(form));
      if (!data.name.trim() || !data.email.trim()) {
        err.textContent = form.dataset.err;
        err.classList.remove("hidden");
        return;
      }
      data.page = location.href;
      const label = btn.textContent;
      btn.textContent = form.dataset.sending;
      btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(res.status);
        const done = document.createElement("div");
        done.className = "sent-msg";
        done.setAttribute("role", "status");
        done.textContent = form.dataset.sent;
        form.replaceWith(done);
      } catch {
        err.textContent = form.dataset.failed;
        err.classList.remove("hidden");
        btn.textContent = label;
        btn.disabled = false;
      }
    });
  });
})();
