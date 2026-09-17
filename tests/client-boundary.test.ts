import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
test("shared site metadata has no filesystem dependency in the client import graph", () => {
  const seen = new Set<string>();
  function check(file: string) {
    if (seen.has(file)) return;
    seen.add(file);
    const text = fs.readFileSync(file, "utf8");
    assert.ok(!/from ["']node:fs["']/.test(text), file);
    for (const match of text.matchAll(/import (?!type )[^;]+from ["'](\.[^"']+)["']/g)) {
      const dependency = path.resolve(path.dirname(file), match[1]);
      const target = [dependency + ".ts", dependency + ".tsx"].find(p => fs.existsSync(p));
      if (target) check(target);
    }
  }
  check(path.resolve("lib/site.ts"));
});
