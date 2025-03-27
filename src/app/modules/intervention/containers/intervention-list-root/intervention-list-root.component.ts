import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { defaultPaginatedData } from '../../../../shared/constants/pagination';
import { Intervention } from '../../../../shared/types/Intervention';
import { Paginated } from '../../../../shared/types/Paginated';
import { showToastError } from '../../../../shared/utils/form.utils';
import { InterventionListComponent } from '../../components/intervention-list/intervention-list.component';
import { InterventionService } from '../../services/intervention.service';
import { InterventionListFilter } from '../../types/intervention.type';

@Component({
  selector: 'app-intervention-list-root',
  imports: [
    InterventionListComponent,
    CommonModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
  ],
  templateUrl: './intervention-list-root.component.html',
  styleUrl: './intervention-list-root.component.scss',
})
export class InterventionListRootComponent implements OnInit {
  constructor(
    private interventionService: InterventionService,
    private messageService: MessageService
  ) {}
  defaultInterventions = defaultPaginatedData;

  interventions$!: Observable<Paginated<Intervention>>;
  loadingIntervention!: boolean;

  ngOnInit(): void {
    this.interventions$ = this.fetchIntervention();
  }

  filter: InterventionListFilter = {
    immatriculation: '',
    nom: '',
    page: 1,
    limit: 10,
  };

  fetchIntervention = (filter?: InterventionListFilter) => {
    this.loadingIntervention = true;

    return this.interventionService.findAllInterventions(filter).pipe(
      map((res) => res.data),
      catchError((err) => {
        showToastError(err.error.message, this.messageService);
        return of({
          items: [],
          page: 0,
          limit: 0,
          totalItems: 0,
          totalPage: 0,
        });
      }),
      finalize(() => {
        this.loadingIntervention = false;
      })
    );
  };

  onSubmitFilter() {
    this.filter.page = 1;
    this.interventions$ = this.fetchIntervention(this.filter);
  }

  onPageChange(state: { page: number }) {
    console.log(state.page);

    this.interventions$ = this.fetchIntervention({
      ...this.filter,
      page: state.page,
    });
  }
}
