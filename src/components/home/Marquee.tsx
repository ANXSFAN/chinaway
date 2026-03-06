type MarqueeProps = {
  cities: string[]
}

export function Marquee({ cities }: MarqueeProps) {
  const marqueeText = cities.map((c) => `✦  ${c}`).join('   —   ')

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-[#e8e8e8] py-3 bg-cream">
      <div className="inline-block animate-marquee font-dm text-[11px] tracking-[.18em] uppercase text-black/35">
        {marqueeText}   —   {marqueeText}
      </div>
    </div>
  )
}
