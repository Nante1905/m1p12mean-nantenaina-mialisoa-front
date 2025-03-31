import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProgressBar } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { RoleType } from '../../../../shared/types/Auth';
import { Intervention } from '../../../../shared/types/Intervention';
import { Paginated } from '../../../../shared/types/Paginated';
import { InterventionListFilter } from '../../types/intervention.type';
import { AddTaskFormComponent } from '../add-task-form/add-task-form.component';

@Component({
  selector: 'app-intervention-list',
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    HasRoleDirective,
    DialogModule,
    AddTaskFormComponent,
    TagModule,
    ProgressBar,
  ],
  templateUrl: './intervention-list.component.html',
  styleUrl: './intervention-list.component.scss',
})
export class InterventionListComponent implements OnInit {
  constructor(private authService: AuthService) {}
  visible: boolean = false;
  selectedIntervention: Intervention | null = null;

  ROLE = RoleType;
  expandedRows = {};
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
  userRole = '';

  filter = input<InterventionListFilter>({
    immatriculation: '',
    nom: '',
    page: 1,
    limit: 10,
  });
  onPageChange = output<{ page: number }>();

  ngOnInit(): void {
    this.userRole = this.authService.getCurrentUser()?.role || '';
  }

  changePage = (event: PaginatorState) => {
    this.onPageChange.emit({ page: (event.page ?? 0) + 1 });
  };
  closeDialog() {
    this.visible = false;
  }

  openDialog(index: number) {
    this.visible = true;
    this.selectedIntervention = this.interventions().items[index];
    console.log(index);

    console.log(this.selectedIntervention);
  }

  getClassName = (status: string) => {
    return `tache-${status
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')}`;
  };
}
