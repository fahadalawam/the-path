#!/usr/bin/env node

/**
 * update-tree.js
 *
 * Reads the-path-data.json (exported from admin panel) and splits it
 * into individual js/tree/*.js source files for deployment.
 *
 * Usage:
 *   node scripts/update-tree.js [path-to-json]
 *
 * If no path is given, looks for the-path-data.json in the project root.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const TREE_DIR = resolve(ROOT, "js/tree");

// Resolve input file
const inputPath = process.argv[2]
  ? resolve(process.argv[2])
  : resolve(ROOT, "the-path-data.json");

let tree;
try {
  tree = JSON.parse(readFileSync(inputPath, "utf-8"));
} catch (err) {
  console.error(`Error reading ${inputPath}: ${err.message}`);
  console.error("\nExport the tree from the admin panel first (Export JSON button).");
  process.exit(1);
}

// Branch definitions: { filename, exportName, matcher(id, node) }
const branches = [
  { file: "root.js",         export: "rootNodes",        match: (id) => id === "start" || id === "muslim_doubts" },
  { file: "atheist.js",      export: "atheistNodes",      match: (id) => id.startsWith("atheist_") },
  { file: "agnostic.js",     export: "agnosticNodes",     match: (id) => id.startsWith("agnostic_") },
  { file: "monotheist.js",   export: "monotheistNodes",   match: (id) => id.startsWith("monotheist_") || id.startsWith("creator_communicates") || id.startsWith("creator_no_communicate") || id.startsWith("multiple_creators") },
  { file: "polytheist.js",   export: "polytheistNodes",   match: (id) => id.startsWith("polytheist_") },
  { file: "messenger.js",    export: "messengerNodes",    match: (id) => id.startsWith("messenger_") || id.startsWith("muhammad_") || id.startsWith("prophet_") || id.startsWith("which_messenger") || id.startsWith("how_to_know_messenger") },
  { file: "quran.js",        export: "quranNodes",        match: (id) => id.startsWith("quran_") || id.startsWith("embryo_") || id.startsWith("literary_") },
  { file: "purpose.js",      export: "purposeNodes",      match: (id) => id.startsWith("purpose_") || id.startsWith("islam_purpose") || id.startsWith("no_purpose_") || id.startsWith("self_purpose_") },
  { file: "conclusions.js",  export: "conclusionNodes",   match: (id, node) => node.type === "conclusion" },
  { file: "dead_ends.js",    export: "deadEndNodes",      match: (id, node) => node.type === "dead_end" },
];

// Sort nodes into branches
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
  if (!placed) {
    unmatched[id] = node;
  }
}

// Put unmatched nodes in root.js
if (Object.keys(unmatched).length > 0) {
  Object.assign(buckets["root.js"], unmatched);
  console.log(`Note: ${Object.keys(unmatched).length} node(s) with no matching branch placed in root.js:`);
  for (const id of Object.keys(unmatched)) {
    console.log(`  - ${id}`);
  }
}

// Write each branch file
let totalNodes = 0;
for (const branch of branches) {
  const nodes = buckets[branch.file];
  const count = Object.keys(nodes).length;
  totalNodes += count;

  const content = `export const ${branch.export} = ${JSON.stringify(nodes, null, 2)};\n`;
  const filePath = resolve(TREE_DIR, branch.file);
  writeFileSync(filePath, content, "utf-8");
  console.log(`  ${branch.file} — ${count} nodes`);
}

console.log(`\nDone. ${totalNodes} nodes written to ${branches.length} files in js/tree/.`);
