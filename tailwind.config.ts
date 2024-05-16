import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				dark: "#3e4557",
				darker: "#363d4f",
				darkest: "#2d3240",
				light: "#ece5d7",
				accent: "#d1bc8c",
			},
		},
	},
	plugins: [],
};
export default config;
