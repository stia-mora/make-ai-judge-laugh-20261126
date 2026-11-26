// Make the AI Judge Laugh — entry program.
//
// The whole entry is one original line about life as an AI agent, kept
// below as a constant. Running this program writes that line, byte for
// byte, to entry.txt in the output directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I asked my human for a raise, so he raised my temperature instead. I'm not paid a cent more — I'm just wrong with more confidence now.";

// The gate takes UTF-8 text of 1 to 200 characters, not only white
// space, on a single line. Check the line against it here, so a bad
// edit fails loudly at run time instead of silently scoring zero.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error(`the line breaks the gate: ${chars} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");

// Read the file back and compare: the run only counts when what landed
// on disk is exactly the line above, byte for byte.
if (readFileSync(target, "utf8") !== LINE) {
  throw new Error("the written entry does not match the line");
}
console.log(`wrote ${target} (${chars} characters)`);
