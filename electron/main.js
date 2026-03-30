const { app, BrowserWindow, ipcMain } = require("electron");
const { writeFileSync } = require("fs");
const { resolve } = require("path");
const { execSync } = require("child_process");

const ROOT = resolve(__dirname, "..");
const TREE_DIR = resolve(ROOT, "js/tree");

const branches = [
  { file: "root.js",        export: "rootNodes",        match: (id) => id === "start" || id === "muslim_doubts" },
  { file: "atheist.js",     export: "atheistNodes",     match: (id) => id.startsWith("atheist_") },
  { file: "agnostic.js",    export: "agnosticNodes",    match: (id) => id.startsWith("agnostic_") },
  { file: "monotheist.js",  export: "monotheistNodes",  match: (id) => id.startsWith("monotheist_") || id.startsWith("creator_communicates") || id.startsWith("creator_no_communicate") || id.startsWith("multiple_creators") },
  { file: "polytheist.js",  export: "polytheistNodes",  match: (id) => id.startsWith("polytheist_") },
  { file: "messenger.js",   export: "messengerNodes",   match: (id) => id.startsWith("messenger_") || id.startsWith("muhammad_") || id.startsWith("prophet_") || id.startsWith("which_messenger") || id.startsWith("how_to_know_messenger") },
  { file: "quran.js",       export: "quranNodes",       match: (id) => id.startsWith("quran_") || id.startsWith("embryo_") || id.startsWith("literary_") },
  { file: "purpose.js",     export: "purposeNodes",     match: (id) => id.startsWith("purpose_") || id.startsWith("islam_purpose") || id.startsWith("no_purpose_") || id.startsWith("self_purpose_") },
  { file: "conclusions.js", export: "conclusionNodes",  match: (id, node) => node.type === "conclusion" },
  { file: "dead_ends.js",   export: "deadEndNodes",     match: (id, node) => node.type === "dead_end" },
];

function saveTree(tree) {
  const buckets = Object.fromEntries(branches.map(b => [b.file, {}]));
  const unmatched = {};

  for (const [id, node] of Object.entries(tree)) {
    let placed = false;
    for (const branch of branches) {
      if (branch.match(id, node)) {
        buckets[branch.file][id] = node;
        placed = true;
        break;
      }
    }
    if (!placed) unmatched[id] = node;
  }

  if (Object.keys(unmatched).length > 0) {
    Object.assign(buckets["root.js"], unmatched);
  }

  let totalNodes = 0;
  const details = [];
  for (const branch of branches) {
    const nodes = buckets[branch.file];
    const count = Object.keys(nodes).length;
    totalNodes += count;
    const content = `export const ${branch.export} = ${JSON.stringify(nodes, null, 2)};\n`;
    writeFileSync(resolve(TREE_DIR, branch.file), content, "utf-8");
    details.push(`${branch.file}: ${count} nodes`);
  }

  return { totalNodes, details, unmatched: Object.keys(unmatched) };
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "The Path — Admin",
    webPreferences: {
      preload: resolve(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(resolve(ROOT, "admin.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("save-tree", (_event, tree) => {
  try {
    const result = saveTree(tree);
    return { ok: true, ...result };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle("git-push", () => {
  try {
    execSync("git add js/tree/", { cwd: ROOT, stdio: "pipe" });
    const status = execSync("git diff --cached --name-only", { cwd: ROOT, encoding: "utf-8" }).trim();
    if (status) {
      const timestamp = new Date().toLocaleString();
      execSync(`git commit -m "Update tree content — ${timestamp}"`, { cwd: ROOT, stdio: "pipe" });
      execSync("git push", { cwd: ROOT, stdio: "pipe" });
      return { ok: true, status: "pushed" };
    } else {
      return { ok: true, status: "no_changes" };
    }
  } catch (err) {
    return { ok: false, error: err.message };
  }
});
