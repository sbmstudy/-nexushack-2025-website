"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Who can participate in NexusHack 2025?",
    answer: "NexusHack 2025 is open to all students from engineering colleges across India. Whether you're a beginner or an experienced developer, you're welcome to join and showcase your skills.",
  },
  {
    question: "What is the team size requirement?",
    answer: "Teams can consist of 2 to 4 members. Solo participation is not allowed as we encourage collaboration and teamwork. You can form teams with students from different colleges as well.",
  },
  {
    question: "Is there a registration fee?",
    answer: "No, participation in NexusHack 2025 is completely free! We believe in making innovation accessible to everyone. Just bring your laptop, creativity, and enthusiasm.",
  },
  {
    question: "What should I bring to the hackathon?",
    answer: "Bring your laptop, charger, student ID, and any hardware you might need for your project. We'll provide food, drinks, a workspace, WiFi, and lots of caffeine to keep you going!",
  },
  {
    question: "Will food and accommodation be provided?",
    answer: "Yes! We'll provide all meals, snacks, and beverages throughout the 24-hour event. For outstation participants, we can help arrange accommodation in nearby hostels.",
  },
  {
    question: "What are the judging criteria?",
    answer: "Projects will be evaluated based on Innovation (25%), Technical Complexity (25%), Impact & Usefulness (25%), and Presentation (25%). Judges include industry experts and faculty members.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#f0f0f5] sm:text-4xl">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-[#a0a0b0]">Got questions? {"We've"} got answers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass rounded-xl border-[#7c3aed]/30 px-6 data-[state=open]:border-[#00d4ff]/50"
              >
                <AccordionTrigger className="py-4 text-left text-[#f0f0f5] hover:text-[#00d4ff] hover:no-underline [&[data-state=open]]:text-[#00d4ff]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-[#a0a0b0]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
