import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'films', loadChildren: () => import('./features/films/films.module').then(m => m.FilmsModule) },
  { path: 'people', loadChildren: () => import('./features/people/people.module').then(m => m.PeopleModule) },
  { path: 'planets', loadChildren: () => import('./features/planets/planets.module').then(m => m.PlanetsModule) },
  { path: '', redirectTo: 'films', pathMatch: 'full' },
  { path: '**', redirectTo: 'films' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
