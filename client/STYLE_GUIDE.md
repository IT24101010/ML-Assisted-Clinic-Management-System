# Client Style Guide

This document defines the visual conventions the whole team must follow for the frontend of the Clinic Management System. 

> **IMPORTANT**: All members must use these shared classes. Do NOT create custom CSS or inline colors. If you need a new pattern, discuss with the team first.

## Custom Tailwind Colors
Use these exact color names in your Tailwind classes (e.g., `text-primary`, `bg-surface`, `border-accent`).

- **Primary**: `bg-primary` (#0D9488), `bg-primary-light` (#4FD1C5), `bg-primary-dark` (#0F766E)
- **Secondary**: `bg-secondary` (#3B82F6), `bg-secondary-light` (#93C5FD), `bg-secondary-dark` (#1D4ED8)
- **Accent**: `bg-accent` (#F59E0B)
- **Background**: `bg-background` (#F8FAFC) - Use for main background layout
- **Surface**: `bg-surface` (#FFFFFF) - Use for cards and containers
- **Text Primary**: `text-textPrimary` (#1E293B) - Main headings and body text
- **Text Secondary**: `text-textSecondary` (#64748B) - Subtitles, descriptions, placeholders
- **Danger**: `bg-danger`, `text-danger` (#EF4444) - Errors, destructive actions
- **Success**: `bg-success`, `text-success` (#22C55E) - Confirmations, active states

## Standard Components

### Buttons
- **Primary Button**: `bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors`
- **Secondary/Outline Button**: `bg-transparent border border-gray-300 text-textPrimary hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition-colors`
- **Danger Button**: `bg-danger hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors`
- **Disabled State**: Add `opacity-50 cursor-not-allowed` to any button

### Cards
- **Standard Card**: `bg-surface rounded-2xl shadow-sm border border-gray-100 p-6`

### Forms
- **Standard Input**: `w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors`

### Typography (Headings)
- **Page Title**: `text-2xl font-bold text-textPrimary mb-6`
- **Section Title**: `text-xl font-semibold text-textPrimary mb-4`
- **Sub-section**: `text-lg font-medium text-textPrimary mb-2`

### Spacing
- Use multiples of 4 for consistent padding and margins: `p-4`, `p-6`, `p-8`, `gap-4`, `gap-6`, `mb-4`, `mt-6`.

### Admin Tables
- Wrap tables in: `overflow-x-auto bg-surface rounded-2xl shadow-sm border border-gray-100`
- **Table Head**: `bg-gray-50 text-left text-xs font-semibold text-textSecondary uppercase tracking-wider px-6 py-3`
- **Table Row**: `hover:bg-primary-light/5 transition-colors border-t border-gray-100`
- **Table Data**: `px-6 py-4 whitespace-nowrap text-sm text-textPrimary`
