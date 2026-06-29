/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: { jeroo: { green: '#1FA85C', lime: '#9FE040', teal: '#009070' } },
			keyframes: {
				slideIn: {
					"0%": {
						transform: "translateX(-100%)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
			},
			animation: {
				pulse: "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"slide-animation": "slideIn 0.3s ease-in-out forwards",
			},
		},
	},
	plugins: [],
};
