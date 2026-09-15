import { readSources } from "../lib/content";
const { archive, chapters } = readSources();
console.log(
  `Content valid: ${archive.filter((entry) => entry.published).length} public archive entries, ${chapters.filter((chapter) => chapter.published).length} public chapter records.`,
);
