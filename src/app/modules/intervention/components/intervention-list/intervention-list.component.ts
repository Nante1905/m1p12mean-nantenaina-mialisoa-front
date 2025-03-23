import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { RoleType } from '../../../../shared/types/Auth';
import { Intervention } from '../../../../shared/types/Intervention';
import { Paginated } from '../../../../shared/types/Paginated';
import { InterventionListFilter } from '../../types/intervention.type';

@Component({
  selector: 'app-intervention-list',
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './intervention-list.component.html',
  styleUrl: './intervention-list.component.scss',
})
export class InterventionListComponent {
  interventions = input.required<
    Paginated<Intervention>,
    Paginated<Intervention>
  >({
    transform: (data) => {
      return {
        ...data,
        items: data.items.map((d) => ({
          ...d,
          date: dayjs(d.date).format('ddd DD MMMM YYYY, HH:mm'),
        })),
      };
    },
  });
  ROLES = RoleType;
  loading = input<boolean>(false);
  rows = 10;

  filter = input<InterventionListFilter>({
    immatriculation: '',
    nom: '',
    page: 1,
    limit: 10,
  });
  onPageChange = output<{ page: number }>();

  changePage = (event: PaginatorState) => {
    this.onPageChange.emit({ page: (event.page ?? 0) + 1 });
  };
}
