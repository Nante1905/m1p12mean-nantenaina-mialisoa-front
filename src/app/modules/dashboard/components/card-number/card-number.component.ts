import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-number',
  imports: [CommonModule],
  templateUrl: './card-number.component.html',
  styleUrl: './card-number.component.scss',
})
export class CardNumberComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() suffixe: string = '';
}
