import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person.model';
import { PeopleCardComponent } from '../people-card/people-card.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, PeopleCardComponent],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  @Input() people: Person[] | null = [];
}


