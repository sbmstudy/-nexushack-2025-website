"use client"

import { useEffect, useRef, useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  CheckCircle2,
  X,
  Calendar,
  MapPin,
  Mail,
  Trophy,
  Users,
  Tag,
  ArrowRight,
  Copy,
  Share2,
} from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

const themeNames: Record<string, string> = {
  "ai-ml": "AI & Machine Learning",
  cybersecurity: "Cybersecurity",
  healthtech: "HealthTech",
  fintech: "FinTech",
  "smart-campus": "Smart Campus",
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const registrationId = searchParams.get("id") || "NXH-2025-XXXX-0000"
  const fullName = searchParams.get("name") || "Warrior"
  const teamName = searchParams.get("team") || "Your Team"
  const themeId = searchParams.get("theme") || ""
  const themeName = themeNames[themeId] || themeId

  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [copied, setCopied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Trigger confetti and video modal
  useEffect(() => {
    // Confetti animation
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const colors = ["#00d4ff", "#7c3aed", "#f0f0f5"]

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })
    }, 200)

    // Show video modal 1 second after page load
    const modalTimer = setTimeout(() => {
      setShowVideoModal(true)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(modalTimer)
    }
  }, [])

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
    setShowVideoModal(false)
    // Animate confirmation card in after modal closes
    setTimeout(() => setShowConfirmation(true), 300)
  }

  const handleVideoEnd = () => {
    closeModal()
  }

  const copyId = () => {
    navigator.clipboard.writeText(registrationId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareRegistration = async () => {
    const shareData = {
      title: "I'm registered for NexusHack 2025!",
      text: `I just registered for NexusHack 2025 with team "${teamName}". My ID: ${registrationId}`,
      url: window.location.origin,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
        alert("Share text copied to clipboard!")
      }
    } catch (err) {
      console.log("[v0] Share cancelled:", err)
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#7c3aed]/15 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#00d4ff]/15 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Fullscreen Video Modal Popup */}
        <AnimatePresence>
          {showVideoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-4"
              style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full max-w-[800px]"
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  aria-label="Close video"
                  className="absolute -top-12 right-0 z-10 rounded-full p-2 text-white transition-all hover:bg-white/10 hover:text-[#00d4ff] sm:-top-2 sm:-right-12"
                >
                  <X className="h-10 w-10" strokeWidth={2.5} />
                </button>

                {/* Video Player with glowing border */}
                <div
                  className="relative overflow-hidden rounded-2xl border-2 border-[#00d4ff]"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.1)",
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    onEnded={handleVideoEnd}
                    className="aspect-video w-full"
                    controls
                  >
                    <source src="/success-battle.mp4" type="video/mp4" />
                  </video>
                </div>

                {/* Welcome Text */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-8 text-center text-2xl font-bold sm:text-4xl"
                >
                  <span
                    className="bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#00d4ff] bg-clip-text text-transparent"
                    style={{ backgroundSize: "200% auto" }}
                  >
                    Welcome to the Battleground, Warrior!
                  </span>
                </motion.h2>

                <p className="mt-3 text-center text-sm text-[#a0a0b0] sm:text-base">
                  Press the X to skip and view your confirmation
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Section */}
        <section className="px-4 pb-20 pt-32">
          <div className="mx-auto max-w-4xl">
            <AnimatePresence>
              {(showConfirmation || !showVideoModal) && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed]"
                    >
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </motion.div>
                    <h1 className="mb-3 text-4xl font-bold md:text-5xl">
                      <span className="text-gradient">Registration</span>
                      <span className="text-[#f0f0f5]"> Confirmed!</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-[#a0a0b0]">
                      Welcome to NexusHack 2025, {fullName}! Your team{" "}
                      <span className="text-[#00d4ff]">"{teamName}"</span> is officially
                      registered.
                    </p>
                  </div>

                  {/* Confirmation Card / Ticket */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl border border-[#00d4ff]/40 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] p-8 shadow-[0_0_40px_rgba(0,212,255,0.2)]"
                  >
                    {/* Glowing accents */}
                    <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#00d4ff]/20 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#7c3aed]/20 blur-3xl" />

                    <div className="relative">
                      {/* Top section */}
                      <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[#7c3aed]/20 pb-6 sm:flex-row sm:items-center">
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-widest text-[#a0a0b0]">
                            Registration ID
                          </p>
                          <p className="font-mono text-2xl font-bold tracking-wider text-[#00d4ff]">
                            {registrationId}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={copyId}
                            className="border-[#00d4ff]/40 bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20 hover:text-[#00d4ff]"
                          >
                            {copied ? (
                              <>
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-4 w-4" />
                                Copy ID
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={shareRegistration}
                            className="border-[#7c3aed]/40 bg-[#7c3aed]/10 text-[#7c3aed] hover:bg-[#7c3aed]/20 hover:text-[#7c3aed]"
                          >
                            <Share2 className="mr-1 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>

                      {/* Details grid */}
                      <div className="mb-8 grid gap-6 sm:grid-cols-2">
                        <DetailItem
                          icon={Users}
                          label="Participant"
                          value={fullName}
                        />
                        <DetailItem
                          icon={Trophy}
                          label="Team"
                          value={teamName}
                        />
                        <DetailItem
                          icon={Tag}
                          label="Theme"
                          value={themeName}
                        />
                        <DetailItem
                          icon={Calendar}
                          label="Event Dates"
                          value="June 15-16, 2025"
                        />
                        <DetailItem
                          icon={MapPin}
                          label="Venue"
                          value="KLS GIT, Belagavi"
                        />
                        <DetailItem
                          icon={Mail}
                          label="Contact"
                          value="hackathon@git.edu"
                        />
                      </div>

                      {/* Next steps */}
                      <div className="rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-6">
                        <h3 className="mb-3 text-lg font-semibold text-[#f0f0f5]">
                          What's Next?
                        </h3>
                        <ul className="space-y-2 text-sm text-[#a0a0b0]">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                            <span>
                              Confirmation email sent — check your inbox (and spam
                              folder)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                            <span>
                              Save your Registration ID — you'll need it on event day
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                            <span>
                              Watch your email for pre-event briefing details by June 10
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                            <span>
                              Bring your laptop, charger, and student ID on event day
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
                  >
                    <Button
                      size="lg"
                      asChild
                      className="bg-[#00d4ff] font-semibold text-[#0a0a0f] hover:bg-[#00d4ff]/90"
                    >
                      <Link href="/">
                        Back to Home
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="border-[#7c3aed] bg-transparent text-[#f0f0f5] hover:bg-[#7c3aed]/20 hover:text-[#f0f0f5]"
                    >
                      <Link href="/#schedule">View Event Schedule</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-[#00d4ff]/10 p-2">
        <Icon className="h-5 w-5 text-[#00d4ff]" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-[#a0a0b0]">{label}</p>
        <p className="font-medium text-[#f0f0f5]">{value}</p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f]" />}>
      <SuccessContent />
    </Suspense>
  )
}
