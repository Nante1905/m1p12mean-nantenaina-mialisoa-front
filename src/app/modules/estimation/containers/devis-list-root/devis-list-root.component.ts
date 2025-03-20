import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { ToastModule } from 'primeng/toast';
import { catchError, map, Observable, of } from 'rxjs';
import { DemandeDevisListComponent } from '../../components/demande-devis-list/demande-devis-list.component';
import { DevisListComponent } from '../../components/devis-list/devis-list.component';
import { DevisService } from '../../services/devis.service';
import {
  DemandeDevisDataResponse,
  DemandeDevisFilter,
} from '../../types/DemandeDevis';
import { DevisDataResponse, DevisListFilter } from '../../types/Devis';

@Component({
  selector: 'app-devis-list-root',
  imports: [
    ButtonModule,
    TabsModule,
    DemandeDevisListComponent,
    CommonModule,
    CardModule,
    DevisListComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './devis-list-root.component.html',
  styleUrl: './devis-list-root.component.scss',
})
export class DevisListRootComponent implements OnInit {
  constructor(
    private devisService: DevisService,
    private messageService: MessageService
  ) {}

  demandeDevis$!: Observable<DemandeDevisDataResponse>;
  listDevis$!: Observable<DevisDataResponse>;

  ngOnInit(): void {
    this.demandeDevis$ = this.fetchDataDemandes();
    this.listDevis$ = this.fetchDataDevis();
  }

  fetchDataDemandes = (filter?: DemandeDevisFilter) => {
    return this.devisService.findAllDemandeDevis(filter).pipe(
      map((res) => res.data),
      catchError((err) => {
        console.log(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error.message,
        });
        const demandeDevis: DemandeDevisDataResponse = {
          items: [],
          page: 0,
          limit: 0,
          totalPage: 0,
          totalItems: 0,
          stats: [],
        };
        return of(demandeDevis);
      })
    );
  };

  fetchDataDevis = (filter?: DevisListFilter) => {
    return this.devisService.findAllDevis(filter).pipe(
      map((res) => res.data),
      catchError((err) => {
        console.log(err);

        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.error.message,
        });
        const devis: DevisDataResponse = {
          items: [],
          page: 0,
          limit: 0,
          totalPage: 0,
          totalItems: 0,
          stats: [],
        };
        return of(devis);
      })
    );
  };

  onFilterDemandeChange = (filter: DemandeDevisFilter) => {
    this.demandeDevis$ = this.fetchDataDemandes(filter);
  };

  onFilterDevisChange = (filter: DevisListFilter) => {
    this.listDevis$ = this.fetchDataDevis(filter);
  };
}
