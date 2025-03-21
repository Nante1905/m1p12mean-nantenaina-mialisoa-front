import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { RoleType } from '../../../../shared/types/Auth';
import { DemandeDevis } from '../../../../shared/types/DemandeDevis';
import { CREATED_DEMANDE_DEVIS_STATUS } from '../../constants/devis';
import {
  DemandeDevisDataResponse,
  DemandeDevisFilter,
} from '../../types/DemandeDevis';
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
    FormsModule,
    LoaderComponent,
    ButtonModule,
    HasRoleDirective,
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
  ROLES = RoleType;
  CREATED_DEVIS_STATUS = CREATED_DEMANDE_DEVIS_STATUS;

  data = input.required<DemandeDevisDataResponse | null>();
  onFilterChange = output<DemandeDevisFilter>();

  filter: DemandeDevisFilter = {
    status: null,
    page: 1,
    immatriculation: '',
    nom: '',
  };

  // PAgination
  first: number = 0;
  rows: number = 10;

  selectedDemande: DemandeDevis | null = null;
  ngOnInit(): void {}

  onPageChange = (event: PaginatorState) => {
    this.filter.page = (event.page ?? 0) + 1;
    this.updateFilter({ page: (event.page ?? 0) + 1 });
  };

  onSelectDemande = (demande: DemandeDevis | null) => {
    this.selectedDemande = demande;
  };

  updateFilter = (filter: Partial<DemandeDevisFilter>) => {
    this.selectedDemande = null;
    this.filter = {
      ...this.filter,
      ...filter,
    };
    this.onFilterChange.emit({ ...this.filter, ...filter });
  };
}
