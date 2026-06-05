import presetWind4 from "@unocss/preset-wind4";
import { defineConfig } from "unocss";

export default defineConfig({
	presets: [presetWind4()],

	theme: {
		colors: {
			bg:      { DEFAULT: "#F3F1EB", surface: "#F8F7F2", alt: "#ECE9E1" },
			text:    { DEFAULT: "#1A1A18", secondary: "#575750", muted: "#7C7B73" },
			border:  { DEFAULT: "#D6D3CA", hover: "#C4C1B6" },
			primary: { DEFAULT: "#566257", hover: "#475148" },
			accent:  { DEFAULT: "#8B6B4E", soft: "#E8DFD4", hover: "#73583F" },
			green:   { DEFAULT: "#566257" },
			cyan:    { DEFAULT: "#5E726E" },
			purple:  { DEFAULT: "#6B5E7A" },
			yellow:  { DEFAULT: "#9E8B5A" },
			red:     { DEFAULT: "#A85E54" },
		},
		fontFamily: {
			sans: "'Geist', 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
			mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
		},
		fontSize: {
			xs:    "0.813rem",
			sm:    "0.938rem",
			base:  "1.125rem",
			lg:    "1.25rem",
			xl:    "1.5rem",
			"2xl": "2rem",
			"3xl": "2.5rem",
			hero:  "clamp(3.5rem, 9vw, 6.5rem)",
		},
		spacing: {
			"3xs": "0.25rem", "2xs": "0.5rem", xs: "0.75rem",
			s: "1rem", m: "1.5rem", l: "2.25rem", xl: "3.5rem", "2xl": "5rem",
		},
		borderRadius: {
			sm: "6px", md: "10px", lg: "16px", full: "9999px",
		},
	},

	shortcuts: {
		"tag-pill":   "font-mono text-xs rounded-sm px-3xs py-px border border-transparent font-medium whitespace-nowrap",
		"tag-pill-muted": "tag-pill text-text-muted bg-transparent border-border",
		"card-surface": "bg-bg-surface border border-border rounded-lg",
	},

	cli: {
		entry: {
			patterns: [
				"./content/**/*.{html,njk,md,js}",
				"./themes/default/_includes/**/*.njk",
				"./themes/default/_layouts/**/*.njk",
			],
			outFile: "themes/default/css/unocss.css",
		},
	},
});
