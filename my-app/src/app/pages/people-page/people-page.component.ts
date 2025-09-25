import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { PeopleListComponent } from '../../components/people-list/people-list.component';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [CommonModule, PeopleListComponent],
  template: `
    <div class="container people-page-container">
      <h1 class="page-title">Personen</h1>
      <app-people-list [people]="people$ | async"></app-people-list>
    </div>
  `,
  styles: [`
    .people-page-container { padding-top: 64px; padding-bottom: 64px; }
    .page-title { font-size: 3.5rem; font-weight: 700; color: #0A1931; text-align: center; margin-top: 0; margin-bottom: 64px; }
    @media (max-width: 768px) {
      .page-title { font-size: 2.5rem; margin-bottom: 48px; }
      .people-page-container { padding-top: 48px; padding-bottom: 48px; }
    }
  `]
})
export class PeoplePageComponent implements OnInit {
  people$!: Observable<Person[]>;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople();
  }
}



