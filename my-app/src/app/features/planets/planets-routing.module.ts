import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanetsPageComponent } from './planets-page.component';
import { PlanetDetailsComponent } from '../../details/planet-details/planet-details.component';

const routes: Routes = [
  { path: '', component: PlanetsPageComponent },
  { path: ':id', component: PlanetDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanetsRoutingModule {}
