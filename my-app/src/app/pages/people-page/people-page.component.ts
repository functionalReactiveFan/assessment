import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss']
})
export class PeoplePageComponent implements OnInit {
  people$!: Observable<Person[]>;

  constructor(private peopleService: PeopleService) {}

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople();
  }

  getPersonDetailHref(p: Person): string {
    const id = this.extractIdFromUrl(p.url);
    return id ? `/character-detail/${id}` : '/character-detail/1';
  }

  private extractIdFromUrl(url: string): string | null {
    if (!url) return null;
    const match = url.match(/people\/(\d+)\/?$/);
    return match ? match[1] : null;
  }
}



