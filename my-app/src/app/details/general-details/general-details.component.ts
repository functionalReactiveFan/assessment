import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';

export interface DetailItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-general-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf],
  templateUrl: './general-details.component.html',
  styleUrls: ['./general-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralDetailsComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() details: DetailItem[] = [];
  @Input() planet?: string;
  @Input() films: string[] = [];
  @Input() imageUrl: string = '';
  @Input() dotsCount: number = 3;
}
