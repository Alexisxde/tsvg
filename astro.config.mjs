// @ts-check
import react from "@astrojs/react"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
	output: "server",
	integrations: [react()],
	trailingSlash: "never",
	devToolbar: { enabled: false },
	vite: { plugins: [tailwindcss()] },
	adapter: vercel()
})
