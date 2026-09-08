import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "src", "content")

export function getMdxContent<T extends Record<string, unknown>>(
  category: string,
  slug: string
): { frontmatter: T; content: string } | null {
  const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(raw)

  return {
    frontmatter: data as T,
    content,
  }
}

export function getAllMdxSlugs(category: string): string[] {
  const dir = path.join(CONTENT_DIR, category)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getAllMdxContent<T extends Record<string, unknown>>(
  category: string
): Array<{ slug: string; frontmatter: T; content: string }> {
  const slugs = getAllMdxSlugs(category)
  return slugs
    .map((slug) => {
      const result = getMdxContent<T>(category, slug)
      if (!result) return null
      return { slug, ...result }
    })
    .filter(Boolean) as Array<{ slug: string; frontmatter: T; content: string }>
}

export function getJsonContent<T>(filename: string): T {
  const filePath = path.join(CONTENT_DIR, filename)
  const raw = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(raw) as T
}
