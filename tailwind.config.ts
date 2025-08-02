import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'Georgia', 'ui-serif'],
        luxury: ['Playfair Display', 'serif'],
      },
      fontWeight: {
        'extra-light': '200',
        'medium': '500',
        'semi-bold': '600',
        'extra-bold': '800',
        'black': '900',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        // Enhanced Coffee Theme Colors
        coffee: {
          50: "hsl(40, 45%, 99%)",
          100: "hsl(39, 35%, 96%)",
          200: "hsl(35, 30%, 90%)",
          300: "hsl(32, 25%, 80%)",
          400: "hsl(28, 20%, 65%)",
          500: "hsl(25, 20%, 50%)",
          600: "hsl(22, 25%, 40%)",
          700: "hsl(20, 30%, 30%)",
          800: "hsl(18, 35%, 20%)",
          900: "hsl(16, 40%, 12%)",
        },
        // Enhanced Amber/Gold Colors
        amber: {
          300: "hsl(45, 95%, 65%)",
          400: "hsl(42, 92%, 60%)",
          500: "hsl(38, 95%, 55%)",
          600: "hsl(35, 90%, 50%)",
          700: "hsl(32, 85%, 45%)",
        },
        gold: {
          400: "hsl(51, 95%, 65%)",
          500: "hsl(48, 90%, 60%)",
        },
        cream: {
          100: "hsl(47, 50%, 95%)",
          200: "hsl(45, 40%, 92%)",
        },
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
