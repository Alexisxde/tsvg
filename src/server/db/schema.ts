import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const leagueTable = sqliteTable("league", {
	id_league: text("id_league").primaryKey().notNull(),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	country: text("country").notNull(),
	icon: text("icon").notNull(),
	color: text("color").notNull()
})

export const teamsTable = sqliteTable("teams", {
	id_team: text("id_team").primaryKey().notNull(),
	slug: text("slug").notNull(),
	name: text("name").notNull(),
	full_name: text("full_name").notNull(),
	icon: text("icon").notNull(),
	id_league: text("id_league")
		.notNull()
		.references(() => leagueTable.id_league, { onDelete: "cascade" })
})
