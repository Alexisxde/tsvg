import { getTeamIconBySlug } from "@/server/queries/team"
import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ params }) => {
	const { team } = params
	if (!team) return new Response("team slug is required", { status: 400 })

	const teamData = await getTeamIconBySlug(team)
	if (!teamData || teamData.length === 0)
		return new Response("SVG not found", { status: 404 })

	const icon = teamData[0]?.icon
	return new Response(icon, {
		headers: {
			"Content-Type": "image/svg+xml",
			"Cache-Control": "public, max-age=86400"
		}
	})
}
