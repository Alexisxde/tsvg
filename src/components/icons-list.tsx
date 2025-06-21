import { APP_URL } from "@/lib/const"
import { filterItems } from "@/lib/utils"
import type { TeamWithLeague } from "@/server/db/types"
import { useState } from "react"

interface Props {
	icons: TeamWithLeague[]
}

export default function IconsWithSearch({ icons }: Props) {
	const [searchQuery, setSearchQuery] = useState("")
	const filteredIcons = filterItems(searchQuery, icons)

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	return (
		<main>
			<section className="relative w-full text-base">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
					<div className="pointer-events-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</svg>
					</div>
				</div>
				<input
					type="text"
					placeholder={`Search ${icons.length} logos...`}
					autoComplete="off"
					className="w-full border-b border-zinc-300 bg-zinc-100 p-3 px-10 text-zinc-900 placeholder-zinc-500 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
					value={searchQuery}
					onChange={handleSearchChange}
				/>
			</section>
			<section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
				{filteredIcons.map(
					({ id_team, slug, name, slug_league, league_name }) => (
						<article
							key={id_team}
							className="flex flex-col items-center justify-center rounded-md border border-zinc-200 p-4 text-zinc-900 transition-colors duration-100 dark:border-zinc-800 dark:text-zinc-100"
							title={name}>
							<img
								src={`${APP_URL}/api/leagues/${slug_league}/${slug}`}
								alt={`${name} Logo SVG`}
								className="size-full h-20 object-contain"
								loading="lazy"
							/>
							<span className="flex flex-1 items-center justify-center p-2 text-center text-pretty">
								{name}
							</span>
							<a
								href={`/leagues/${slug_league}`}
								className="flex cursor-pointer items-center justify-center gap-x-1 rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 capitalize ring-1 ring-zinc-600/10 transition-all duration-300 ease-in-out ring-inset dark:bg-zinc-400/10 dark:text-zinc-400 dark:ring-zinc-400/30">
								{league_name}
							</a>
						</article>
					)
				)}
			</section>
		</main>
	)
}
