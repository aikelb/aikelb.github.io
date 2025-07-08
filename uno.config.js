import presetWind4 from "@unocss/preset-wind4";
import { defineConfig } from "unocss";

export default defineConfig({
	presets: [presetWind4()],
	rules: [
		[
			/^clip-path-\[(.+)\]$/,
			([, url]) => ({
				"clip-path": `${url}`,
			}),
		],
	],
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
