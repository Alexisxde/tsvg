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

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			alert("Copied to clipboard: " + text)
		})
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
					({ id_team, slug, name, slug_league, league_name, icon }) => (
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
							<div className="mt-2 flex items-center justify-center">
								<button
									onClick={() => copyToClipboard(icon)}
									className="hover:bg-accent text-accent-foreground inline-flex size-7 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="2"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
										/>
									</svg>
								</button>
								<button
									onClick={() => alert("Proximamente")}
									className="hover:bg-accent text-accent-foreground inline-flex size-7 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="2"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
										/>
									</svg>
								</button>
							</div>
						</article>
					)
				)}
			</section>
		</main>
	)
}
