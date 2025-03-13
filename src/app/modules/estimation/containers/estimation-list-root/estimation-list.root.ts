import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { PrimaryButtonComponent } from '../../../../shared/components/button/primary-button/primary-button.component';
import { EstimationListComponent } from '../../components/estimation-list/estimation-list.component';

@Component({
  selector: 'app-estimation-list-root',
  imports: [PrimaryButtonComponent, EstimationListComponent, TabsModule],
  templateUrl: './estimation-list.root.html',
  styleUrl: './estimation-list.root.scss',
})
export class EstimationListRoot {
  estimationButtonText = 'Demander un devis';
  estimations: any[] = [1, 2, 3];
}
