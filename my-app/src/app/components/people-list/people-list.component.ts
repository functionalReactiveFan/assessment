import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  @Input() people: Person[] | null = [];
}



