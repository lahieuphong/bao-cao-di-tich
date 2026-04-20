import { useMemo, useState } from 'react'
import type { DanhSachItem } from '@/src/data/danhSachDiTich'

interface DanhSachSectionProps {
  items: DanhSachItem[]
}

function normalizeVietnameseText(value: string): string {
  return value
    .toLocaleLowerCase('vi-VN')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshteinDistance(a: string, b: string): number {
  const rows = a.length + 1
  const cols = b.length + 1
  const dp: number[][] = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))

  for (let i = 0; i < rows; i += 1) {
    dp[i][0] = i
  }
  for (let j = 0; j < cols; j += 1) {
    dp[0][j] = j
  }

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      )
    }
  }

  return dp[a.length][b.length]
}

function isApproximateNameMatch(source: string, query: string): boolean {
  if (!query) {
    return true
  }

  if (source.includes(query)) {
    return true
  }

  const sourceTokens = source.split(' ').filter(Boolean)
  const queryTokens = query.split(' ').filter(Boolean)

  if (queryTokens.length === 0) {
    return true
  }

  return queryTokens.every((queryToken) => {
    if (queryToken.length <= 2) {
      return sourceTokens.some((token) => token.startsWith(queryToken))
    }

    return sourceTokens.some((sourceToken) => {
      if (sourceToken.includes(queryToken) || queryToken.includes(sourceToken)) {
        return true
      }
      const maxDistance = Math.max(1, Math.floor(queryToken.length * 0.25))
      return levenshteinDistance(sourceToken, queryToken) <= maxDistance
    })
  })
}

export default function DanhSachSection({ items }: DanhSachSectionProps) {
  const [sttQuery, setSttQuery] = useState('')
  const [nameQuery, setNameQuery] = useState('')

  const listTitle = 'Hiển thị danh sách 126 di tích'
  const targetTotal = Number(listTitle.match(/\d+/)?.[0] ?? 0)

  const progressTotal = useMemo(() => {
    return items.reduce((max, item) => {
      const value = Number(item.stt)
      if (Number.isFinite(value)) {
        return Math.max(max, value)
      }
      return max
    }, 0)
  }, [items])

  const filteredItems = useMemo(() => {
    const normalizedSttQuery = sttQuery.trim().toLocaleLowerCase('vi-VN')
    const normalizedNameQuery = normalizeVietnameseText(nameQuery)

    return items.filter((item) => {
      const sttMatch = normalizedSttQuery
        ? item.stt.toLocaleLowerCase('vi-VN').includes(normalizedSttQuery)
        : true
      const nameMatch = normalizedNameQuery
        ? isApproximateNameMatch(normalizeVietnameseText(item.diTich), normalizedNameQuery)
        : true
      return sttMatch && nameMatch
    })
  }, [items, nameQuery, sttQuery])

  return (
    <section className="mb-9 mt-9 space-y-6 px-5 pb-7 md:px-8 lg:my-0 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:space-y-4 lg:pt-6 lg:pb-6">
      <div className="relative z-10">
        <h2 className="text-[52px] font-semibold tracking-[-0.03em]" style={{ fontSize: 52 / 2 }}>
          {listTitle} ({progressTotal}/{targetTotal})
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0e1422] lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <div className="shrink-0 grid grid-cols-[160px_minmax(0,1fr)] items-center gap-4 px-5 py-3 text-sm font-bold tracking-normal text-white/70">
          <p className="text-center">
            STT
          </p>
          <p className="text-center">
            Di tích
          </p>
        </div>
        <div className="shrink-0 grid grid-cols-[160px_minmax(0,1fr)] gap-4 border-b border-white/10 px-5 py-2.5">
          <input
            type="text"
            value={sttQuery}
            onChange={(event) => setSttQuery(event.target.value)}
            placeholder="Tìm STT..."
            className="h-8 rounded-md border border-white/15 bg-[#0a1326] px-2 text-center text-xs text-white outline-none transition placeholder:text-white/35 focus:border-[#6f8fff]/70"
          />
          <input
            type="text"
            value={nameQuery}
            onChange={(event) => setNameQuery(event.target.value)}
            placeholder="Tìm di tích..."
            className="h-8 rounded-md border border-white/15 bg-[#0a1326] px-2 text-xs text-white outline-none transition placeholder:text-white/35 focus:border-[#6f8fff]/70"
          />
        </div>

        <div className="smooth-scroll-panel min-h-0 max-h-[70vh] overflow-y-auto lg:max-h-none lg:flex-1">
          {filteredItems.map((item) => (
            <div
              key={`${item.stt}-${item.diTich}`}
              className="smooth-interaction grid grid-cols-[160px_minmax(0,1fr)] gap-4 border-b border-white/10 px-5 py-2.5 text-sm text-white/90 hover:-translate-y-[1px] hover:bg-[#16213d] hover:text-white last:border-b-0"
            >
              <p className="text-center font-semibold">{item.stt}</p>
              <p className="font-semibold">{item.diTich.toLocaleUpperCase('vi-VN')}</p>
            </div>
          ))}

          {filteredItems.length === 0 ? (
            <div className="px-5 py-8 text-center text-white/60">
              Không tìm thấy dữ liệu phù hợp.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
