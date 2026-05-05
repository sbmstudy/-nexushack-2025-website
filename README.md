⚡ NexusHack 2026 — Event Registration Platform
Build. Innovate. Disrupt.
A full-stack hackathon event website built for KLS Gogte Institute of Technology, Belagavi.
🌐 Live Demo
🔗 https://v0-nexushack-2025-website.vercel.app/

📌 Project Title & Description
NexusHack 2026 is a complete event registration platform designed for hackathons and ideathons. It provides participants with an immersive, animated experience to explore event details, register their teams, and receive a unique digital confirmation — all in one seamless flow.
This is not just a static website. It is a working full-stack application with real-time database integration, unique ID generation, and a cinematic UI built to match the energy of a real hackathon.
🧩 Problem Statement
College hackathon registrations are typically handled through:
Basic Google Forms with no confirmation system
Manual spreadsheet tracking prone to duplicates
No unique participant identification
Zero visual experience for participants
NexusHack 2026 solves this by providing:
A branded, animated event platform
Automated unique Registration ID per participant
Real-time data storage via Supabase
Instant digital confirmation on submission
✨ Features
Feature
Description
⏱️ Live Countdown Timer
Real-time countdown to event date
📊 Animated Stats
Count-up animation triggered on scroll
🎨 Theme Cards
5 problem statement cards with 3D hover tilt effect
📅 Event Schedule
Animated vertical timeline for Day 1 & Day 2
📋 Registration Form
Full validation, real-time error feedback, role + theme selection
🔑 Unique ID Generation
Auto-generated ID format: NXH-2026-XXXX-XXXX
🗄️ Supabase Integration
Real-time form data saved to cloud database
🚫 Duplicate Prevention
Email uniqueness check before submission
🎉 Success Page
Animated confirmation card with video popup
📱 Fully Responsive
Mobile-first design across all screen sizes
❓ FAQ Section
Smooth accordion-style collapsible questions
🛠️ Tech Stack
Frontend
Technology
Purpose
Next.js 14
React framework, file-based routing
Tailwind CSS
Utility-first styling
Framer Motion
Page animations, scroll triggers, transitions
HTML5 Video API
Backend & Database
Technology
Purpose
Supabase
PostgreSQL cloud database + REST API
Next.js API Routes
Server-side form handling
Deployment & Tools
Technology
Purpose
Vercel
Deployment + CI/CD pipeline
GitHub
Version control
canvas-confetti
Celebration animation on success
html2canvas
Confirmation card download

nexushack-2026/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout
│   └── register/
│       ├── page.tsx             # Registration form
│       └── success/
│           └── page.tsx         # Confirmation page
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx                 # Video background + countdown
│   ├── Stats.tsx                # Animated counters
│   ├── Themes.tsx               # Problem statement cards
│   ├── Schedule.tsx             # Event timeline
│   ├── RegistrationForm.tsx     # Form + Supabase integration
│   ├── FAQ.tsx                  # Accordion FAQ
│   └── Footer.tsx
├── lib/
│   └── supabase.js              # Supabase client config
├── public/
│   ├── hero-bg.mp4              # Hero video background
│   └── success-battle.mp4       # Success page video
├── .env.local                   # Environment variables (not committed)
└── README.md

👨‍💻 Built By
Shreyas Marajapure
First Year CSE Student 
Submission for IIC Tech Team Selection — May 2026