import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
  @Input() movies: Movie[] | null = [];
}