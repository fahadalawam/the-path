#!/usr/bin/env node

/**
 * save-server.js
 *
 * Tiny local server that accepts POST /save with the full tree JSON,
 * splits it into js/tree/*.js source files, and responds with status.
 *
 * Usage:
 *   node scripts/save-server.js
 *
 * Listens on http://localhost:3456
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TREE_DIR = resolve(ROOT, "js/tree");
const PORT = 3456;

// Same branch definitions as update-tree.js
const branches = [
  { file: "root.js",        export: "rootNodes",       match: (id) => id === "start" || id === "muslim_doubts" },
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

  // Unmatched nodes go to root.js
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

const server = createServer((req, res) => {
  // CORS headers for local admin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/save") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const tree = JSON.parse(body);
        const result = saveTree(tree);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, ...result }));
        console.log(`Saved ${result.totalNodes} nodes to ${branches.length} files.`);
      } catch (err) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false, error: err.message }));
        console.error("Save error:", err.message);
      }
    });
    return;
  }

  if (req.method === "POST" && req.url === "/push") {
    try {
      execSync("git add js/tree/", { cwd: ROOT, stdio: "pipe" });
      const status = execSync("git diff --cached --name-only", { cwd: ROOT, encoding: "utf-8" }).trim();
      if (status) {
        const timestamp = new Date().toLocaleString();
        execSync(`git commit -m "Update tree content — ${timestamp}"`, { cwd: ROOT, stdio: "pipe" });
        execSync("git push", { cwd: ROOT, stdio: "pipe" });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, status: "pushed" }));
        console.log("  Git: committed and pushed.");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true, status: "no_changes" }));
        console.log("  Git: no changes to push.");
      }
    } catch (gitErr) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: false, error: gitErr.message }));
      console.error("  Git error:", gitErr.message);
    }
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

server.listen(PORT, () => {
  console.log(`\n  Save server running on http://localhost:${PORT}`);
  console.log(`  Waiting for saves from admin panel...\n`);
});
