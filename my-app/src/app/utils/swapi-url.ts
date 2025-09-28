// Shared utilities for working with SWAPI URLs

export const FILM_ID_REGEX = /films\/(\d+)\/?$/;
export const PEOPLE_ID_REGEX = /people\/(\d+)\/?$/;

function extractId(url: string, regex: RegExp): string | null {
  if (!url) return null;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function extractFilmId(url: string): string | null {
  return extractId(url, FILM_ID_REGEX);
}

export function extractPeopleId(url: string): string | null {
  return extractId(url, PEOPLE_ID_REGEX);
}
