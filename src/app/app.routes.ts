import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { LoginRootComponent } from './modules/auth/container/login-root/login-root.component';
import { CreationDevisFormRootComponent } from './modules/estimation/containers/creation-devis-form-root/creation-devis-form-root.component';
import { DemandeDevisRootComponent } from './modules/estimation/containers/demande-devis-root/demande-devis-root.component';
import { DetailsDevisRootComponent } from './modules/estimation/containers/details-devis-root/details-devis-root.component';
import { DevisListRootComponent } from './modules/estimation/containers/devis-list-root/devis-list-root.component';
import { InterventionListRootComponent } from './modules/intervention/containers/intervention-list-root/intervention-list-root.component';
import { TableauTacheComponent } from './modules/intervention/containers/tableau-tache/tableau-tache.component';
import { ListRdvRootComponent } from './modules/rdv/containers/list-rdv-root/list-rdv-root.component';
import { roleGuard } from './shared/guards/auth/role.guard';
import { RoleType } from './shared/types/Auth';
import { TestComponentComponent } from './test/components/test-component/test-component.component';

export const routes: Routes = [
  // {
  //   redirectTo: 'test',
  //   path: '',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: MainComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
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
        canActivate: [roleGuard([RoleType.MANAGER])],
      },
      {
        path: 'devis/:id',
        component: DetailsDevisRootComponent,
      },
      {
        path: 'rdv',
        component: ListRdvRootComponent,
      },
      {
        path: 'interventions',
        component: InterventionListRootComponent,
      },
      {
        path: 'tableau-taches',
        component: TableauTacheComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginRootComponent,
  },
];
