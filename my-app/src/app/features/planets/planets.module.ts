import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsPageComponent } from './planets-page.component';
import { PlanetDetailsComponent } from '../../details/planet-details/planet-details.component';

@NgModule({
  declarations: [
    PlanetsPageComponent,
    PlanetDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlanetsRoutingModule
  ]
})
export class PlanetsModule {}
