import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { defaultPaginatedData } from '../../../../shared/constants/pagination';
import { Facture } from '../../../../shared/types/Facture';
import { Paginated } from '../../../../shared/types/Paginated';
import { showToastError } from '../../../../shared/utils/form.utils';
import { FactureListComponent } from '../../components/facture-list/facture-list.component';
import { FactureService } from '../../services/facture.service';

@Component({
  selector: 'app-facture-list-root',
  imports: [FactureListComponent, CommonModule],
  providers: [FactureService, MessageService],
  templateUrl: './facture-list-root.component.html',
  styleUrl: './facture-list-root.component.scss',
})
export class FactureListRootComponent {
  constructor(
    private factureService: FactureService,
    private messageService: MessageService
  ) {}

  factures$!: Observable<Paginated<Facture>>;

  defaultFactures = defaultPaginatedData;

  ngOnInit(): void {
    this.factures$ = this.factureService.getFactures().pipe(
      map((res) => res.data),
      tap((res) => {
        console.log('Factures:', res);
      }),
      catchError((err) => {
        showToastError(err.message || err.error.message, this.messageService);
        return of({} as Paginated<Facture>);
      })
    );
  }
}
