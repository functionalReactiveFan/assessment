export interface Movie {
  imageUrl: string;
  imageAlt: string;
  title: string;
  director: string;
  producers: string[];
  releaseDate: string;
  url: string;
  episodeId?: number;
  openingCrawl?: string;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
}
