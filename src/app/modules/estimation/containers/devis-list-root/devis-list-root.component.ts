import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { ToastModule } from 'primeng/toast';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { DemandeDevisListComponent } from '../../components/demande-devis-list/demande-devis-list.component';
import { DevisService } from '../../services/devis.service';
import {
  DemandeDevisDataResponse,
  DemandeDevisFilter,
} from '../../types/DemandeDevis';

@Component({
  selector: 'app-devis-list-root',
  imports: [
    ButtonModule,
    TabsModule,
    DemandeDevisListComponent,
    CommonModule,
    CardModule,
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
  loading$ = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    console.log('rendu root');

    this.demandeDevis$ = this.devisService.findAllDemandeDevis().pipe(
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
  }

  filterData = (filter: DemandeDevisFilter) => {
    console.log(filter);
    this.demandeDevis$ = this.devisService
      .findAllDemandeDevis(filter)
      .pipe(map((res) => res.data));
  };
}
