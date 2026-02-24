# ML-Assisted Clinic Management System (G04)

**Course:** IT2021 — AI/ML Project, SLIIT

## Description

A web-based clinic management platform for RASUL Medical Center that digitizes patient registration, appointment scheduling, doctor directories, medical services, feedback, and announcements. Integrates AI-powered health risk prediction and NLP-based symptom triage (to be implemented in Sprint 2).

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **AI Microservice:** Python FastAPI

## Team Members

| Member | Module | Branch |
|---|---|---|
| Hiruna (De Silva T.H.H.D) | Patient Profiles & Auth | `feature/hiruna-patient-profiles` |
| Kavindi (Poornima P.P.) | Appointment Scheduling | `feature/kavindi-appointments` |
| Madusanka (Lakshan W.A.L.P.) | Doctor Directory | `feature/madusanka-doctors` |
| Shehani (Fernando M.S.T.) | Medical Services Catalog | `feature/shehani-services` |
| Dineth (Gunawardhana M.P.D.H) | Feedback & Reviews | `feature/dineth-feedback` |
| Athief (Mohamed M.F.A.) | Announcements Management | `feature/athief-announcements` |

## Quick Start

### Backend API (`/server`)
```bash
cd server
npm install
# Create a .env file with MONGO_URI, JWT_SECRET, PORT
npm run dev # Runs on port 5000 with nodemon
```

### Frontend UI (`/client`)
```bash
cd client
npm install
npm run dev # Runs on port 5173
```
*Note: Make sure the backend is running concurrently for the API to connect successfully.*

## Project Structure
- `client/`: React + Vite frontend UI. (See `client/STYLE_GUIDE.md` for UI conventions)
- `server/`: Node.js + Express backend REST API.
- `ai-service/`: Python FastAPI service for AI health predictions (to be integrated).

## Style Guide
Please refer to the [client/STYLE_GUIDE.md](client/STYLE_GUIDE.md) for detailed frontend UI conventions.
