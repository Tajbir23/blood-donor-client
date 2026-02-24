# LifeDrop — Blood Donation Platform (Frontend)

LifeDrop is a full-featured blood donation platform built for Bangladesh, connecting blood donors with those in need during emergencies. This repository contains the **Next.js frontend** client application.

## Features

- 🩸 **Find Blood Donors** — Search donors by blood type, location and district
- 🚨 **Emergency SOS** — Send urgent blood requests to nearby eligible donors
- 📋 **Donor Registration** — Register as a donor with medical history & location
- 🏢 **Organization Dashboard** — Manage blood donation organizations and members
- 📊 **Admin Dashboard** — Manage users, sliders, admins and moderators
- 🏆 **Donor Leaderboard** — Recognize top blood donors publicly
- 📝 **Blog & Health Advice** — Informative articles on blood donation
- 💳 **Online Donation** — Support the platform via SSLCommerz payment
- 🗺️ **Map Integration** — Leaflet-based interactive location picker
- 💬 **Real-time Updates** — Socket.IO for live notifications
- 📱 **PWA Support** — Installable as a Progressive Web App
- 📧 **Email Verification** — OTP-based account verification flow

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS 4 |
| Data Fetching | TanStack Query v5 |
| Rich Text Editor | Tiptap |
| Maps | Leaflet + React-Leaflet |
| Charts | Chart.js + React-ChartJS-2 |
| Animations | Framer Motion |
| Icons | Lucide React + React Icons |
| HTTP Client | Axios |
| Real-time | Socket.IO Client |
| Auth | JWT (jose) |
| PWA | next-pwa |
| Runtime | React 19 |

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Running instance of [blood-donor-server](../blood-donor-server)

### Installation

```bash
# Clone the repository
git clone https://github.com/Tajbir23/blood-donor-client.git
cd blood-donor-client

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_JWT_TOKEN=your_jwt_secret
NEXT_PUBLIC_NODE_ENV=development
```

### Running the App

```bash
# Development (Turbopack)
npm run dev

# Production build (webpack)
npm run build
npm start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (routes)/              # App route groups
│   │   ├── (authentication)/  # Login, Register, Verify
│   │   └── .../               # All other pages
│   ├── actions/               # Next.js server actions
│   ├── api/                   # API route handlers
│   ├── config/                # App configuration
│   ├── hooks/                 # App-level hooks
│   ├── libs/                  # Utility functions
│   └── utils/                 # Helper utilities
├── components/
│   ├── auth/                  # Auth components
│   ├── dashboard/             # Admin dashboard UI
│   ├── home/                  # Home page sections
│   ├── layout/                # Header, Footer, Nav
│   ├── modals/                # Modal dialogs
│   └── ui/                    # Reusable UI components
├── hooks/                     # Global custom hooks
└── lib/
    ├── api/                   # API call functions
    ├── constants/             # App constants
    ├── data/                  # Static data
    ├── types/                 # TypeScript types
    └── utils/                 # Shared utilities
```

## Available Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/find-blood` | Search blood donors |
| `/sos` | Emergency blood request |
| `/register` | User registration |
| `/login` | Login |
| `/profile` | User profile |
| `/dashboard` | Admin dashboard |
| `/organizations` | Organization listing |
| `/organization_dashboard/[id]` | Org admin panel |
| `/blood-donation` | Donation info |
| `/donation` | Financial donation |
| `/blog` | Blog listing |
| `/advice` | Health advice |
| `/events` | Events |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
