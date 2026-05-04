"use client"

import { motion } from "framer-motion"
import { Zap, Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-[#7c3aed]/20 py-12">
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-[#00d4ff]" />
            <span className="text-xl font-bold text-[#f0f0f5]">
              Nexus<span className="text-[#00d4ff]">Hack</span>
            </span>
          </a>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7c3aed]/30 text-[#a0a0b0] transition-all hover:border-[#00d4ff] hover:text-[#00d4ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Contact Email */}
          <a
            href="mailto:nexushack@klsgit.ac.in"
            className="flex items-center gap-2 text-[#a0a0b0] transition-colors hover:text-[#00d4ff]"
          >
            <Mail className="h-4 w-4" />
            nexushack@klsgit.ac.in
          </a>

          {/* Credits */}
          <div className="text-center text-sm text-[#a0a0b0]">
            <p>
              Built with{" "}
              <span className="text-[#ff4757]">❤️</span>
              {" "}by IIC Tech Team, GIT
            </p>
            <p className="mt-1 text-xs">
              © 2025 NexusHack. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
