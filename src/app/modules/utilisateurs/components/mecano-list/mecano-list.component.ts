import {
  Component,
  input,
  OnChanges,
  output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { defaultPaginatedData } from '../../../../shared/constants/pagination';
import { getUserFullname } from '../../../../shared/helpers/user';
import { Paginated } from '../../../../shared/types/Paginated';
import { Utilisateur } from '../../../../shared/types/Utilisateur';
import { defaultMecanoListFilter } from '../../constants/mecano';
import { MecanoListFilter } from '../../types/mecano';

@Component({
  selector: 'app-mecano-list',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
  ],
  templateUrl: './mecano-list.component.html',
  styleUrl: './mecano-list.component.scss',
})
export class MecanoListComponent implements OnChanges {
  filter: MecanoListFilter = defaultMecanoListFilter;
  mecaniciens = input<Paginated<Utilisateur>>(defaultPaginatedData);
  getFullName = getUserFullname;
  selectedMecano!: Utilisateur;
  loadingData = false;

  loading = input<boolean>(false);
  onSubmitFilter = output<MecanoListFilter>();
  onSelectMecano = output<Utilisateur>();

  ngOnChanges(changes: SimpleChanges): void {
    this.loadingData = changes['loading']?.currentValue;
  }

  handleFilterSubmit() {
    this.onSubmitFilter.emit(this.filter);
  }

  onPageChange(event: PaginatorState) {
    this.filter = {
      ...this.filter,
      page: (event?.page || 0) + 1,
    };
  }

  renderDateArrivee(date?: string) {
    if (date) {
      return dayjs(date).format('DD MMMM YYYY');
    }
    return '';
  }

  selectRow(event: any) {
    this.onSelectMecano.emit(event.data);
  }
}
