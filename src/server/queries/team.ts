import { db } from "@/server/db"
import { leagueTable, teamsTable } from "@/server/db/schema"
import { asc, eq } from "drizzle-orm"

export const getTeamsIcons = async () => {
	return await db
		.select({
			id_team: teamsTable.id_team,
			name: teamsTable.full_name,
			slug: teamsTable.slug,
			icon: teamsTable.icon,
			slug_league: leagueTable.slug,
			league_name: leagueTable.name
		})
		.from(teamsTable)
		.innerJoin(leagueTable, eq(teamsTable.id_league, leagueTable.id_league))
		.orderBy(asc(teamsTable.slug))
}

export const getTeamIconBySlug = async (slug: string) => {
	return await db
		.select()
		.from(teamsTable)
		.where(eq(teamsTable.slug, slug))
		.limit(1)
}

export const getTeamIconsByLeagueSlug = async (slug: string) => {
	return await db
		.select({
			id_team: teamsTable.id_team,
			name: teamsTable.full_name,
			slug: teamsTable.slug,
			icon: teamsTable.icon,
			slug_league: leagueTable.slug,
			league_name: leagueTable.name
		})
		.from(teamsTable)
		.innerJoin(leagueTable, eq(teamsTable.id_league, leagueTable.id_league))
		.where(eq(leagueTable.slug, slug))
		.orderBy(asc(teamsTable.slug))
}
