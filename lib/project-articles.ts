import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

const articlesDirectory = path.join(process.cwd(), "content", "projects");

async function readArticle(filename: string): Promise<string | null> {
  if (path.basename(filename) !== filename) return null;

  try {
    return await readFile(path.join(articlesDirectory, filename), "utf8");
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }

    throw error;
  }
}

export async function getProjectArticles(slug: string) {
  const [en, es] = await Promise.all([
    readArticle(`${slug}.en.md`),
    readArticle(`${slug}.es.md`),
  ]);

  return { en, es };
}
