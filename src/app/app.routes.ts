import { Routes } from '@angular/router';
import { CreationDevisFormRootComponent } from './modules/estimation/containers/creation-devis-form-root/creation-devis-form-root.component';
import { DemandeDevisRootComponent } from './modules/estimation/containers/demande-devis-root/demande-devis-root.component';
import { DetailsDevisRootComponent } from './modules/estimation/containers/details-devis-root/details-devis-root.component';
import { DevisListRootComponent } from './modules/estimation/containers/devis-list-root/devis-list-root.component';
import { ListRdvRootComponent } from './modules/rdv/containers/list-rdv-root/list-rdv-root.component';
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
    component: DevisListRootComponent,
  },
  {
    path: 'demande-devis',
    component: DemandeDevisRootComponent,
  },
  {
    path: 'creation-devis',
    component: CreationDevisFormRootComponent,
  },
  {
    path: 'devis/:id',
    component: DetailsDevisRootComponent,
  },
  {
    path: 'rdv',
    component: ListRdvRootComponent,
  },
];
