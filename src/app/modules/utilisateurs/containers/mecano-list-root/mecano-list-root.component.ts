import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { defaultPaginatedData } from '../../../../shared/constants/pagination';
import { Paginated } from '../../../../shared/types/Paginated';
import {
  DetailsMecanicien,
  Utilisateur,
} from '../../../../shared/types/Utilisateur';
import { MecanoDetailsComponent } from '../../components/mecano-details/mecano-details.component';
import { MecanoListComponent } from '../../components/mecano-list/mecano-list.component';
import { defaultMecanoListFilter } from '../../constants/mecano';
import { UtilisateurService } from '../../service/utilisateur.service';
import { MecanoListFilter } from '../../types/mecano';

@Component({
  selector: 'app-mecano-list-root',
  imports: [
    MecanoListComponent,
    CommonModule,
    DrawerModule,
    MecanoDetailsComponent,
  ],
  templateUrl: './mecano-list-root.component.html',
  styleUrl: './mecano-list-root.component.scss',
})
export class MecanoListRootComponent implements OnInit {
  mecanoData$: Observable<Paginated<Utilisateur>> = of(defaultPaginatedData);
  loading = false;
  defaultMecanoData = defaultPaginatedData;
  showDetailsMecano = false;
  selectedMecano!: DetailsMecanicien;

  constructor(
    private utilisateurService: UtilisateurService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.mecanoData$ = this.fetchData(defaultMecanoListFilter);
  }

  fetchData(filter?: MecanoListFilter) {
    this.loading = true;
    return this.utilisateurService.findAllMecano(filter).pipe(
      map((res) => res.data),
      catchError((err) => {
        this.messageService.add({
          summary: 'Erreur',
          severity: 'error',
          detail: err.error.message || "Une erreur s'est produite",
        });

        return of(defaultPaginatedData);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  onSubmitFilter(filter: MecanoListFilter) {
    this.mecanoData$ = this.fetchData(filter);
  }

  onSelectMecano(mecano: Utilisateur) {
    this.utilisateurService
      .findAllTachesOf(mecano._id as string)
      .pipe(
        tap((res) => {
          this.selectedMecano = {
            ...mecano,
            taches: res.data,
          };
          this.showDetailsMecano = true;
        }),
        catchError((err) => {
          this.messageService.add({
            summary: 'Erreur',
            severity: 'error',
            detail: err.error.message || "Une erreur s'est produite",
          });

          return of(defaultPaginatedData);
        })

        // finalize()
      )
      .subscribe();
  }
}
