export interface Character {
  name: string;
  details: {
    height: string;
    weight: string;
    hair_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
  };
  homeworld: string;
  films: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  imageUrl: string;
}
