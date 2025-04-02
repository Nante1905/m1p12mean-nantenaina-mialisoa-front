import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { LoginBoRootComponent } from './modules/auth/container/login-bo-root/login-bo-root.component';
import { LoginRootComponent } from './modules/auth/container/login-root/login-root.component';
import { DashboardRootComponent } from './modules/dashboard/containers/dashboard-root/dashboard-root.component';
import { CreationDevisFormRootComponent } from './modules/estimation/containers/creation-devis-form-root/creation-devis-form-root.component';
import { DemandeDevisRootComponent } from './modules/estimation/containers/demande-devis-root/demande-devis-root.component';
import { DetailsDevisRootComponent } from './modules/estimation/containers/details-devis-root/details-devis-root.component';
import { DevisListRootComponent } from './modules/estimation/containers/devis-list-root/devis-list-root.component';
import { FacturationFormRootComponent } from './modules/facturation/containers/facturation-form-root/facturation-form-root.component';
import { FactureListRootComponent } from './modules/facturation/containers/facture-list-root/facture-list-root.component';
import { InterventionListRootComponent } from './modules/intervention/containers/intervention-list-root/intervention-list-root.component';
import { TableauTacheRootComponent } from './modules/intervention/containers/tableau-tache-root/tableau-tache-root.component';
import { ListRdvRootComponent } from './modules/rdv/containers/list-rdv-root/list-rdv-root.component';
import { authGuard } from './shared/guards/auth/auth.guard';
import { roleGuard } from './shared/guards/auth/role.guard';
import { RoleType } from './shared/types/Auth';
import { TestComponentComponent } from './test/components/test-component/test-component.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  {
    path: 'app',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: TestComponentComponent,
      },
      {
        path: 'factures',
        component: FacturationFormRootComponent,
      },
      {
        path: 'mes_factures',
        component: FactureListRootComponent,
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
        path: 'tableau-taches/:id',
        component: TableauTacheRootComponent,
      },
      {
        path: 'dashboard',
        component: DashboardRootComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginRootComponent,
  },
  {
    path: 'bo/login',
    component: LoginBoRootComponent,
  },
];
