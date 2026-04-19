import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { HeritageItem, HeritageRank } from '@/src/types/diTich'

const HERITAGES_DIR = path.join(process.cwd(), 'src/content/di-tich-da-cap-nhat')

const ALLOWED_RANKS = new Set<HeritageRank>([
  'Di tích quốc gia đặc biệt',
  'Di tích quốc gia',
  'Di tích thành phố',
])

function parseFrontmatter(markdown: string): Record<string, string> {
  const normalized = markdown.replace(/\r\n/g, '\n').trim()
  const match = normalized.match(/^---\n([\s\S]*?)\n---\s*$/)
  const body = match ? match[1] : normalized
  const lines = body.split('\n')
  const result: Record<string, string> = {}

  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) {
      continue
    }

    const index = line.indexOf(':')

    if (index === -1) {
      continue
    }

    const key = line.slice(0, index).trim()
    const rawValue = line.slice(index + 1).trim()
    const value = rawValue.replace(/^['"]|['"]$/g, '')

    result[key] = value
  }

  return result
}

function toHeritageItem(fileName: string, data: Record<string, string>): HeritageItem {
  const requiredFields = ['id', 'name', 'slug', 'address', 'rank', 'cover', 'updatedAt', 'note'] as const

  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Thiếu field '${field}' trong file ${fileName}`)
    }
  }

  if (!ALLOWED_RANKS.has(data.rank as HeritageRank)) {
    throw new Error(`Rank không hợp lệ trong file ${fileName}: ${data.rank}`)
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    address: data.address,
    rank: data.rank as HeritageRank,
    cover: data.cover,
    updatedAt: data.updatedAt,
    note: data.note,
  }
}

export async function getHeritages(): Promise<HeritageItem[]> {
  let fileNames: string[] = []

  try {
    fileNames = await fs.readdir(HERITAGES_DIR)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }

  const mdFiles = fileNames.filter((name) => name.endsWith('.md'))

  const items = await Promise.all(
    mdFiles.map(async (fileName) => {
      const fullPath = path.join(HERITAGES_DIR, fileName)
      const markdown = await fs.readFile(fullPath, 'utf-8')
      const frontmatter = parseFrontmatter(markdown)

      return toHeritageItem(fileName, frontmatter)
    }),
  )

  return items.sort((a, b) => Number(a.id) - Number(b.id))
}
