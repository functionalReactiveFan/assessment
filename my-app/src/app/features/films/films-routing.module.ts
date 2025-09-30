import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesPageComponent } from '../../pages/movies-page/movies-page.component';
import { FilmDetailsComponent } from '../../details/film-details/film-details.component';

const routes: Routes = [
  { path: '', component: MoviesPageComponent },
  { path: ':id', component: FilmDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule {}
