import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { authGuard } from './shared/guards/auth/auth.guard';
import { roleGuard } from './shared/guards/auth/role.guard';
import { RoleType } from './shared/types/Auth';

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
        // component: InterventionListRootComponent,
        loadComponent: () =>
          import(
            './modules/intervention/containers/intervention-list-root/intervention-list-root.component'
          ).then((m) => m.InterventionListRootComponent),
        canActivate: [
          roleGuard([RoleType.MANAGER, RoleType.CLIENT, RoleType.MECANICIEN]),
        ],
      },
      {
        path: 'factures',
        // component: FacturationFormRootComponent,
        loadComponent: () =>
          import(
            './modules/facturation/containers/facturation-form-root/facturation-form-root.component'
          ).then((m) => m.FacturationFormRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER])],
      },
      {
        path: 'mes_factures',
        // component: FactureListRootComponent,
        loadComponent: () =>
          import(
            './modules/facturation/containers/facture-list-root/facture-list-root.component'
          ).then((m) => m.FactureListRootComponent),
        canActivate: [roleGuard([RoleType.CLIENT, RoleType.MANAGER])],
      },
      {
        path: 'devis',
        // component: DevisListRootComponent,
        loadComponent: () =>
          import(
            './modules/estimation/containers/devis-list-root/devis-list-root.component'
          ).then((m) => m.DevisListRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER, RoleType.CLIENT])],
      },
      {
        path: 'demande-devis',
        // component: DemandeDevisRootComponent,
        loadComponent: () =>
          import(
            './modules/estimation/containers/demande-devis-root/demande-devis-root.component'
          ).then((m) => m.DemandeDevisRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER, RoleType.CLIENT])],
      },
      {
        path: 'creation-devis',
        // component: CreationDevisFormRootComponent,
        loadComponent: () =>
          import(
            './modules/estimation/containers/creation-devis-form-root/creation-devis-form-root.component'
          ).then((m) => m.CreationDevisFormRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER])],
      },
      {
        path: 'devis/:id',
        // component: DetailsDevisRootComponent,
        loadComponent: () =>
          import(
            './modules/estimation/containers/details-devis-root/details-devis-root.component'
          ).then((m) => m.DetailsDevisRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER, RoleType.CLIENT])],
      },
      {
        path: 'rdv',
        // component: ListRdvRootComponent,
        loadComponent: () =>
          import(
            './modules/rdv/containers/list-rdv-root/list-rdv-root.component'
          ).then((m) => m.ListRdvRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER, RoleType.CLIENT])],
      },
      {
        path: 'interventions',
        // component: InterventionListRootComponent,
        loadComponent: () =>
          import(
            './modules/intervention/containers/intervention-list-root/intervention-list-root.component'
          ).then((m) => m.InterventionListRootComponent),
        canActivate: [
          roleGuard([RoleType.MANAGER, RoleType.CLIENT, RoleType.MECANICIEN]),
        ],
      },
      {
        path: 'tableau-taches/:id',
        // component: TableauTacheRootComponent,
        loadComponent: () =>
          import(
            './modules/intervention/containers/tableau-tache-root/tableau-tache-root.component'
          ).then((m) => m.TableauTacheRootComponent),

        canActivate: [roleGuard([RoleType.MANAGER, RoleType.MECANICIEN])],
      },
      {
        path: 'dashboard',
        // component: DashboardRootComponent,
        loadComponent: () =>
          import(
            './modules/dashboard/containers/dashboard-root/dashboard-root.component'
          ).then((m) => m.DashboardRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER, RoleType.MECANICIEN])],
      },
      {
        path: 'mecaniciens',
        // component: MecanoListRootComponent,
        loadComponent: () =>
          import(
            './modules/utilisateurs/containers/mecano-list-root/mecano-list-root.component'
          ).then((m) => m.MecanoListRootComponent),
        canActivate: [roleGuard([RoleType.MANAGER])],
      },
    ],
  },
  {
    path: 'login',
    // component: LoginRootComponent,
    loadComponent: () =>
      import('./modules/auth/container/login-root/login-root.component').then(
        (m) => m.LoginRootComponent
      ),
  },
  {
    path: 'bo/login',
    // component: LoginBoRootComponent,
    loadComponent: () =>
      import(
        './modules/auth/container/login-bo-root/login-bo-root.component'
      ).then((m) => m.LoginBoRootComponent),
  },
  {
    path: 'inscription',
    // component: InscriptionRootComponent
    loadComponent: () =>
      import(
        './modules/utilisateurs/containers/inscription-root/inscription-root.component'
      ).then((m) => m.InscriptionRootComponent),
  },
];
