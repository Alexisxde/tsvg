import { leagueTable, teamsTable } from "@/db/schema"
import type { InferSelectModel } from "drizzle-orm"

export type League = InferSelectModel<typeof leagueTable>
export type Team = InferSelectModel<typeof teamsTable>

export type TeamWithLeague = {
	id_team: Team["id_team"]
	name: Team["name"]
	slug: Team["slug"]
	icon: Team["icon"]
	slug_league: League["slug"]
	league_name: League["name"]
}
