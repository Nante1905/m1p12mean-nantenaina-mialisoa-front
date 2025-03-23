import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  input,
  output,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { RoleType } from '../../../../shared/types/Auth';
import { Devis } from '../../../../shared/types/Devis';
import { DevisService } from '../../services/devis.service';
import { DevisDataResponse, DevisListFilter } from '../../types/Devis';
import { TakeRdvEventPayload } from '../../types/TakeRdvEventPayload';
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
    HasRoleDirective,
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
  @Input() takeRdvLoading!: boolean;

  @Output() onTakeRdv: EventEmitter<TakeRdvEventPayload> =
    new EventEmitter<TakeRdvEventPayload>();
  ROLES = RoleType;

  filter: DevisListFilter = {
    status: null,
    immatriculation: '',
    nom: '',
  };

  first = 0;
  rows = 10;

  loadingPdf = false;

  constructor(private devisService: DevisService) {}

  updateFilter = (newFilter: Partial<DevisListFilter>) => {
    this.filter = {
      ...this.filter,
      ...newFilter,
    };
    this.onFilterChange.emit({ ...this.filter, ...newFilter });
    this.selectedDevis = null;
  };

  onPageChange = (event: PaginatorState) => {
    console.log(event);
  };

  onSelectDevis = (devis: Devis | null) => {
    this.selectedDevis = devis;
  };

  handleTakeRdv = () => {
    this.onTakeRdv.emit({
      devis: this.selectedDevis as Devis,
      callback: this.onSelectDevis,
    });
  };
  onDownloadPdf = (devis: Devis) => {
    this.loadingPdf = true;
    this.devisService.downloadDevisPdf(devis._id).subscribe((res) => {
      const url = URL.createObjectURL(res);

      const a = document.createElement('a');
      a.href = url;
      a.download = `DEVIS-${devis.vehicule.immatriculation}-${devis.numero}.pdf`;
      a.click();

      URL.revokeObjectURL(url);

      this.loadingPdf = false;
    });
  };
}
