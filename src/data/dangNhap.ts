import { promises as fs } from 'node:fs'
import path from 'node:path'

export interface DangNhapItem {
  id: string
  username: string
  password: string
  avatar: string
}

const DANG_NHAP_DIR = path.join(process.cwd(), 'src/content/dang-nhap')
const DEFAULT_AVATAR = '/images/hinh-dai-dien/01-mac-dinh.jpg'

function parseRecord(markdown: string): DangNhapItem | null {
  const result: Partial<DangNhapItem> = {}

  for (const rawLine of markdown.replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      continue
    }

    const idx = line.indexOf(':')
    if (idx === -1) {
      continue
    }

    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '')

    if (key === 'id' || key === 'username' || key === 'password' || key === 'avatar') {
      result[key] = value
    }
  }

  if (!result.id || !result.username || !result.password) {
    return null
  }

  return {
    id: result.id,
    username: result.username,
    password: result.password,
    avatar: result.avatar ?? DEFAULT_AVATAR,
  }
}

export async function getDangNhapItems(): Promise<DangNhapItem[]> {
  let fileNames: string[] = []

  try {
    fileNames = await fs.readdir(DANG_NHAP_DIR)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    throw error
  }

  const mdFiles = fileNames.filter((name) => name.endsWith('.md'))

  const items = await Promise.all(
    mdFiles.map(async (fileName) => {
      const fullPath = path.join(DANG_NHAP_DIR, fileName)
      const markdown = await fs.readFile(fullPath, 'utf8')
      return parseRecord(markdown)
    }),
  )

  return items
    .filter((item): item is DangNhapItem => item !== null)
    .sort((a, b) => Number(a.id) - Number(b.id))
}
