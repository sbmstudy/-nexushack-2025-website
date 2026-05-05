"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2026-06-15T00:00:00").getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4,
  }))

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Video Background - Crystal clear, no blur */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        style={{ opacity: 1, filter: "none", backdropFilter: "none" }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Single dark overlay - rgba(0,0,0,0.45) only */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{ left: particle.left, top: particle.top }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, -10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-4 py-2 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-[#00d4ff]" />
          <span className="text-sm font-medium text-[#f0f0f5]">
            KLS Gogte Institute of Technology, Belagavi
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-center text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient">NexusHack</span>
          <span className="text-[#f0f0f5]"> 2025</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 text-center text-xl font-light tracking-widest text-[#a0a0b0] sm:text-2xl"
        >
          Build. Innovate. Disrupt.
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-10 flex gap-4 sm:gap-6"
        >
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item, index) => (
            <div
              key={item.label}
              className="glass flex flex-col items-center rounded-xl px-4 py-3 sm:px-6 sm:py-4"
            >
              <motion.span
                key={item.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-bold text-[#00d4ff] sm:text-4xl"
              >
                {String(item.value).padStart(2, "0")}
              </motion.span>
              <span className="text-xs text-[#a0a0b0] sm:text-sm">{item.label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="pulse-glow group bg-[#00d4ff] px-8 py-6 text-lg font-semibold text-[#0a0a0f] hover:bg-[#00d4ff]/90"
            asChild
          >
            <Link href="/register">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#7c3aed] bg-transparent px-8 py-6 text-lg font-semibold text-[#f0f0f5] hover:bg-[#7c3aed]/20 hover:text-[#f0f0f5]"
            asChild
          >
            <Link href="/#themes">Explore Themes</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#a0a0b0]">Scroll to explore</span>
          <div className="h-8 w-5 rounded-full border-2 border-[#7c3aed]/50">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mx-auto mt-1 h-2 w-1 rounded-full bg-[#00d4ff]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
