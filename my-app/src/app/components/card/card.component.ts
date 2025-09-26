import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardDetailLine {
  label: string;
  value: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() imageUrl: string = '';
  @Input() imageAlt: string = '';
  @Input() title: string = '';
  @Input() lines: CardDetailLine[] = [];
  @Input() moreInfoHref: string | null = '#';
  @Input() moreInfoText: string = 'Mehr Informationen....';
}


