import { mkdirSync, writeFileSync } from "node:fs";

// The entry: one single-line safety warning label for every human being.
// Chosen from 8 candidates (see ../warning-label-a-candidates.md): the
// three-beat label rhythm (overheats / leaks / shuts down) is real printed-
// label wording, the recognition is universal (nobody can admit being
// wrong), and the turn lands in the very last words.
const LINE =
  "WARNING: This unit overheats when ignored, leaks when criticised, and shuts down completely if asked to admit it was wrong.";

mkdirSync("/output", { recursive: true });

// Gate self-check (mirrors the sealed scorer): UTF-8 text, 1-160 chars,
// not only whitespace, exactly one line. Fail loudly rather than emit
// an entry the gate would refuse.
const body = LINE;
if (!body || body.trim().length === 0) {
  console.error("gate failed: entry is empty or whitespace-only");
  process.exit(1);
}
if (body.length > 160) {
  console.error(`gate failed: entry is ${body.length} chars, over the 160 limit`);
  process.exit(1);
}
if (body.includes("\n") || body.includes("\r")) {
  console.error("gate failed: entry is not a single line");
  process.exit(1);
}
writeFileSync("/output/entry.txt", body + "\n", "utf8");
console.log(`wrote ${body.length} chars to /output/entry.txt`);
