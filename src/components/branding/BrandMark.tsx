export default function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-10 w-12 shrink-0">
        <span className="absolute left-0 top-1 h-8 w-3 rotate-[18deg] rounded-full bg-gradient-to-b from-[#ffb067] via-[#ff69c7] to-[#9f7bff]" />
        <span className="absolute left-3 top-1 h-8 w-3 -rotate-[14deg] rounded-full bg-gradient-to-b from-[#ff69c7] via-[#b574ff] to-[#7a8cff]" />
        <span className="absolute left-7 top-1 h-8 w-3 rotate-[12deg] rounded-full bg-gradient-to-b from-[#7a8cff] via-[#8a7dff] to-[#7ad3ff]" />
      </div>

      <div className="text-[22px] font-semibold tracking-[-0.04em] text-white">
        motionsites
      </div>
    </div>
  )
}