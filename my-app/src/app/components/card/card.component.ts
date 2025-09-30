import { Component, Input } from '@angular/core';

export interface CardDetailLine {
  label: string;
  value: string;
}

@Component({
  selector: 'app-card',
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


