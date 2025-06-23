import { db } from "@/server/db"
import { leagueTable } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export const getLeaguesIcons = async () => await db.select().from(leagueTable)
export const getLeagueIconBySlug = async (slug: string) => {
	return await db
		.select()
		.from(leagueTable)
		.where(eq(leagueTable.slug, slug))
		.limit(1)
}
