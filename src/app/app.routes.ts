import { Routes } from '@angular/router';
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
];
