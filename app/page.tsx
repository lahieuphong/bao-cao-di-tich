import HeritagesPageClient from '@/src/components/BaoCaoDiTichPageClient'
import { getDanhSachItems } from '@/src/data/danhSachDiTich'
import { getDangNhapItems } from '@/src/data/dangNhap'
import { getHeritages } from '@/src/data/diTichDaCapNhat'

export default async function HomePage() {
  const heritages = await getHeritages()
  const danhSachItems = await getDanhSachItems()
  const dangNhapItems = await getDangNhapItems()

  return (
    <HeritagesPageClient
      heritages={heritages}
      danhSachItems={danhSachItems}
      dangNhapItems={dangNhapItems}
    />
  )
}
