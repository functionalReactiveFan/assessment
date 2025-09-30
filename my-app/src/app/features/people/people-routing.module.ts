import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeoplePageComponent } from './people-page.component';
import { CharacterDetailsComponent } from '../../details/character-details/character-details.component';

const routes: Routes = [
  { path: '', component: PeoplePageComponent },
  { path: ':id', component: CharacterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
