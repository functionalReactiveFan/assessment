import { Routes } from '@angular/router';
import { DetailViewComponent } from "./components/detail-view/detail.component";
import { MoviesPageComponent } from "./pages/movies-page/movies-page.component";
import { PeoplePageComponent } from "./pages/people-page/people-page.component";
import { PlanetsPageComponent } from "./pages/planets-page/planets-page.component";
import { CharacterDetailsComponent } from "./details/character-details/character-details.component";
import { PlanetDetailsComponent } from "./details/planet-details/planet-details.component";

export const routes: Routes = [
  { path: 'films-list', component: MoviesPageComponent },
  { path: 'films-detail', component: DetailViewComponent },
  { path: 'character-detail', component: CharacterDetailsComponent },
  { path: 'planet-detail', component: PlanetDetailsComponent },
  { path: 'people-list', component: PeoplePageComponent },
  { path: 'planets-list', component: PlanetsPageComponent },
  { path: '', redirectTo: 'films-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'films-list' }
];
