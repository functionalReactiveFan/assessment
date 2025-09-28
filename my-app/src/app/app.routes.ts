import { Routes } from '@angular/router';
import { FilmDetailsComponent } from "./details/film-details/film-details.component";
import { MoviesPageComponent } from "./pages/movies-page/movies-page.component";
import { PeoplePageComponent } from "./pages/people-page/people-page.component";
import { PlanetsPageComponent } from "./pages/planets-page/planets-page.component";
import { CharacterDetailsComponent } from "./details/character-details/character-details.component";
import { PlanetDetailsComponent } from "./details/planet-details/planet-details.component";

export const routes: Routes = [
  { path: 'films-list', component: MoviesPageComponent },
  { path: 'films-detail/:id', component: FilmDetailsComponent },
  { path: 'people-list', component: PeoplePageComponent },
  { path: 'character-detail/:id', component: CharacterDetailsComponent },
  { path: 'planets-list', component: PlanetsPageComponent },
  { path: 'planet-detail/:id', component: PlanetDetailsComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' }
];
