'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-[6%]">
      <div className="text-center">
        <h1 className="font-playfair text-4xl font-bold mb-4">Error</h1>
        <p className="font-dm text-gray mb-8">Algo salio mal / Something went wrong / 出了点问题</p>
        <button onClick={reset} className="font-dm text-xs font-medium tracking-[.12em] uppercase px-8 py-3.5 bg-red text-white hover:bg-red-dark transition-colors">
          Reintentar / Retry / 重试
        </button>
      </div>
    </section>
  )
}
