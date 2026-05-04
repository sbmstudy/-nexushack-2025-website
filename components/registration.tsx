"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, User, Mail, Phone, Building2, GraduationCap, Users, UserCheck } from "lucide-react"

type FormData = {
  fullName: string
  email: string
  phone: string
  college: string
  department: string
  teamName: string
  role: "leader" | "member"
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function Registration() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    department: "",
    teamName: "",
    role: "member",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number"
    }
    if (!formData.college.trim()) newErrors.college = "College is required"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.teamName.trim()) newErrors.teamName = "Team name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="register" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#f0f0f5] sm:text-4xl">
            <span className="text-gradient">Register</span> Now
          </h2>
          <p className="text-[#a0a0b0]">Secure your spot in the most anticipated hackathon</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl p-8 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#00d4ff]/20"
                >
                  <CheckCircle2 className="h-12 w-12 text-[#00d4ff]" />
                </motion.div>
                <h3 className="mb-2 text-2xl font-bold text-[#f0f0f5]">Registration Successful!</h3>
                <p className="mb-6 text-[#a0a0b0]">
                  {"We've"} received your registration. Check your email for confirmation.
                </p>
                <Button
                  onClick={() => {
                    setIsSuccess(false)
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      college: "",
                      department: "",
                      teamName: "",
                      role: "member",
                    })
                  }}
                  variant="outline"
                  className="border-[#7c3aed] text-[#f0f0f5] hover:bg-[#7c3aed]/20"
                >
                  Register Another
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2 text-[#f0f0f5]">
                      <User className="h-4 w-4 text-[#00d4ff]" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className={`border-[#7c3aed]/30 bg-[#1a1a2e]/50 text-[#f0f0f5] placeholder:text-[#a0a0b0]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 ${
                        errors.fullName ? "border-[#ff4757]" : ""
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#ff4757]">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-[#f0f0f5]">
                      <Mail className="h-4 w-4 text-[#00d4ff]" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`border-[#7c3aed]/30 bg-[#1a1a2e]/50 text-[#f0f0f5] placeholder:text-[#a0a0b0]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 ${
                        errors.email ? "border-[#ff4757]" : ""
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#ff4757]">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2 text-[#f0f0f5]">
                      <Phone className="h-4 w-4 text-[#00d4ff]" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={`border-[#7c3aed]/30 bg-[#1a1a2e]/50 text-[#f0f0f5] placeholder:text-[#a0a0b0]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 ${
                        errors.phone ? "border-[#ff4757]" : ""
                      }`}
                      placeholder="9876543210"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#ff4757]">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="college" className="flex items-center gap-2 text-[#f0f0f5]">
                      <Building2 className="h-4 w-4 text-[#00d4ff]" />
                      College
                    </Label>
                    <Input
                      id="college"
                      value={formData.college}
                      onChange={(e) => handleChange("college", e.target.value)}
                      className={`border-[#7c3aed]/30 bg-[#1a1a2e]/50 text-[#f0f0f5] placeholder:text-[#a0a0b0]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 ${
                        errors.college ? "border-[#ff4757]" : ""
                      }`}
                      placeholder="KLS GIT"
                    />
                    {errors.college && (
                      <p className="text-xs text-[#ff4757]">{errors.college}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department" className="flex items-center gap-2 text-[#f0f0f5]">
                      <GraduationCap className="h-4 w-4 text-[#00d4ff]" />
                      Department
                    </Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => handleChange("department", e.target.value)}
                      className={`border-[#7c3aed]/30 bg-[#1a1a2e]/50 text-[#f0f0f5] placeholder:text-[#a0a0b0]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 ${
                        errors.department ? "border-[#ff4757]" : ""
                      }`}
                      placeholder="Computer Science"
                    />
                    {errors.department && (
                      <p className="text-xs text-[#ff4757]">{errors.department}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamName" className="flex items-center gap-2 text-[#f0f0f5]">
                      <Users className="h-4 w-4 text-[#00d4ff]" />
                      Team Name
                    </Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => handleChange("teamName", e.target.value)}
                      className={`border-[#7c3aed]/30 bg-[#1a1a2e]/50 text-[#f0f0f5] placeholder:text-[#a0a0b0]/50 focus:border-[#00d4ff] focus:ring-[#00d4ff]/20 ${
                        errors.teamName ? "border-[#ff4757]" : ""
                      }`}
                      placeholder="Code Warriors"
                    />
                    {errors.teamName && (
                      <p className="text-xs text-[#ff4757]">{errors.teamName}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[#f0f0f5]">
                    <UserCheck className="h-4 w-4 text-[#00d4ff]" />
                    Role in Team
                  </Label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => handleChange("role", "leader")}
                      className={`flex-1 rounded-xl border px-4 py-3 text-center transition-all ${
                        formData.role === "leader"
                          ? "border-[#00d4ff] bg-[#00d4ff]/20 text-[#00d4ff]"
                          : "border-[#7c3aed]/30 text-[#a0a0b0] hover:border-[#7c3aed]/50"
                      }`}
                    >
                      Team Leader
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange("role", "member")}
                      className={`flex-1 rounded-xl border px-4 py-3 text-center transition-all ${
                        formData.role === "member"
                          ? "border-[#00d4ff] bg-[#00d4ff]/20 text-[#00d4ff]"
                          : "border-[#7c3aed]/30 text-[#a0a0b0] hover:border-[#7c3aed]/50"
                      }`}
                    >
                      Team Member
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="pulse-glow w-full bg-[#00d4ff] py-6 text-lg font-semibold text-[#0a0a0f] hover:bg-[#00d4ff]/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register for NexusHack 2025"
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
