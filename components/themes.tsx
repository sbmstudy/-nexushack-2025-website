"use client"

import { motion } from "framer-motion"
import { Brain, Shield, Heart, Banknote, Building2 } from "lucide-react"

const themes = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Build intelligent solutions using cutting-edge AI/ML technologies to solve real-world problems.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Create innovative security tools and solutions to protect digital assets and privacy.",
  },
  {
    icon: Heart,
    title: "HealthTech",
    description: "Develop technology solutions that improve healthcare accessibility and patient outcomes.",
  },
  {
    icon: Banknote,
    title: "FinTech",
    description: "Revolutionize financial services with blockchain, payments, and banking innovations.",
  },
  {
    icon: Building2,
    title: "Smart Campus",
    description: "Transform educational environments with IoT, automation, and smart technologies.",
  },
]

export function Themes() {
  return (
    <section id="themes" className="relative py-24">
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
            Problem <span className="text-gradient">Themes</span>
          </h2>
          <p className="text-[#a0a0b0]">Choose your track and build something amazing</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme, index) => (
            <motion.div
              key={theme.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="perspective-1000 group"
            >
              <div className="transform-style-3d card-glow glass relative rounded-2xl p-6 transition-all duration-300 group-hover:rotate-y-2 group-hover:rotate-x-2">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00d4ff]/0 to-[#7c3aed]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                
                <div className="relative z-10">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20">
                    <theme.icon className="h-7 w-7 text-[#00d4ff]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-[#f0f0f5]">{theme.title}</h3>
                  <p className="text-sm text-[#a0a0b0]">{theme.description}</p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] opacity-0 blur transition-opacity duration-300 group-hover:opacity-30" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
