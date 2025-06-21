import { getLeagueIconBySlug } from "@/server/queries/league"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ params }) => {
	const { league } = params
	if (!league) return new Response("League slug is required", { status: 400 })

	const leagueData = await getLeagueIconBySlug(league)
	if (!leagueData || leagueData.length === 0)
		return new Response("SVG not found", { status: 404 })

	const icon = leagueData[0]?.icon
	return new Response(icon, {
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400"
		}
	})
}
