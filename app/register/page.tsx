"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Zap,
  Users,
  Brain,
  Shield,
  Heart,
  Wallet,
  Building2,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import supabase from "@/lib/supabase"
import { useRouter } from "next/navigation"

const themes = [
  { id: "ai-ml", name: "AI & Machine Learning", icon: Brain },
  { id: "cybersecurity", name: "Cybersecurity", icon: Shield },
  { id: "healthtech", name: "HealthTech", icon: Heart },
  { id: "fintech", name: "FinTech", icon: Wallet },
  { id: "smart-campus", name: "Smart Campus", icon: Building2 },
]

const departments = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Other",
]

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]
const roles = ["Team Leader", "Developer", "Designer", "Other"]
const teamSizes = ["2", "3", "4"]

function generateRegistrationId() {
  const letters = Math.random().toString(36).substring(2, 6).toUpperCase()
  const numbers = Math.floor(1000 + Math.random() * 9000)
  return `NXH-2025-${letters}-${numbers}`
}

export default function RegisterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    year: "",
    team_name: "",
    team_size: "",
    role: "",
    theme: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.full_name.trim()) return "Full name is required"
    if (!formData.email.trim()) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format"
    if (!formData.phone.trim()) return "Phone number is required"
    if (!/^[6-9]\d{9}$/.test(formData.phone)) return "Invalid Indian phone number"
    if (!formData.college.trim()) return "College name is required"
    if (!formData.department) return "Department is required"
    if (!formData.year) return "Year of study is required"
    if (!formData.team_name.trim()) return "Team name is required"
    if (!formData.team_size) return "Team size is required"
    if (!formData.role) return "Role is required"
    if (!formData.theme) return "Problem theme selection is required"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // 1. Check duplicate email first
      const { data: existing } = await supabase
        .from("registrations")
        .select("email")
        .eq("email", formData.email)
        .maybeSingle()

      if (existing) {
        setError("Already registered! This email is already in use.")
        setIsSubmitting(false)
        return
      }

      // 2. Generate registration ID
      const regId = generateRegistrationId()

      // 3. Insert data
      const { error: insertError } = await supabase
        .from("registrations")
        .insert([
          {
            registration_id: regId,
            full_name: formData.full_name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            department: formData.department,
            year: formData.year,
            team_name: formData.team_name,
            team_size: parseInt(formData.team_size),
            role: formData.role,
            theme: formData.theme,
          },
        ])

      if (insertError) {
        if (insertError.code === "23505") {
          setError("Already registered! This email is already in use.")
        } else {
          setError(insertError.message)
        }
        setIsSubmitting(false)
        return
      }

      // 4. Redirect to success page
      const params = new URLSearchParams({
        id: regId,
        name: formData.full_name,
        team: formData.team_name,
        theme: formData.theme,
      })
      router.push(`/register/success?${params.toString()}`)
    } catch (err) {
      console.log("[v0] Registration error:", err)
      setError("An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Crystal-clear video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed left-0 top-0 z-0 h-full w-full object-cover"
        style={{ opacity: 1, filter: "none", backdropFilter: "none" }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay - rgba(0,0,0,0.65) for readability */}
      <div
        className="fixed inset-0 z-[1]"
        style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      />

      <div className="relative z-10">
        <Navbar />

        <section className="px-4 pb-20 pt-32">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-4 py-2 backdrop-blur-md">
                <Zap className="h-4 w-4 text-[#00d4ff]" />
                <span className="text-sm font-medium text-[#f0f0f5]">
                  Registration Open
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                <span className="text-gradient">Join</span>
                <span className="text-[#f0f0f5]"> NexusHack 2025</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-[#e0e0e8]">
                Register your team for the 24-hour hackathon at KLS Gogte Institute of
                Technology, Belagavi. June 15-16, 2025.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-[#7c3aed]/30 bg-[#0a0a0f]/80 p-8 backdrop-blur-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#f0f0f5]">
                    <Users className="h-5 w-5 text-[#00d4ff]" />
                    Personal Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Full Name *
                      </label>
                      <Input
                        placeholder="Enter your full name"
                        value={formData.full_name}
                        onChange={(e) => handleInputChange("full_name", e.target.value)}
                        className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] placeholder:text-[#606070] focus:border-[#00d4ff]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] placeholder:text-[#606070] focus:border-[#00d4ff]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Phone Number *
                      </label>
                      <Input
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] placeholder:text-[#606070] focus:border-[#00d4ff]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        College/University *
                      </label>
                      <Input
                        placeholder="Enter your college name"
                        value={formData.college}
                        onChange={(e) => handleInputChange("college", e.target.value)}
                        className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] placeholder:text-[#606070] focus:border-[#00d4ff]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Department *
                      </label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleInputChange("department", value)}
                      >
                        <SelectTrigger className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5]">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent className="border-[#7c3aed]/30 bg-[#1a1a2e]">
                          {departments.map((dept) => (
                            <SelectItem
                              key={dept}
                              value={dept}
                              className="text-[#f0f0f5]"
                            >
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Year of Study *
                      </label>
                      <Select
                        value={formData.year}
                        onValueChange={(value) => handleInputChange("year", value)}
                      >
                        <SelectTrigger className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5]">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent className="border-[#7c3aed]/30 bg-[#1a1a2e]">
                          {years.map((year) => (
                            <SelectItem
                              key={year}
                              value={year}
                              className="text-[#f0f0f5]"
                            >
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Team Information */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#f0f0f5]">
                    <Users className="h-5 w-5 text-[#00d4ff]" />
                    Team Information
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Team Name *
                      </label>
                      <Input
                        placeholder="Enter a unique team name"
                        value={formData.team_name}
                        onChange={(e) => handleInputChange("team_name", e.target.value)}
                        className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5] placeholder:text-[#606070] focus:border-[#00d4ff]"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Team Size *
                      </label>
                      <Select
                        value={formData.team_size}
                        onValueChange={(value) => handleInputChange("team_size", value)}
                      >
                        <SelectTrigger className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5]">
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent className="border-[#7c3aed]/30 bg-[#1a1a2e]">
                          {teamSizes.map((size) => (
                            <SelectItem
                              key={size}
                              value={size}
                              className="text-[#f0f0f5]"
                            >
                              {size} Members
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-[#a0a0b0]">
                        Your Role in Team *
                      </label>
                      <Select
                        value={formData.role}
                        onValueChange={(value) => handleInputChange("role", value)}
                      >
                        <SelectTrigger className="border-[#7c3aed]/30 bg-[#1a1a2e] text-[#f0f0f5]">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent className="border-[#7c3aed]/30 bg-[#1a1a2e]">
                          {roles.map((role) => (
                            <SelectItem
                              key={role}
                              value={role}
                              className="text-[#f0f0f5]"
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Problem Theme */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#f0f0f5]">
                    <Brain className="h-5 w-5 text-[#00d4ff]" />
                    Problem Theme Selection *
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {themes.map((theme) => {
                      const Icon = theme.icon
                      const isSelected = formData.theme === theme.id
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => handleInputChange("theme", theme.id)}
                          className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                            isSelected
                              ? "border-[#00d4ff] bg-[#00d4ff]/10"
                              : "border-[#7c3aed]/30 bg-[#1a1a2e] hover:border-[#7c3aed]/50"
                          }`}
                        >
                          <div
                            className={`rounded-lg p-2 ${
                              isSelected ? "bg-[#00d4ff]/20" : "bg-[#7c3aed]/20"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                isSelected ? "text-[#00d4ff]" : "text-[#7c3aed]"
                              }`}
                            />
                          </div>
                          <span
                            className={`font-medium ${
                              isSelected ? "text-[#00d4ff]" : "text-[#f0f0f5]"
                            }`}
                          >
                            {theme.name}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="ml-auto h-5 w-5 text-[#00d4ff]" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="pulse-glow group w-full bg-[#00d4ff] py-6 text-lg font-semibold text-[#0a0a0f] hover:bg-[#00d4ff]/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-[#a0a0b0]">
                  By registering, you agree to the event rules and code of conduct.
                  Registration fee: FREE
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
