import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeoplePageComponent } from './people-page.component';
import { CharacterDetailsComponent } from '../../details/character-details/character-details.component';

@NgModule({
  declarations: [
    PeoplePageComponent,
    CharacterDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PeopleRoutingModule
  ]
})
export class PeopleModule {}
