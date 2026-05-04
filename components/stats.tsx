"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Trophy, Clock } from "lucide-react"

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Participants", color: "#00d4ff" },
  { icon: Trophy, value: 50000, prefix: "₹", label: "Prize Pool", color: "#7c3aed" },
  { icon: Clock, value: 24, label: "Hours", color: "#00d4ff" },
]

function AnimatedCounter({ value, prefix = "", suffix = "", inView }: { value: number; prefix?: string; suffix?: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value, inView])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="stats" className="relative py-24" ref={ref}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#f0f0f5] sm:text-4xl">
            The <span className="text-gradient">Numbers</span> Speak
          </h2>
          <p className="text-[#a0a0b0]">Join hundreds of innovators in this epic hackathon</p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card-glow glass group rounded-2xl p-8 text-center"
              style={{ borderColor: `${stat.color}30` }}
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="h-8 w-8" style={{ color: stat.color }} />
              </div>
              <div
                className="mb-2 text-4xl font-bold sm:text-5xl"
                style={{ color: stat.color }}
              >
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <p className="text-lg text-[#a0a0b0]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
