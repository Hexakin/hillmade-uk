import fs from "node:fs";
import path from "node:path";
import { contentRoot, readSources } from "../lib/content";
import { changeFullText, publicationReport } from "../lib/publication";
const command = process.argv[2] || "report";
const root = contentRoot();
if (command === "report")
  console.log(JSON.stringify(publicationReport(root), null, 2));
else if (command === "withdraw" || command === "restore") {
  const { book } = readSources(root);
  const auditRoot = path.join(process.cwd(), ".publication");
  fs.mkdirSync(auditRoot, { recursive: true });
  const stamp = new Date().toISOString().replaceAll(":", "-");
  const next = changeFullText(book, command === "restore");
  fs.writeFileSync(
    path.join(auditRoot, `${stamp}-${command}.json`),
    JSON.stringify(
      {
        command,
        before: book,
        after: next,
        reportBefore: publicationReport(root),
      },
      null,
      2,
    ) + "\n",
  );
  fs.writeFileSync(
    path.join(root, "book/book.json"),
    JSON.stringify(next, null, 2) + "\n",
  );
  console.log(
    `Full text ${next.fullTextEnabled ? "enabled" : "withdrawn"}. Sources and chapter statuses preserved. Audit saved under .publication/. Rebuild and deploy to change the live site.`,
  );
} else throw new Error("Use report, withdraw or restore");
