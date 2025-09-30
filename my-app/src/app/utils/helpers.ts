// Shared utilities
export const FILMS_ID_REGEX = /films\/(\d+)\/?$/;
export const PEOPLE_ID_REGEX = /people\/(\d+)\/?$/;
export const PLANETS_ID_REGEX = /planets\/(\d+)\/?$/;

export function extractId(url: string, regex: RegExp): string | null {
  if (!url) return null;
  const match = url.match(regex);
  return match ? match[1] : null;
}

