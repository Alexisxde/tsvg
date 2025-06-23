import { getLeaguesIcons } from "@/server/queries/league"
import type { APIRoute } from "astro"

export const GET: APIRoute = async () => {
	const leagueData = await getLeaguesIcons()
	if (!leagueData || leagueData.length === 0)
		return new Response(JSON.stringify({ error: "No leagues found" }), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=3600, s-maxage=3600"
			}
		})

	return new Response(JSON.stringify(leagueData), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600, s-maxage=3600"
		}
	})
}
