import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { PrimaryButtonComponent } from '../../../../shared/button/primary-button/primary-button.component';
import { EstimationListComponent } from '../components/estimation-list/estimation-list.component';

@Component({
  selector: 'app-estimation-list-root',
  imports: [
    MatButtonModule,
    PrimaryButtonComponent,
    MatTabsModule,
    EstimationListComponent,
  ],
  templateUrl: './estimation-list.root.html',
  styleUrl: './estimation-list.root.scss',
})
export class EstimationListRoot {
  estimationButtonText = 'Demander un devis';
  estimations: any[] = [1, 2, 3];
}
