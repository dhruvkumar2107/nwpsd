import { readFileSync } from "fs"
import { join } from "path"

const contentDir = join(process.cwd(), "src", "content")

export function readMdxFile(category: string, slug: string): string {
  const filePath = join(contentDir, category, `${slug}.mdx`)
  return readFileSync(filePath, "utf-8")
}

export function readJsonFile(filename: string): unknown {
  const filePath = join(contentDir, filename)
  return JSON.parse(readFileSync(filePath, "utf-8"))
}
