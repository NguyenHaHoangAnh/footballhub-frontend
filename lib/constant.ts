export const EXAMPLE_LEAGUE = {
    id: 1,
    name: "Premier League",
    logo: "/images/logos/no-logo.webp",
    country: "England",
    type: "league",
    season: "2024/2025"
}

export const EXAMPLE_TEAM = {
    id: 1,
    name: "Manchester United",
    shortName: "ManUtd",
    logo: "/images/logos/no-logo.webp",
    country: "England",
    league: "Premier League",
}

export const EXAMPLE_MATCH = {
    id: 1, 
    league: EXAMPLE_LEAGUE, 
    homeTeam: EXAMPLE_TEAM, 
    awayTeam: EXAMPLE_TEAM, 
    startTime: "2025-05-23 10:09:16.963+00", 
    status: "upcoming", 
    scoreHome: 0, 
    scoreAway: 0, 
    round: 12, 
    season: "2024/2025", 
};