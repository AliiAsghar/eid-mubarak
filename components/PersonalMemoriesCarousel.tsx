'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type PersonalMemoriesCarouselProps = {
  onSlideChange?: (index: number) => void
  darkMode?: boolean
}

const MEMORIES = [
  {
    image: '/memories/memory-1.jpg',
    quote: 'In this blessed Eid, celebrate the extraordinary beauty of being yourself. Your smile brightens every moment.',
  },
  {
    image: '/memories/memory-2.jpg',
    quote: 'Like flowers bloom in spring, may your heart blossom with joy, love, and endless blessings this Eid.',
  },
  {
    image: '/memories/memory-3.jpg',
    quote: 'Togetherness makes every moment magical. Happy Eid to the one who completes my soul and my every dream.',
  },
  {
    image: '/memories/memory-4.jpg',
    quote: 'Your smile lights up every moment. May this Eid bring endless happiness and beautiful memories together.',
  },
  {
    image: '/memories/memory-5.jpg',
    quote: 'Grace, elegance, and a heart of gold - just like you. Wishing you a blessed Eid filled with joy.',
  },
  {
    image: '/memories/memory-6.jpg',
    quote: 'Walking together through life\'s beautiful journey. May this Eid mark the beginning of forever with you.',
  },
  {
    image: '/memories/memory-7.jpg',
    quote: 'Two hearts, one soul, infinite love. Eid blessings to the one who makes my life complete.',
  },
  {
    image: '/memories/memory-8.jpg',
    quote: 'Forever captured in these moments of love and laughter. Happy Eid to my greatest blessing.',
  },
]

export default function PersonalMemoriesCarousel({
  onSlideChange,
  darkMode = false,
}: PersonalMemoriesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [],
  )

  const [activeIndex, setActiveIndex] = React.useState(0)

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      const selected = emblaApi.selectedScrollSnap()
      setActiveIndex(selected)
      onSlideChange?.(selected)
    }

    onSelect()
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSlideChange])

  // Autoplay effect - 5 second interval
  React.useEffect(() => {
    if (!emblaApi) return

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)

    return () => clearInterval(autoplay)
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

  return (
    <section className={`w-full py-8 md:py-12 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950'}`}>
      <style>{`
        @keyframes persistentGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(251, 191, 36, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3);
          }
        }
        .carousel-container:hover {
          animation: persistentGlow 2s ease-in-out infinite;
        }
      `}</style>
      <div className="mx-auto max-w-3xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-amber-300 fill-amber-300" />
            <h2 className="text-4xl md:text-5xl font-playfair font-light text-amber-100 tracking-wide">Our Memories</h2>
            <Heart className="w-5 h-5 text-amber-300 fill-amber-300" />
          </div>
          <p className="text-amber-100/70 text-base md:text-lg font-light">
            Cherished moments captured in love and celebration
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative carousel-container rounded-2xl">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={scrollPrev}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full size-12 md:size-14 bg-amber-400/20 border border-amber-400/40 hover:bg-amber-400/40 transition-all text-amber-100 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Previous memory"
          >
            <ArrowLeft className="size-6" />
          </button>

          {/* Carousel */}
          <div ref={emblaRef} className="overflow-hidden rounded-3xl">
            <div className="flex">
              {MEMORIES.map((memory, idx) => (
                <div
                  key={idx}
                  className="min-w-0 grow-0 shrink-0 basis-full px-3 sm:px-6"
                >
                  <div className="relative h-[300px] sm:h-[380px] md:h-[450px] overflow-hidden rounded-2xl group">
                    {/* Image */}
                    <img
                      src={memory.image}
                      alt={`Eid memory ${idx + 1}`}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    {/* Subtle Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-300/0 via-transparent to-amber-900/20" />

                    {/* Top Badge */}
                    <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between z-20">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 border border-amber-400/40 backdrop-blur px-3 py-1.5">
                        <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span className="text-xs md:text-sm uppercase tracking-widest text-amber-100 font-medium">
                          Memory
                        </span>
                      </div>
                      <div className="text-amber-100/70 text-xs md:text-sm font-light">
                        {idx + 1} / 8
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={scrollNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full size-12 md:size-14 bg-amber-400/20 border border-amber-400/40 hover:bg-amber-400/40 transition-all text-amber-100 flex items-center justify-center shadow-lg hover:shadow-xl"
            aria-label="Next memory"
          >
            <ArrowRight className="size-6" />
          </button>
        </div>

        {/* Quote Card Below Carousel */}
        <div className="mt-6 md:mt-8 rounded-2xl bg-black/40 border border-amber-400/20 backdrop-blur-sm p-5 md:p-7 shadow-2xl">
          <div className="flex items-start gap-3 md:gap-4">
            <span className="text-2xl md:text-3xl flex-shrink-0 animate-pulse">✨</span>
            <div className="min-w-0">
              <p className="text-sm md:text-base leading-relaxed text-amber-50 font-light">
                {MEMORIES[activeIndex].quote}
              </p>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {MEMORIES.map((_, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  isActive
                    ? 'w-8 h-3 bg-amber-300 shadow-lg shadow-amber-300/50'
                    : 'w-3 h-3 bg-amber-400/40 hover:bg-amber-400/60',
                )}
                aria-label={`Go to memory ${i + 1}`}
                aria-current={isActive ? 'true' : 'false'}
              />
            )
          })}
        </div>

        {/* Instructions */}
        <p className="text-center text-amber-100/60 text-xs md:text-sm mt-6 font-light">
          Swipe or use arrows to navigate through our cherished moments
        </p>
      </div>
    </section>
  )
}
