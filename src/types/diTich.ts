export type HeritageRank =
  | 'Di tích quốc gia đặc biệt'
  | 'Di tích quốc gia'
  | 'Di tích thành phố'

export interface HeritageItem {
  id: string
  name: string
  slug: string
  address: string
  rank: HeritageRank
  cover: string
  updatedAt: string
  note: string
}
