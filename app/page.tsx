import HeritagesPageClient from '@/src/components/BaoCaoDiTichPageClient'
import { getDanhSachItems } from '@/src/data/danhSachDiTich'
import { getHeritages } from '@/src/data/diTichDaCapNhat'

export default async function HomePage() {
  const heritages = await getHeritages()
  const danhSachItems = await getDanhSachItems()

  return <HeritagesPageClient heritages={heritages} danhSachItems={danhSachItems} />
}
