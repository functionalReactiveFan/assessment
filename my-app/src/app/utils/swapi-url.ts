// Shared utilities for working with SWAPI URLs

export const FILM_ID_REGEX = /films\/(\d+)\/?$/;
export const PEOPLE_ID_REGEX = /people\/(\d+)\/?$/;

export function extractFilmId(url: string): string | null {
  if (!url) return null;
  const match = url.match(FILM_ID_REGEX);
  return match ? match[1] : null;
}

export function extractPeopleId(url: string): string | null {
  if (!url) return null;
  const match = url.match(PEOPLE_ID_REGEX);
  return match ? match[1] : null;
}
