# CodeChef ABESEC - Campus Event Management Platform 🚀

A modern, responsive, full-featured web application for managing and displaying college club events for **CodeChef ABESEC Student Chapter** at ABES Engineering College.

![Platform Overview](https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 1. Student / User Side

- **Home Page**:
  - **Club Introduction**: Official mission, student impact statistics (1,200+ members, 45+ events, ₹1.5L+ prizes won), and core pillars (CP, Hackathons, Bootcamps, Mentorship).
  - **Featured Event Spotlight**: Flagship event spotlight with live dynamic countdown timer, real-time seat availability bar, and 1-click registration.
  - **Upcoming Events Preview**: Curated preview of the next 3 upcoming campus events with direct quick-registration triggers.
  - **Student FAQs & Campus Info**: ABESEC campus guidelines, eligibility, and core team recruitment FAQs.

- **Events Page**:
  - **Browse All Events**: Grid of high-impact event cards showcasing categories, offline/online/hybrid mode, and live capacity meters.
  - **Detailed Event Cards**: Event name, date & time, venue, short overview, capacity progress, full details modal, and registration button.
  - **Live Search & Filter**:
    - Instant real-time search by event title, keywords, tags, or venue.
    - Category filtering: *All, Hackathons, Competitive Programming, Workshops, Tech Talks*.
    - Status filtering: *All, Upcoming, Completed*.

- **Event Registration Flow**:
  - Responsive modal with validated fields:
    - **Full Name**
    - **Email Address**
    - **College & Academic Year** (1st, 2nd, 3rd, 4th Year, or Other College)
    - **Department / Branch** (CSE, IT, AIML, DS, ECE, MCA)
    - **Phone Number** (10-digit mobile number validation)
  - Duplicate registration prevention by event and email.
  - Celebratory confetti animation upon successful registration.
  - **Digital Event Pass / Ticket**:
    - Unique Ticket Code (e.g. `CC-8941-NAME`)
    - Attendee verification badge
    - Simulated QR code for campus security gate check-in
    - Print / Save Pass functionality.

---

### 2. Admin Side (Admin Portal)

- **Admin Operations Dashboard**:
  - Key Performance Indicators: Total Events, Upcoming Events, Total Registrations, Attendance Check-ins.
  - **Add an Event**:
    - Title, Category, Date & Time, Venue, Mode (Offline/Online/Hybrid), Capacity.
    - Tagline, Full Description, Topic Tags, Perks & Prizes.
    - Featured Flagship toggle & cover photo presets.
  - **Edit an Event**:
    - Modify any event property in real-time.
  - **Delete an Event**:
    - Confirmation prompt with cascade cleanup of associated registrations.
  - **View Registered Students**:
    - Comprehensive table/card view of all attendee details (Ticket Code, Name, College/Year, Branch, Email, Phone, Event, Timestamp).
  - **Search & Filter Registrations**:
    - Live text search across student names, emails, phone numbers, and ticket codes.
    - Filter registrations by specific event.
    - Filter by attendance status (Present vs Pending).
  - **Attendance Check-in Toggle**:
    - 1-click mark "Present" or "Pending" for on-campus verification.
  - **CSV Data Export**:
    - Export filtered registrations directly to a downloadable CSV spreadsheet.
  - **Demo Data Reset**:
    - Reset back to clean mock events and registrations at any time.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 with custom glassmorphism and animations
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Storage Layer**: LocalStorage with reactive cross-component synchronization

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation & Run

1. Clone or navigate to the project directory:
   ```bash
   cd /home/anurag-singh/Desktop/codeChef-ABESEC
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
codeChef-ABESEC/
├── index.html                     # Application HTML entry with Google fonts
├── package.json                   # Project scripts and dependencies
├── vite.config.js                 # Vite + React + Tailwind v4 config
├── src/
│   ├── main.jsx                   # React DOM root entry
│   ├── App.jsx                    # Core application layout & routing
│   ├── index.css                  # Tailwind styles & theme helpers
│   ├── data/
│   │   └── mockEvents.js          # Seed events and student registrations
│   ├── services/
│   │   └── storageService.js      # LocalStorage CRUD & reactive sync
│   └── components/
│       ├── Navbar.jsx             # Navigation bar & mobile menu drawer
│       ├── Hero.jsx               # Chapter mission & impact statistics
│       ├── FeaturedEvent.jsx      # Countdown spotlight for flagship event
│       ├── EventCard.jsx          # Event card with badges & capacity meter
│       ├── SearchAndFilter.jsx    # Real-time search and category filtering
│       ├── EventRegistrationModal.jsx # Form with validation & confetti
│       ├── TicketModal.jsx        # Printable digital pass with QR code
│       ├── EventDetailsModal.jsx  # Full event overview & schedule modal
│       ├── ClubIntroduction.jsx   # Mission, pillars, and student FAQs
│       ├── AdminDashboard.jsx     # Full event & registration admin control
│       ├── EventFormModal.jsx     # Add & edit event modal for admins
│       └── Footer.jsx             # Chapter links & college location
```
