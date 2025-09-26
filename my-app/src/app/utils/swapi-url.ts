// Shared utilities for working with SWAPI URLs

export const FILM_ID_REGEX = /films\/(\d+)\/?$/;

export function extractFilmId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(FILM_ID_REGEX);
  return match ? match[1] : null;
}
