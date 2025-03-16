import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {
  DemandeDevis,
  DEMANDES_DEVIS,
  DEMANDES_DEVIS_STATUS_CLIENT,
} from '../../constants/devis';
import { DemandeDevisApercuComponent } from '../demande-devis-apercu/demande-devis-apercu.component';
import { DemandeDevisItemComponent } from '../demande-devis-item/demande-devis-item.component';

@Component({
  selector: 'app-demande-devis-list',
  imports: [
    DemandeDevisItemComponent,
    TagModule,
    ToggleButtonModule,
    InputTextModule,
    PaginatorModule,
    DemandeDevisApercuComponent,
    CardModule,
    DividerModule,
  ],
  templateUrl: './demande-devis-list.component.html',
  styleUrl: './demande-devis-list.component.scss',
  animations: [
    trigger('detailsAnimation', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateX(100%)',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [animate('0.5s ease-in-out')]),
      transition('* => void', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class DemandeDevisListComponent {
  demandesDevis: DemandeDevis[] = [];
  count: { [key: number]: number } = {
    0: 10,
    5: 2,
    10: 3,
  };
  statusLabels = DEMANDES_DEVIS_STATUS_CLIENT;
  statusCount: { code: number; label: string; count: number }[] = [];

  filter: {
    status: number | null;
    page: number;
  } = {
    status: null,
    page: 1,
  };

  // PAgination
  first: number = 0;
  rows: number = 10;

  selectedDemande: DemandeDevis | null = null;

  ngOnInit(): void {
    this.demandesDevis = [...DEMANDES_DEVIS, ...DEMANDES_DEVIS];
    this.statusCount = Object.keys(this.count)
      .map((c) => parseInt(c))
      .map((c) => ({
        code: c,
        label: this.statusLabels[c],
        count: this.count[c],
      }));
  }

  setStatusFilter = (status: number | null) => {
    console.log('select', status);

    this.filter = {
      status,
      page: 1,
    };
  };

  onPageChange = (event: PaginatorState) => {
    this.filter.page = (event.page ?? 0) + 1;
  };

  onSelectDemande = (demande: DemandeDevis | null) => {
    this.selectedDemande = demande;

    // this.selectedDemande = null;
    // setTimeout(() => {
    //   this.selectedDemande = demande;
    // }, 300);
  };
}
