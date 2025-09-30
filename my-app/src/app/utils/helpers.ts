// Shared accross components
export const FILMS_ID_REGEX = /films\/(\d+)\/?$/;
export const PEOPLE_ID_REGEX = /people\/(\d+)\/?$/;
export const PLANETS_ID_REGEX = /planets\/(\d+)\/?$/;

export const MAX_CHARACTERS_CHIPS = 3;
export const MAX_STARSHIPS_CHIPS = 3;
export const MAX_VEHICLES_CHIPS = 3;
export const MAX_PLANETS_CHIPS = 2;
export const MAX_FILMS_CHIPS = 5;

export function extractId(url: string, regex: RegExp): string | null {
  if (!url) return null;
  const match = url.match(regex);
  return match ? match[1] : null;
}

