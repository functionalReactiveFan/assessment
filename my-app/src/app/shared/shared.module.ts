import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardComponent } from '../components/card/card.component';
import { DetailsComponent } from '../components/details/details.component';
import { AddCharacterComponent } from '../forms/add-character.component';
import { AddFilmComponent } from '../forms/add-film.component';
import { AddPlanetComponent } from '../forms/add-planet.component';

@NgModule({
  declarations: [
    CardComponent,
    DetailsComponent,
    AddCharacterComponent,
    AddFilmComponent,
    AddPlanetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CardComponent,
    DetailsComponent,
    AddCharacterComponent,
    AddFilmComponent,
    AddPlanetComponent
  ]
})
export class SharedModule {}
