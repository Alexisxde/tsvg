// @ts-check
import react from "@astrojs/react"
import vercel from "@astrojs/vercel"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import auth from "auth-astro"

export default defineConfig({
	output: "server",
	integrations: [react(), auth()],
	trailingSlash: "never",
	devToolbar: { enabled: false },
	vite: { plugins: [tailwindcss()] },
	adapter: vercel()
})
