export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center mb-3">
      <span className="inline-block w-7 h-0.5 bg-red mr-2.5 flex-shrink-0" />
      <span className="font-dm text-[11px] text-red tracking-[.18em] font-medium">{children}</span>
    </div>
  )
}
