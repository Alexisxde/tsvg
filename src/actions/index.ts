import { db } from "@/server/db"
import { leagueTable, teamsTableAuditory } from "@/server/db/schema"
import { defineAction } from "astro:actions"
import { z } from "astro:schema"
import crypto from "crypto"
import { eq } from "drizzle-orm"

export const server = {
	submitLogoTeam: defineAction({
		accept: "form",
		input: z.object({ name: z.string(), league: z.string(), icon: z.string() }),
		handler: async ({ name, icon, league }) => {
			if (league === "null") return

			const id_team = crypto.randomUUID()

			const leagueData = await db
				.select()
				.from(leagueTable)
				.where(eq(leagueTable.slug, league))
				.limit(1)

			if (!leagueData || leagueData.length === 0) return "Error"

			const id_league = leagueData[0]?.id_league
			const slug = name.toLowerCase().replace(/\s+/g, "-")

			await db
				.insert(teamsTableAuditory)
				.values({
					id_team: `${id_team}`,
					slug,
					icon: `${icon}`,
					name: `${name}`,
					badge: "no",
					id_league: `${id_league}`
				})

			return "thank you!"
		}
	})
}
