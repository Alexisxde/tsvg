// @ts-check
import node from "@astrojs/node"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import auth from "auth-astro"

export default defineConfig({
	output: "server",
	integrations: [react(), auth()],
	trailingSlash: "never",
	devToolbar: { enabled: false },
	vite: { plugins: [tailwindcss()] },
	adapter: node({ mode: "standalone" })
})
