'use client'

import { useState, useEffect, useRef } from 'react'
import EidLoveCarousel from '@/components/EidLoveCarousel'
import PersonalMemoriesCarousel from '@/components/PersonalMemoriesCarousel'

export default function Home() {
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [showWishes, setShowWishes] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)
  const [lanternPositions, setLanternPositions] = useState<Array<{left: number; top: number; delay: number}>>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  // Generate lantern positions only once on mount and set hydration flag
  useEffect(() => {
    setIsHydrated(true)
    const positions = [...Array(4)].map(() => ({
      left: Math.random() * 80 + 10,
      top: Math.random() * 60 + 10,
      delay: Math.random() * 3,
    }))
    setLanternPositions(positions)
  }, [])

  // Handle music playback with direct click
  const toggleMusic = () => {
    setIsMuted(!isMuted)
    if (audioRef.current && curtainOpen) {
      if (isMuted) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }

  useEffect(() => {
    if (audioRef.current && curtainOpen && !isMuted) {
      audioRef.current.play().catch(() => {})
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [curtainOpen, isMuted])

  const wishes = [
    "May this blessed Eid bring you closer to your dreams, fill your days with boundless joy, and remind you of the extraordinary person you truly are.",
    "On this sacred occasion, I wish for every moment to sparkle with happiness, every prayer to be answered, and every breath to fill you with gratitude and peace.",
    "May the blessings of Eid illuminate your path, the warmth of loved ones embrace your heart, and the beauty of this day stay with you forever.",
    "You deserve every happiness this world can offer. May Eid be just the beginning of an amazing journey filled with success, love, and endless possibilities.",
    "In the spirit of Eid, may you find strength in your faith, joy in your relationships, and the courage to become the best version of yourself.",
    "May your heart be filled with the same kindness you show to others, your dreams be as beautiful as your spirit, and your Eid be truly unforgettable.",
    "On this day of celebration, I thank Allah for blessing the world with someone as special as you. May your journey ahead be filled with blessings and miracles.",
    "May Eid bring you not just happiness, but the wisdom to recognize the blessings in your life, and the grace to share that joy with everyone you meet.",
    "You are a gift to those around you. May this Eid remind you of your worth, celebrate your achievements, and open new doors to endless possibilities.",
    "May this Eid mark the beginning of a beautiful chapter in your life, filled with love, laughter, success, and the fulfillment of every heart's desire.",
  ]

  const eidLoveQuote = `My Simeeeee

On this blessed occasion of Eid, I want you to know how truly special you are. Your presence brings light and warmth to everyone around you.

May this Eid bring you endless joy, beautiful memories, and all the happiness your heart deserves. You deserve the very best in life.

✨`

  const createConfetti = () => {
    const confettiPieces = []
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * window.innerWidth
      const y = -10
      const duration = 2 + Math.random() * 1.5
      const delay = Math.random() * 0.3
      confettiPieces.push(
        <div
          key={i}
          className="fixed pointer-events-none animate-confetti"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#87CEEB'][Math.floor(Math.random() * 5)],
            animation: `confetti-fall ${duration}s linear ${delay}s forwards`,
          }}
        />
      )
    }
    return confettiPieces
  }

  return (
    <main className={`relative w-full min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
      {/* Background Music */}
      <audio ref={audioRef} loop suppressHydrationWarning crossOrigin="anonymous">
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dekhha%20Tenu%20Mr%20And%20Mrs%20Mahi%20128%20Kbps-21NdmAKXxw2pcp1VJW8TF2EjwM53ol.mp3#t=14" type="audio/mpeg" />
      </audio>

      {/* Confetti Animation */}
      {curtainOpen && createConfetti()}

      {/* Control Bar */}
      <div className="fixed top-6 right-6 z-40 flex gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          suppressHydrationWarning
          className={`p-3 rounded-full transition-all ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'} hover:scale-110`}
          title="Toggle Dark Mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <button
          onClick={toggleMusic}
          suppressHydrationWarning
          className={`p-3 rounded-full transition-all ${isMuted ? 'bg-gray-400' : 'bg-green-500'} text-white hover:scale-110`}
          title="Toggle Music"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Before Reveal - Elegant Curtain Screen */}
      {!curtainOpen && (
        <div className="fixed inset-0 z-50 flex cursor-pointer" onClick={() => setCurtainOpen(true)}>
          {/* Left Curtain */}
          <div className={`absolute left-0 top-0 h-full w-1/2 origin-left ${curtainOpen ? 'animate-curtain-open-left' : ''}`}
            style={{
              background: 'linear-gradient(135deg, #7A6450 0%, #8B7355 15%, #A0826D 35%, #B8956A 55%, #D4AF86 80%, #E8C5A2 100%)',
              boxShadow: curtainOpen ? 'none' : '-20px 0 60px rgba(0,0,0,0.9), inset -80px 0 120px rgba(0,0,0,0.7)',
              filter: curtainOpen ? 'none' : 'drop-shadow(-25px 0 40px rgba(0,0,0,0.8))',
            }}>
            {/* Velvet Texture Layer */}
            <div className="absolute inset-0 opacity-45 bg-gradient-to-b from-amber-950/80 via-yellow-900/60 to-yellow-800/40" />

            {/* Elaborate Fold System */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute right-0 top-0 bottom-0 blur-xl"
                  style={{
                    width: `${20 + i * 8}px`,
                    background: `linear-gradient(90deg, transparent 0%, rgba(0,0,0,${0.5 - i * 0.05}) 40%, rgba(0,0,0,${0.3 - i * 0.04}) 100%)`,
                    right: `${i * 45}px`,
                    opacity: 0.4 - i * 0.03,
                  }} />
              ))}
            </div>

            {/* Horizontal Pleats for Realism */}
            <div className="absolute inset-0 opacity-25" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,0,0,0.2) 30px, rgba(0,0,0,0.2) 32px)',
            }} />

            {/* Inner Shine Effect */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-white/5 via-transparent to-black/10" />
          </div>

          {/* Right Curtain */}
          <div className={`absolute right-0 top-0 h-full w-1/2 origin-right ${curtainOpen ? 'animate-curtain-open-right' : ''}`}
            style={{
              background: 'linear-gradient(-135deg, #7A6450 0%, #8B7355 15%, #A0826D 35%, #B8956A 55%, #D4AF86 80%, #E8C5A2 100%)',
              boxShadow: curtainOpen ? 'none' : '20px 0 60px rgba(0,0,0,0.9), inset 80px 0 120px rgba(0,0,0,0.7)',
              filter: curtainOpen ? 'none' : 'drop-shadow(25px 0 40px rgba(0,0,0,0.8))',
            }}>
            {/* Velvet Texture Layer */}
            <div className="absolute inset-0 opacity-45 bg-gradient-to-b from-amber-950/80 via-yellow-900/60 to-yellow-800/40" />

            {/* Elaborate Fold System */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute left-0 top-0 bottom-0 blur-xl"
                  style={{
                    width: `${20 + i * 8}px`,
                    background: `linear-gradient(-90deg, transparent 0%, rgba(0,0,0,${0.5 - i * 0.05}) 40%, rgba(0,0,0,${0.3 - i * 0.04}) 100%)`,
                    left: `${i * 45}px`,
                    opacity: 0.4 - i * 0.03,
                  }} />
              ))}
            </div>

            {/* Horizontal Pleats for Realism */}
            <div className="absolute inset-0 opacity-25" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(0,0,0,0.2) 30px, rgba(0,0,0,0.2) 32px)',
            }} />

            {/* Inner Shine Effect */}
            <div className="absolute inset-0 opacity-30 bg-gradient-to-l from-white/5 via-transparent to-black/10" />
          </div>

          {/* Welcome Message */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
            <div className="text-center space-y-10 px-4 max-w-2xl">
              {/* Decorative Top Divider */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-white/60" />
                <span className="text-xl text-white/70">✨</span>
                <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-white/60" />
              </div>

              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="text-7xl md:text-9xl font-serif font-thin text-white tracking-wide" style={{ textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  Eid
                </h1>
                <p className="text-3xl md:text-5xl font-serif font-light text-white/95 tracking-widest">
                  Mubarak
                </p>
              </div>

              {/* Subtitle */}
              <div className="space-y-3 py-4">
                <p className="text-base md:text-lg text-white/85 font-light tracking-wide">For the Most Special Person</p>
                <div className="relative inline-block w-full">
                  <p className="text-4xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200" style={{ textShadow: '0 0 30px rgba(250,204,21,0.3)' }}>
                    My Simeeeee
                  </p>
                </div>
              </div>

              {/* Decorative Bottom Divider */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-white/60" />
                <span className="text-xl text-white/70">✨</span>
                <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-white/60" />
              </div>

              {/* CTA Text */}
              <div className="pt-4 space-y-3">
                <p className="text-white/75 font-light text-base md:text-lg">
                  A celebration made just for you
                </p>
                <p className="text-sm md:text-base text-white/60 font-light tracking-widest uppercase animate-pulse">
                  {'Click the curtains to reveal'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* After Reveal - Celebration Screen */}
      {curtainOpen && !showWishes && (
        <div className={`relative w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950'} overflow-hidden`}>
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-yellow-300/10 to-transparent rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl" />

          {/* Floating Lanterns - Randomized Once */}
          {lanternPositions.map((pos, i) => (
            <div
              key={i}
              className="absolute text-6xl animate-float-slower pointer-events-none"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                animationDelay: `${pos.delay}s`,
              }}
            >
              🏮
            </div>
          ))}

          {/* Floating Stars */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl animate-float-delayed"
              style={{
                right: `${15 + i * 15}%`,
                top: `${25 + i * 12}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              ⭐
            </div>
          ))}

          {/* Calligraphy Art - Islamic Pattern */}
          <div className="absolute top-12 left-12 text-4xl opacity-20 animate-float">
            ✶ ❖ ✶
          </div>
          <div className="absolute bottom-20 right-12 text-4xl opacity-20 animate-float-delayed-2">
            ✦ ◆ ✦
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-2xl text-center space-y-10 animate-fade-in">
            {/* Decorative Top Divider */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
              <span className="text-5xl animate-bounce">✨</span>
              <div className="h-0.5 w-16 bg-gradient-to-l from-transparent via-yellow-300 to-transparent" />
            </div>

            {/* Main Message */}
            <div className="space-y-8">
              <div>
                <h2 className="text-6xl md:text-8xl font-serif font-thin text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 tracking-wider" style={{ textShadow: '0 0 40px rgba(250,204,21,0.2)' }}>
                  My Simeeeee
                </h2>
              </div>

              <div className="space-y-6 text-white/95 font-light leading-relaxed text-lg md:text-xl px-4">
                <p className="text-base md:text-lg">
                  On this blessed occasion of Eid, I want you to know how truly special you are. Your presence brings light and warmth to everyone around you.
                </p>
                <p className="text-base md:text-lg">
                  May this Eid bring you endless joy, beautiful memories, and all the happiness your heart deserves. You deserve the very best in life.
                </p>
              </div>
            </div>

            {/* Decorative Middle Divider */}
            <div className="flex items-center justify-center gap-4 py-4">
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
              <span className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
              <div className="h-0.5 w-16 bg-gradient-to-l from-transparent via-yellow-300 to-transparent" />
            </div>

            {/* CTA Button with Enhanced Styling */}
            <button
              onClick={() => setShowWishes(true)}
              className="inline-block px-8 md:px-14 py-4 md:py-5 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 text-amber-900 font-serif font-bold text-lg rounded-full hover:shadow-3xl hover:scale-110 transition-all duration-300 active:scale-95 shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">Wishes For You 🫶🏻</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 animate-shine rounded-full" />
            </button>

            {/* Additional Decorator */}
            <p className="text-white/60 font-light text-sm tracking-widest uppercase pt-2">
              Click to see heartfelt wishes
            </p>
          </div>
        </div>
      )}

      {/* Wishes Screen */}
      {showWishes && (
        <div className={`relative w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' : 'bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950'} overflow-hidden`}>
          {/* Animated Background Orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-300/10 to-transparent rounded-full blur-3xl animate-glow-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-yellow-400/10 to-transparent rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl" />

          {/* Floating Decorations on Wishes Page */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute text-5xl animate-float-slower pointer-events-none"
              style={{
                left: `${10 + i * 25}%`,
                bottom: `${5 + i * 15}%`,
                animationDelay: `${i * 1.2}s`,
                opacity: 0.15,
              }}
            >
              🏮
            </div>
          ))}

          {/* Animated Scrolling Text Decoration */}
          <div className="absolute top-20 w-full text-center opacity-10 text-lg tracking-widest animate-pulse">
            Blessings • Wishes • Love • Joy • Gratitude
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl w-full space-y-10 animate-fade-in">
            {/* Header Section */}
            <div className="text-center space-y-6 pt-8">
              {/* Top Divider */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
                <span className="text-4xl animate-bounce">💛</span>
                <div className="h-0.5 w-20 bg-gradient-to-l from-transparent via-yellow-300 to-transparent" />
              </div>

              <h3 className="text-5xl md:text-7xl font-playfair font-light text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 tracking-wide">
                Heartfelt Wishes
              </h3>
              <p className="text-yellow-200/80 text-lg font-light">for the most special person, Simeeeee</p>
              <p className="text-yellow-100/60 text-sm">May these words wrap around your heart</p>
            </div>

            {/* Wishes Cards Stack */}
            <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes shimmer {
                0%, 100% {
                  opacity: 1;
                }
                50% {
                  opacity: 0.7;
                }
              }
              @keyframes floatSparkle {
                0%, 100% {
                  transform: translateY(0px) scale(1);
                  opacity: 1;
                }
                50% {
                  transform: translateY(-8px) scale(1.1);
                  opacity: 0.8;
                }
              }
              @keyframes persistentCardGlow {
                0%, 100% {
                  box-shadow: 0 0 20px rgba(250, 204, 21, 0.3), 0 8px 20px rgba(250, 204, 21, 0.15);
                }
                50% {
                  box-shadow: 0 0 35px rgba(250, 204, 21, 0.5), 0 12px 30px rgba(250, 204, 21, 0.25);
                }
              }
              .wish-card {
                animation: fadeInUp 0.6s ease-out forwards;
              }
              .wish-card:hover {
                animation: persistentCardGlow 2s ease-in-out infinite !important;
              }
              .sparkle-icon {
                animation: floatSparkle 2.5s ease-in-out infinite;
              }
            `}</style>
            <div className="w-full max-w-2xl mx-auto space-y-4 relative">
              {/* Ribbon line on the left */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400/60 via-yellow-300/40 to-yellow-400/60"></div>
              
              {wishes.map((wish, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="wish-card flex items-start gap-4 p-5 bg-white/95 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-rotate-1 relative origin-center"
                >
                  {/* Ribbon ornament dot */}
                  <div className="absolute -left-4 top-6 w-4 h-4 bg-yellow-400 rounded-full shadow-md border-2 border-amber-900/20"></div>
                  
                  {/* Icon */}
                  <div className="flex-shrink-0 pt-1">
                    <span className="sparkle-icon text-2xl inline-flex items-center justify-center">
                      ✨
                    </span>
                  </div>
                  
                  {/* Wish Text */}
                  <div className="flex-grow min-w-0">
                    <p className="text-amber-900 text-base leading-relaxed">
                      {wish}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Action */}
            <div className="text-center space-y-6 pb-8">
              {/* Divider */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />
                <span className="text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>💛</span>
                <div className="h-0.5 w-20 bg-gradient-to-l from-transparent via-yellow-300 to-transparent" />
              </div>

              {/* Back Button */}
              <button
                onClick={() => setShowWishes(false)}
                className="px-8 md:px-12 py-3 md:py-4 text-yellow-200 border-2 border-yellow-300 rounded-full hover:bg-white/15 hover:border-yellow-200 transition-all duration-300 font-serif text-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                ← Back to Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personal Memories Carousel */}
      {curtainOpen && !showWishes && (
        <PersonalMemoriesCarousel />
      )}
    </main>
  )
}
