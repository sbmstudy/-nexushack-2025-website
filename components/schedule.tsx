"use client"

import { motion } from "framer-motion"

const schedule = [
  {
    day: "Day 1",
    date: "June 15, 2026",
    events: [
      { time: "09:00 AM", title: "Registration & Check-in", description: "Get your badges and swag" },
      { time: "10:00 AM", title: "Opening Ceremony", description: "Welcome address and theme reveal" },
      { time: "11:00 AM", title: "Hacking Begins!", description: "Start building your projects" },
      { time: "01:00 PM", title: "Lunch Break", description: "Networking and refreshments" },
      { time: "06:00 PM", title: "Mentor Sessions", description: "Get guidance from industry experts" },
      { time: "09:00 PM", title: "Dinner & Fun Activities", description: "Take a break and recharge" },
    ],
  },
  {
    day: "Day 2",
    date: "June 16, 2026",
    events: [
      { time: "12:00 AM", title: "Midnight Snacks", description: "Fuel for the night owls" },
      { time: "06:00 AM", title: "Breakfast", description: "Morning refreshments" },
      { time: "09:00 AM", title: "Final Touches", description: "Polish your submissions" },
      { time: "11:00 AM", title: "Submissions Close", description: "Upload your projects" },
      { time: "12:00 PM", title: "Presentations Begin", description: "Pitch to the judges" },
      { time: "03:00 PM", title: "Closing Ceremony", description: "Awards and celebrations" },
    ],
  },
]

export function Schedule() {
  return (
    <section id="schedule" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-[#f0f0f5] sm:text-4xl">
            Event <span className="text-gradient">Schedule</span>
          </h2>
          <p className="text-[#a0a0b0]">24 hours of intense innovation and creativity</p>
        </motion.div>

        <div className="space-y-16">
          {schedule.map((day, dayIndex) => (
            <div key={day.day}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex items-center gap-4"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#7c3aed]">
                  <span className="text-xl font-bold text-[#0a0a0f]">{dayIndex + 1}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#f0f0f5]">{day.day}</h3>
                  <p className="text-[#a0a0b0]">{day.date}</p>
                </div>
              </motion.div>

              <div className="relative ml-8 border-l-2 border-[#7c3aed]/30 pl-8">
                {day.events.map((event, eventIndex) => (
                  <motion.div
                    key={event.time}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
                    className="relative mb-8 last:mb-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] top-0 flex h-4 w-4 items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-[#00d4ff]" />
                      <div className="absolute h-3 w-3 animate-ping rounded-full bg-[#00d4ff]/50" />
                    </div>

                    <div className="card-glow glass rounded-xl p-4">
                      <div className="mb-1 text-sm font-medium text-[#00d4ff]">{event.time}</div>
                      <h4 className="mb-1 text-lg font-semibold text-[#f0f0f5]">{event.title}</h4>
                      <p className="text-sm text-[#a0a0b0]">{event.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
