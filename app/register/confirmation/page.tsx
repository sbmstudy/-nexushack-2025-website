"use client"

import { useEffect, useState, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Download, 
  Share2, 
  ArrowLeft,
  Copy,
  Check,
  Zap,
  Mail,
  Phone,
  Building2,
  Users,
  Brain,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import confetti from "canvas-confetti"

interface RegistrationData {
  registration_id: string
  full_name: string
  email: string
  phone: string
  college: string
  department: string
  year: string
  team_name: string
  team_size: number
  role: string
  theme: string
  created_at: string
}

const themeNames: Record<string, string> = {
  "ai-ml": "AI & Machine Learning",
  "cybersecurity": "Cybersecurity",
  "healthtech": "HealthTech",
  "fintech": "FinTech",
  "smart-campus": "Smart Campus",
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const registrationId = searchParams.get("id")
  const [registration, setRegistration] = useState<RegistrationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const ticketRef = useRef<HTMLDivElement>(null)
  const confettiTriggered = useRef(false)

  useEffect(() => {
    const fetchRegistration = async () => {
      if (!registrationId) {
        setError("No registration ID provided")
        setLoading(false)
        return
      }

      const supabase = createClient()
      const { data, error: fetchError } = await supabase
        .from("registrations")
        .select("*")
        .eq("registration_id", registrationId)
        .single()

      if (fetchError) {
        setError("Registration not found")
        setLoading(false)
        return
      }

      setRegistration(data)
      setLoading(false)

      // Trigger confetti only once
      if (!confettiTriggered.current) {
        confettiTriggered.current = true
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#00d4ff", "#7c3aed", "#f0f0f5"],
          })
        }, 500)
      }
    }

    fetchRegistration()
  }, [registrationId])

  const copyToClipboard = async () => {
    if (registration?.registration_id) {
      await navigator.clipboard.writeText(registration.registration_id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadTicket = async () => {
    if (!ticketRef.current) return
    
    try {
      const html2canvas = (await import("html2canvas")).default
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: "#0a0a0f",
        scale: 2,
      })
      
      const link = document.createElement("a")
      link.download = `nexushack-2025-ticket-${registration?.registration_id}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
    } catch (err) {
      console.error("Failed to download ticket:", err)
    }
  }

  const shareRegistration = async () => {
    if (navigator.share && registration) {
      try {
        await navigator.share({
          title: "NexusHack 2025 Registration",
          text: `I just registered for NexusHack 2025! My registration ID is ${registration.registration_id}. Join me at KLS GIT, Belagavi on June 15-16, 2025!`,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    }
  }

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#00d4ff]" />
            <p className="mt-4 text-[#a0a0b0]">Loading your registration...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !registration) {
    return (
      <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
              <span className="text-3xl text-red-400">!</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-[#f0f0f5]">Registration Not Found</h2>
            <p className="mb-6 text-[#a0a0b0]">{error || "Unable to find your registration details."}</p>
            <Button asChild className="bg-[#00d4ff] text-[#0a0a0f] hover:bg-[#00d4ff]/90">
              <Link href="/register">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Register Now
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
      <Navbar />
      
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#7c3aed]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#00d4ff]/10 blur-[100px]" />
      </div>

      <section className="relative z-10 px-4 pb-20 pt-32">
        <div className="mx-auto max-w-3xl">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed]"
            >
              <CheckCircle2 className="h-10 w-10 text-[#0a0a0f]" />
            </motion.div>
            <h1 className="mb-2 text-3xl font-bold text-[#f0f0f5] md:text-4xl">
              Registration Successful!
            </h1>
            <p className="text-lg text-[#a0a0b0]">
              Welcome to NexusHack 2025, {registration.full_name.split(" ")[0]}!
            </p>
          </motion.div>

          {/* Ticket Card */}
          <motion.div
            ref={ticketRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass mb-8 overflow-hidden rounded-2xl border border-[#7c3aed]/20"
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-[#0a0a0f]" />
                  <div>
                    <h2 className="text-xl font-bold text-[#0a0a0f]">NexusHack 2025</h2>
                    <p className="text-sm text-[#0a0a0f]/80">Official Entry Pass</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#0a0a0f]/80">Registration ID</p>
                  <p className="font-mono text-lg font-bold text-[#0a0a0f]">
                    {registration.registration_id}
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6">
              {/* Participant Info */}
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#606070]">Participant</p>
                  <p className="text-lg font-semibold text-[#f0f0f5]">{registration.full_name}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-[#606070]">Team</p>
                  <p className="text-lg font-semibold text-[#f0f0f5]">{registration.team_name}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="mb-6 grid gap-3 text-sm md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-[#1a1a2e] p-3">
                  <Mail className="h-4 w-4 text-[#00d4ff]" />
                  <span className="text-[#a0a0b0]">{registration.email}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#1a1a2e] p-3">
                  <Phone className="h-4 w-4 text-[#00d4ff]" />
                  <span className="text-[#a0a0b0]">{registration.phone}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#1a1a2e] p-3">
                  <Building2 className="h-4 w-4 text-[#00d4ff]" />
                  <span className="text-[#a0a0b0]">{registration.college}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#1a1a2e] p-3">
                  <Users className="h-4 w-4 text-[#00d4ff]" />
                  <span className="text-[#a0a0b0]">{registration.team_size} Members - {registration.role}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-[#1a1a2e] p-3 md:col-span-2">
                  <Brain className="h-4 w-4 text-[#00d4ff]" />
                  <span className="text-[#a0a0b0]">Theme: {themeNames[registration.theme] || registration.theme}</span>
                </div>
              </div>

              {/* Divider with circles */}
              <div className="relative my-6">
                <div className="absolute -left-10 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0a0a0f]" />
                <div className="absolute -right-10 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#0a0a0f]" />
                <div className="border-t border-dashed border-[#7c3aed]/30" />
              </div>

              {/* Event Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#7c3aed]/20 p-2">
                    <Calendar className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#f0f0f5]">June 15-16, 2025</p>
                    <p className="text-sm text-[#a0a0b0]">24 Hours of Innovation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#7c3aed]/20 p-2">
                    <MapPin className="h-5 w-5 text-[#7c3aed]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#f0f0f5]">KLS GIT, Belagavi</p>
                    <p className="text-sm text-[#a0a0b0]">Main Auditorium</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 flex flex-wrap justify-center gap-4"
          >
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] hover:bg-[#7c3aed]/20"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4 text-green-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy ID
                </>
              )}
            </Button>
            <Button
              onClick={downloadTicket}
              variant="outline"
              className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] hover:bg-[#7c3aed]/20"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Ticket
            </Button>
            <Button
              onClick={shareRegistration}
              variant="outline"
              className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] hover:bg-[#7c3aed]/20"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </motion.div>

          {/* Important Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass rounded-xl border border-[#7c3aed]/20 p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-[#f0f0f5]">Important Information</h3>
            <ul className="space-y-3 text-sm text-[#a0a0b0]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                <span>A confirmation email has been sent to {registration.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                <span>Please save your Registration ID for check-in at the venue</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                <span>Arrive at least 30 minutes before the event starts</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00d4ff]" />
                <span>Bring a valid ID card and your laptop</span>
              </li>
            </ul>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 text-center"
          >
            <Button asChild variant="ghost" className="text-[#a0a0b0] hover:text-[#f0f0f5]">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0f]">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#00d4ff]" />
            <p className="mt-4 text-[#a0a0b0]">Loading...</p>
          </div>
        </div>
        <Footer />
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
