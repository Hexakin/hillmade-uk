import path from "node:path";
import { createFixtures } from "../tests/fixtures";
const root = path.join(process.cwd(), ".qa/content");
createFixtures(root);
console.log(
  "Local fixtures written to .qa/content. These are clearly marked test material, not novel content. Set CONTENT_DIR=.qa/content only for local QA; remove it before your final build or deployment.",
);
