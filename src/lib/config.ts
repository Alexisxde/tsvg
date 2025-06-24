import { z } from "astro:content"

const envSchema = z.object({
	GITHUB_CLIENT_ID: z.string(),
	GITHUB_CLIENT_SECRET: z.string(),
	AUTH_SECRET: z.string()
})

const { error, success, data } = envSchema.safeParse(import.meta.env)

if (!success) {
	console.error("❌ Error en las variables de entorno: ", error.format())
	process.exit(1)
}

declare global {
	namespace NodeJS {
		interface ImportMeta extends z.infer<typeof envSchema> {}
	}
}

export const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, AUTH_SECRET } = data
