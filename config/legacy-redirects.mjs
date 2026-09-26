export const legacyRedirectManifest = [
  {
    source: "/junkyard-pirate-series",
    destination: "https://www.jamiemcfarlane.com/JunkyardPirate",
    status: 308,
    rationale: "The reader-facing Junkyard Pirate series page belongs to Jamie McFarlane.",
  },
  {
    source: "/spaceship-mechanic",
    destination: "https://www.jamiemcfarlane.com/SpaceshipMechanic",
    status: 308,
    rationale: "The reader-facing Spaceship Mechanic series page belongs to Jamie McFarlane.",
  },
  {
    source: "/oldest-starfighter-series",
    destination:
      "https://www.jamiemcfarlane.com/ScienceFictionAdventures#oldest-starfighter",
    status: 308,
    rationale: "Oldest Starfighter is presented in Jamie McFarlane's science-fiction hub.",
  },
  {
    source: "/privateer-tales-series",
    destination: "https://www.jamiemcfarlane.com/PrivateerTales",
    status: 308,
    rationale: "The reader-facing Privateer Tales series page belongs to Jamie McFarlane.",
  },
  {
    source: "/afterwar-saga",
    destination: "https://www.jamiemcfarlane.com/PrivateerTales#afterwar",
    status: 308,
    rationale: "Afterwar Saga is presented with its parent Privateer Tales universe.",
  },
  {
    source: "/books-witchy-world-series",
    destination: "https://www.jamiemcfarlane.com/WitchyWorld",
    status: 308,
    rationale: "The reader-facing Witchy World series page belongs to Jamie McFarlane.",
  },
  {
    source: "/henry-biggston-thriller-series",
    destination: "https://www.macworden.com/HenryBiggston",
    status: 308,
    rationale: "The current Henry Biggston reader-facing destination belongs to Mac Worden.",
  },
];

export function legacyRedirectsForNext() {
  return legacyRedirectManifest.map(({ source, destination, status }) => ({
    source,
    destination,
    permanent: status === 308,
  }));
}
