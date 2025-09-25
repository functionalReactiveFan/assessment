import { Routes } from '@angular/router';
import { DetailViewComponent } from "./components/detail-view/detail.component";
import { MoviesPageComponent } from "./pages/movies-page/movies-page.component";

export const routes: Routes = [
  { path: 'films-list', component: MoviesPageComponent },
  { path: 'films-detail', component: DetailViewComponent },
  { path: '', redirectTo: 'films-list', pathMatch: 'full' },
  { path: '**', redirectTo: 'films-list' }
];
