import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.scss']
})
export class MoviesPageComponent implements OnInit {
  movies$!: Observable<Movie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getMovies();
  }

  getMovieDetailHref(m: Movie): string {
    const id = this.extractIdFromUrl(m.url);
    return id ? `/films-detail/${id}` : '/films-detail/1';
  }

  private extractIdFromUrl(url: string): string | null {
    if (!url) return null;
    const match = url.match(/films\/([0-9]+)\/?$/);
    return match ? match[1] : null;
  }
}
