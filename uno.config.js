import presetWind4 from "@unocss/preset-wind4";
import { defineConfig } from "unocss";

export default defineConfig({
	presets: [presetWind4()],

	theme: {
		colors: {
			bg:      { DEFAULT: "#F8F8F4", surface: "#FFFFFF", alt: "#F1F2EC" },
			text:    { DEFAULT: "#1C1E1B", secondary: "#4D524B", muted: "#73786F" },
			border:  { DEFAULT: "#D8DDD3", hover: "#C4CABE" },
			primary: { DEFAULT: "#4F7C6B", hover: "#416757" },
			accent:  { DEFAULT: "#B76E4C", soft: "#EBD6CB", hover: "#9E5D3E" },
			green:   { DEFAULT: "#4F7C6B" },
			cyan:    { DEFAULT: "#5B8C85" },
			purple:  { DEFAULT: "#6B4F7C" },
			yellow:  { DEFAULT: "#C4A24E" },
			red:     { DEFAULT: "#C4564F" },
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
