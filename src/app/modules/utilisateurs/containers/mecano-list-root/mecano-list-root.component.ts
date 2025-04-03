import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DrawerModule } from 'primeng/drawer';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { defaultPaginatedData } from '../../../../shared/constants/pagination';
import { Paginated } from '../../../../shared/types/Paginated';
import {
  DetailsMecanicien,
  Utilisateur,
} from '../../../../shared/types/Utilisateur';
import { InscriptionFormComponent } from '../../components/inscription-form/inscription-form.component';
import { MecanoDetailsComponent } from '../../components/mecano-details/mecano-details.component';
import { MecanoListComponent } from '../../components/mecano-list/mecano-list.component';
import { defaultMecanoListFilter } from '../../constants/mecano';
import { UtilisateurService } from '../../service/utilisateur.service';
import { InscriptionFormDTO } from '../../types/inscription';
import { MecanoListFilter } from '../../types/mecano';

@Component({
  selector: 'app-mecano-list-root',
  imports: [
    MecanoListComponent,
    CommonModule,
    DrawerModule,
    MecanoDetailsComponent,
    ButtonModule,
    DialogModule,
    InscriptionFormComponent,
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
  showInscriptionModal: boolean = false;
  loadingInscription: boolean = false;

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

  openInscriptionModal() {
    this.showInscriptionModal = true;
  }

  handleInscription(data: InscriptionFormDTO) {
    this.loadingInscription = true;
    this.utilisateurService
      .registerMecano(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            summary: 'Succès',
            detail: 'Mécanicien enregistré',
            severity: 'success',
          });
          this.showInscriptionModal = false;
          this.mecanoData$ = this.fetchData(defaultMecanoListFilter);
        }),
        catchError((err) => {
          if (Array.isArray(err.error.error)) {
            for (const e of err.error.error) {
              this.messageService.add({
                summary: err.error.message || 'Erreur de validation',
                detail: e,
                severity: 'error',
              });
            }
          } else {
            this.messageService.add({
              summary: err.error.message || 'Erreur de validation',
              detail: err.error.message,
              severity: 'error',
            });
          }
          return of();
        }),
        finalize(() => {
          this.loadingInscription = false;
        })
      )
      .subscribe();
  }
}
