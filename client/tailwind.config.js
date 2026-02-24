/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: { light: '#4FD1C5', DEFAULT: '#0D9488', dark: '#0F766E' },
                secondary: { light: '#93C5FD', DEFAULT: '#3B82F6', dark: '#1D4ED8' },
                accent: '#F59E0B',
                background: '#F8FAFC',
                surface: '#FFFFFF',
                textPrimary: '#1E293B',
                textSecondary: '#64748B',
                danger: '#EF4444',
                success: '#22C55E'
            }
        },
    },
    plugins: [],
}
