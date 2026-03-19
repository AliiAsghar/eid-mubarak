'use client'

import * as React from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type EidLoveCarouselProps = {
  quotes: string[]
}

const IMAGE_SOURCES: string[] = [
  '/placeholder-user.jpg',
  '/placeholder.jpg',
  '/placeholder-logo.png',
  '/apple-icon.png',
  '/icon-dark-32x32.png',
  '/icon-light-32x32.png',
  '/placeholder.svg',
  '/icon.svg',
]

export default function EidLoveCarousel({ quotes }: EidLoveCarouselProps) {
  const safeQuotes = React.useMemo(() => {
    if (quotes.length !== 8) return quotes.slice(0, 8)
    return quotes
  }, [quotes])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
    },
    [],
  )

  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap())
    }

    onSelect()
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const scrollTo = React.useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const dots = React.useMemo(() => {
    const count = Math.min(8, safeQuotes.length)
    return new Array(count).fill(0).map((_, i) => i)
  }, [safeQuotes.length])

  const canRender = safeQuotes.length >= 1

  if (!canRender) return null

  return (
    <section className="relative w-full">
      <div className="relative">
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full size-10 bg-white/10 border border-white/15 hover:bg-white/20 transition-all text-white flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ArrowLeft className="size-5" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full size-10 bg-white/10 border border-white/15 hover:bg-white/20 transition-all text-white flex items-center justify-center"
          aria-label="Next slide"
        >
          <ArrowRight className="size-5" />
        </button>

        <div
          ref={emblaRef}
          className="overflow-hidden rounded-3xl border border-white/10 bg-black/10"
        >
          <div className="flex">
            {IMAGE_SOURCES.slice(0, safeQuotes.length).map((src, idx) => {
              const quote = safeQuotes[idx] ?? ''
              const slideGlow = [
                'from-yellow-400/25 via-transparent to-transparent',
                'from-amber-400/25 via-transparent to-transparent',
                'from-pink-400/20 via-transparent to-transparent',
                'from-sky-400/20 via-transparent to-transparent',
                'from-emerald-400/20 via-transparent to-transparent',
              ][idx % 5]

              return (
                <div
                  key={src + idx}
                  className="min-w-0 grow-0 shrink-0 basis-full px-3 sm:px-4 py-5 sm:py-6"
                >
                  <div
                    className={cn(
                      'relative h-[360px] sm:h-[420px] overflow-hidden rounded-2xl',
                      'bg-gradient-to-br from-white/5 to-transparent',
                    )}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                    <div
                      className={cn(
                        'absolute -top-28 left-1/2 -translate-x-1/2 w-[520px] h-[520px] blur-3xl',
                        'bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.35),transparent_60%)]',
                      )}
                    />
                    <div className={cn('absolute inset-0 bg-gradient-to-b', slideGlow)} />

                    <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 backdrop-blur">
                          <span className="text-xl">💛</span>
                          <span className="text-xs sm:text-sm uppercase tracking-widest text-white/80">
                            Love Note
                          </span>
                        </div>
                        <div className="text-white/70 text-xs sm:text-sm">
                          {idx + 1} / 8
                        </div>
                      </div>

                      <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur p-4 sm:p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl leading-none pt-0.5">✨</div>
                          <div className="min-w-0">
                            <div className="text-sm sm:text-base text-yellow-100/90 font-medium">
                              For My Simeeeee
                            </div>
                            <div className="mt-2 max-h-[190px] sm:max-h-[235px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                              <p className="whitespace-pre-line text-[clamp(14px,2.2vw,18px)] leading-relaxed text-white/95">
                                {quote}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
        {dots.map((i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={cn(
                'h-2.5 rounded-full transition-all',
                isActive ? 'w-7 bg-yellow-300' : 'w-2.5 bg-white/30 hover:bg-white/50',
              )}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          )
        })}
      </div>

      <div className="text-center text-white/60 text-xs sm:text-sm mt-2">
        Use arrows or swipe to enjoy the Eid love notes
      </div>
    </section>
  )
}

