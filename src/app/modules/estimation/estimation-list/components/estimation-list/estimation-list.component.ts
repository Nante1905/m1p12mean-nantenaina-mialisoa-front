import { Component, Input } from '@angular/core';
import { EstimationItemComponent } from '../estimation-item/estimation-item.component';

@Component({
  selector: 'app-estimation-list',
  imports: [EstimationItemComponent],
  templateUrl: './estimation-list.component.html',
  styleUrl: './estimation-list.component.scss',
})
export class EstimationListComponent {
  @Input() estimations: any[] = [];

  constructor() {
    console.log(this.estimations);
  }
}
