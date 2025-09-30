import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { DetailsComponent } from './components/details/details.component';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { PlanetsPageComponent } from './pages/planets-page/planets-page.component';
import { FilmDetailsComponent } from './details/film-details/film-details.component';
import { CharacterDetailsComponent } from './details/character-details/character-details.component';
import { PlanetDetailsComponent } from './details/planet-details/planet-details.component';
import { AddCharacterComponent } from './forms/add-character.component';
import { AddFilmComponent } from './forms/add-film.component';
import { AddPlanetComponent } from './forms/add-planet.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    DetailsComponent,
    MoviesPageComponent,
    PeoplePageComponent,
    PlanetsPageComponent,
    FilmDetailsComponent,
    CharacterDetailsComponent,
    PlanetDetailsComponent,
    AddCharacterComponent,
    AddFilmComponent,
    AddPlanetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
