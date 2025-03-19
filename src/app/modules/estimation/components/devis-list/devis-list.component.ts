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
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Devis } from '../../../../shared/types/Devis';
import { DevisDataResponse, DevisListFilter } from '../../types/Devis';
import { DevisApercuComponent } from '../devis-apercu/devis-apercu.component';
import { DevisItemComponent } from '../devis-item/devis-item.component';

@Component({
  selector: 'app-devis-list',
  imports: [
    TagModule,
    FormsModule,
    ButtonModule,
    LoaderComponent,
    PaginatorModule,
    DevisItemComponent,
    CardModule,
    DividerModule,
    DevisApercuComponent,
    InputTextModule,
  ],
  templateUrl: './devis-list.component.html',
  styleUrl: './devis-list.component.scss',
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
export class DevisListComponent {
  devis = input.required<DevisDataResponse | null>();
  selectedDevis: Devis | null = null;
  onFilterChange = output<DevisListFilter>();

  filter: DevisListFilter = {
    status: null,
    immatriculation: '',
  };

  first = 0;
  rows = 10;

  updateFilter = (newFilter: Partial<DevisListFilter>) => {
    this.filter = {
      ...this.filter,
      ...newFilter,
    };
    this.onFilterChange.emit({ ...this.filter, ...newFilter });
  };

  onPageChange = (event: PaginatorState) => {
    console.log(event);
  };

  onSelectDevis = (devis: Devis | null) => {
    this.selectedDevis = devis;
  };
}
