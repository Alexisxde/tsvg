import type { TeamWithLeague } from "@/server/db/types"

export function filterItems(
	query: string,
	items: TeamWithLeague[]
): TeamWithLeague[] {
	if (!query || query.trim() === "") {
		return items
	}

	const lowerQuery = query.toLowerCase()
	return items.filter((item: TeamWithLeague) => {
		return Object.values(item).some(value => {
			return (
				typeof value === "string" && value.toLowerCase().includes(lowerQuery)
			)
		})
	})
}
