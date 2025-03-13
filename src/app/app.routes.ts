import { Routes } from '@angular/router';
import { DemandeDevisRootComponent } from './modules/estimation/containers/demande-devis-root/demande-devis-root.component';
import { EstimationListRoot } from './modules/estimation/containers/estimation-list-root/estimation-list.root';
import { TestComponentComponent } from './test/components/test-component/test-component.component';

export const routes: Routes = [
  {
    redirectTo: 'test',
    path: '',
    pathMatch: 'full',
  },
  {
    path: 'test',
    component: TestComponentComponent,
  },
  {
    path: 'devis',
    component: EstimationListRoot,
  },
  {
    path: 'demande-devis',
    component: DemandeDevisRootComponent,
  },
];
