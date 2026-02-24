# Clinic Management System — Frontend

Client-side React application for the ML-Assisted Clinic Management System.

## Technologies
- React 18+ (Vite)
- Tailwind CSS v3
- React Router DOM
- Axios
- React Context API (Auth Context)

## Prerequisites
- Node.js v18+

## Setup
1. Clone the repository and `cd` into the `client` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the frontend Vite server. It will typically start on port `5173` (or `5174`/`5175`).

**Note:** The backend *must* be running concurrently on port `5000` for the API calls to work property. The `api.js` Axios utility defaults to `http://localhost:5000/api`.

## Where to build your module
Each team member will develop within their respective directory in `src/pages/`:
- Auth & Profiles: `src/pages/auth/` & `src/pages/patients/` (Hiruna)
- Appointments: `src/pages/appointments/` (Kavindi)
- Doctors: `src/pages/doctors/` (Madusanka)
- Services: `src/pages/services/` (Shehani)
- Feedback: `src/pages/feedback/` (Dineth)
- Announcements: `src/pages/announcements/` (Athief)
- Admin Dashboards: `src/pages/admin/` (Respective member modules)

The routes for all these pages are already mapped and configured in `src/App.jsx`.

## Shared Components Available
Instead of rewriting layouts, use the global shared components in `src/components/common/`:
- **Layout**: The overarching generic layout wrapper (includes Navbar and Footer).
- **Navbar**: Top navigation bar with responsive sizing and dynamic Auth links.
- **Footer**: Bottom footer with clinic details.
- **LoadingSpinner**: Centered circular spinner for async loading states.
- **ErrorAlert / SuccessAlert**: Use `react-hot-toast` for toast notifications (`toast.error()`, `toast.success()`), but custom components are available if needed.
- **PrivateRoute**: Route wrapper that redirects unauthenticated users to `/login`.
- **AdminRoute**: Route wrapper that restricts access strictly to users with the `admin` role.

> Refer to `STYLE_GUIDE.md` for UI and CSS conventions!
