import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FilmsRoutingModule } from './films-routing.module';
import { MoviesPageComponent } from '../../pages/movies-page/movies-page.component';
import { FilmDetailsComponent } from '../../details/film-details/film-details.component';

@NgModule({
  declarations: [
    MoviesPageComponent,
    FilmDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule {}
