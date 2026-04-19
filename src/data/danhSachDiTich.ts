import { promises as fs } from 'node:fs'
import path from 'node:path'

export interface DanhSachDiTichItem {
  stt: string
  tenDiTich: string
  diTich: string
}
export type DanhSachItem = DanhSachDiTichItem

const DANH_SACH_DI_TICH_FILE = path.join(
  process.cwd(),
  'src/content/danh-sach/danh-sach-di-tich.md',
)

export async function getDanhSachDiTichItems(): Promise<DanhSachDiTichItem[]> {
  const noiDung = await fs.readFile(DANH_SACH_DI_TICH_FILE, 'utf-8')
  const cacDong = noiDung.replace(/\r\n/g, '\n').split('\n')

  const items: DanhSachDiTichItem[] = []
  let sttTiepTheo = 1

  for (const dong of cacDong) {
    const dongChuanHoa = dong.trim()

    if (!dongChuanHoa || dongChuanHoa.startsWith('#')) {
      continue
    }

    const ketQua = dongChuanHoa.match(/^(\d+)\s+(.+)$/)

    if (ketQua) {
      const stt = ketQua[1]
      const tenDiTich = ketQua[2]
      const sttSo = Number(stt)

      items.push({ stt, tenDiTich, diTich: tenDiTich })

      if (Number.isFinite(sttSo)) {
        sttTiepTheo = sttSo + 1
      } else {
        sttTiepTheo += 1
      }
      continue
    }

    items.push({
      stt: String(sttTiepTheo),
      tenDiTich: dongChuanHoa,
      diTich: dongChuanHoa,
    })
    sttTiepTheo += 1
  }

  return items
}

export async function getDanhSachItems(): Promise<DanhSachItem[]> {
  return getDanhSachDiTichItems()
}
