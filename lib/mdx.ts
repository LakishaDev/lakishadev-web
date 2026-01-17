import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/notes");

export interface NoteMetadata {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tags?: string[];
}

export async function getAllNotes(locale: string): Promise<NoteMetadata[]> {
  try {
    const localeDir = path.join(contentDirectory, locale);
    const files = await fs.readdir(localeDir);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const notes = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = path.join(localeDir, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContent);

        return {
          title: data.title,
          excerpt: data.excerpt,
          date: data.date,
          slug: filename.replace(".mdx", ""),
          tags: data.tags || [],
        } as NoteMetadata;
      }),
    );

    return notes.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error reading notes:", error);
    return [];
  }
}

export async function getNoteBySlug(slug: string, locale: string) {
  try {
    const filePath = path.join(contentDirectory, locale, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      metadata: {
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        slug,
        tags: data.tags || [],
      } as NoteMetadata,
      content,
    };
  } catch (error) {
    console.error(`Error reading note ${slug}:`, error);
    return null;
  }
}
