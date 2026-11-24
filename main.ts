// main.ts — reads entry.txt at runtime and copies it unchanged to
// MAKEFUN_OUTPUT_DIR/entry.txt, rejecting an empty line or one over
// 200 code points, so the graded text is always exactly entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
const text = readFileSync(entryPath, "utf8");
if (text.trim().length === 0) {
  console.error("entry.txt is empty");
  process.exit(1);
}
if ([...text].length > 200) {
  console.error("entry.txt exceeds 200 characters");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text);
