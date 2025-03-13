import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-estimation-item',
  imports: [],
  templateUrl: './estimation-item.component.html',
  styleUrl: './estimation-item.component.scss',
})
export class EstimationItemComponent {
  @Input() estimation: any;
}
