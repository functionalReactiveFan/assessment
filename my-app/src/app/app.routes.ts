import { Routes } from '@angular/router';
import { DetailViewComponent } from "./components/detail-view/detail.component";
import { MovieListComponent } from "./components/movie-list/movie-list.component";

export const routes: Routes = [
  { path: 'films-list', component: MovieListComponent },
  { path: 'films-detail', component: DetailViewComponent },
  { path: '', redirectTo: '/films-list', pathMatch: 'full' }
];
