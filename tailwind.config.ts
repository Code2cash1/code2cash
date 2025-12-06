import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#31a39c",
                    foreground: "#ffffff",
                },
                background: "#030303",
                foreground: "#ffffff",
                card: {
                    DEFAULT: "#0a0a0a",
                    foreground: "#ffffff",
                },
                popover: {
                    DEFAULT: "#0a0a0a",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#1a1a1a",
                    foreground: "#ffffff",
                },
                muted: {
                    DEFAULT: "#1a1a1a",
                    foreground: "#a1a1a1",
                },
                accent: {
                    DEFAULT: "#31a39c",
                    foreground: "#ffffff",
                },
                destructive: {
                    DEFAULT: "#ef4444",
                    foreground: "#ffffff",
                },
                border: "#2a2a2a",
                input: "#2a2a2a",
                ring: "#31a39c",
            },
            borderRadius: {
                lg: "0.5rem",
                md: "0.375rem",
                sm: "0.25rem",
            },
            maxWidth: {
                container: "1280px",
            },
            animation: {
                marquee: 'marquee var(--duration) linear infinite',
                'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(calc(-100% - var(--gap)))' }
                },
                'marquee-vertical': {
                    from: { transform: 'translateY(0)' },
                    to: { transform: 'translateY(calc(-100% - var(--gap)))' }
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' }
                },
                ping: {
                    '75%, 100%': {
                        transform: 'scale(2)',
                        opacity: '0'
                    }
                }
            },
        },
    },
    plugins: [],
};

export default config;
