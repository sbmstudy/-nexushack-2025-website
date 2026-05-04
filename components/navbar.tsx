"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#stats", label: "Stats" },
  { href: "#themes", label: "Themes" },
  { href: "#schedule", label: "Schedule" },
  { href: "#faq", label: "FAQ" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-strong border-b border-[#7c3aed]/20"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-[#00d4ff]" />
            <span className="text-xl font-bold text-[#f0f0f5]">
              Nexus<span className="text-[#00d4ff]">Hack</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-[#a0a0b0] transition-colors hover:text-[#f0f0f5]"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#00d4ff] transition-all hover:w-full" />
              </a>
            ))}
            <Button
              className="glow-blue bg-[#00d4ff] font-semibold text-[#0a0a0f] hover:bg-[#00d4ff]/90"
              asChild
            >
              <a href="#register">Register</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-[#f0f0f5] transition-colors hover:bg-[#7c3aed]/20 md:hidden"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="glass-strong fixed inset-x-0 top-[72px] z-40 border-b border-[#7c3aed]/20 md:hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-[#a0a0b0] transition-colors hover:text-[#f0f0f5]"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="glow-blue mt-2 bg-[#00d4ff] font-semibold text-[#0a0a0f] hover:bg-[#00d4ff]/90"
                asChild
              >
                <a href="#register" onClick={() => setIsMobileMenuOpen(false)}>
                  Register Now
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
